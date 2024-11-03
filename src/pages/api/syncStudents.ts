import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient as MySQLPrismaClient } from "../../../generated/mysql-client";

const mysqlPrisma = new MySQLPrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ error: "Year parameter is required" });
  }

  try {
    // Fetch or create the school year in PostgreSQL
    let schoolYear = await prisma.schoolYear.findFirst({
      where: { year: year as string },
    });

    if (!schoolYear) {
      schoolYear = await prisma.schoolYear.create({
        data: {
          year: year as string,
          startYear: parseInt((year as string).split("-")[0]),
          endYear: parseInt((year as string).split("-")[1]),
        },
      });
      console.log("Created new school year in PostgreSQL:", schoolYear);
    }

    // Fetch students from MySQL using Prisma
    const mysqlStudents = await mysqlPrisma.student.findMany({
      where: {
        enrollmentYear: {
          year: year as string,
        },
      },
    });

    console.log("Fetched students from MySQL:", mysqlStudents);

    const postgresStudents = await prisma.student.findMany();

    for (const mysqlStudent of mysqlStudents) {
      // Check if the student exists in PostgreSQL
      const existingStudent = postgresStudents.find(
        (student) => student.email === mysqlStudent.email
      );

      if (existingStudent) {
        // Unarchive the student if they are archived
        if (existingStudent.archived) {
          await prisma.student.update({
            where: { id: existingStudent.id },
            data: { archived: false },
          });
          console.log("Student unarchived in PostgreSQL:", mysqlStudent.email);
        }
      } else {
        const closestProgram = await prisma.program.findFirst({
          where: {
            name: {
              contains: mysqlStudent.program,
            },
          },
        });

        console.log("Closest program found:", closestProgram);

        if (closestProgram) {
          await prisma.student.create({
            data: {
              firstName: mysqlStudent.firstName,
              lastName: mysqlStudent.lastName,
              email: mysqlStudent.email,
              programId: closestProgram.id,
              studentId: mysqlStudent.studentId || "", // Provide a default value
              phone: mysqlStudent.phone || "", // Provide a default value
              gender: mysqlStudent.gender || "OTHER", // Provide a default value
              enrollmentYearId: schoolYear.id, // Link to the school year
            },
          });
          console.log("Student created in PostgreSQL:", mysqlStudent.email);
        }
      }
    }

    // Archive students that are not included in the MySQL students for the given year
    const mysqlStudentEmails = mysqlStudents.map((student) => student.email);
    for (const student of postgresStudents) {
      if (
        !mysqlStudentEmails.includes(student.email) &&
        student.enrollmentYearId !== schoolYear.id
      ) {
        await prisma.student.update({
          where: { id: student.id },
          data: { archived: true },
        });
        console.log("Student archived in PostgreSQL:", student.email);
      }
    }

    res.status(200).json({ message: "Sync completed successfully!" });
  } catch (error) {
    console.error("Error syncing students:", error); // Add logging
    res.status(500).json({ error: error.message });
  }
}
