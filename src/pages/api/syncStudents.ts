import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient as MySQLPrismaClient } from "../../../generated/mysql-client";

const mysqlPrisma = new MySQLPrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year, semester } = req.query;

  if (!year || !semester) {
    return res
      .status(400)
      .json({ error: "Year and semester parameters are required" });
  }

  try {
    console.log(
      "Starting sync process for year:",
      year,
      "and semester:",
      semester
    );

    // Fetch the school year from MySQL
    const mysqlSchoolYear = await mysqlPrisma.schoolYear.findFirst({
      where: { year: year as string },
    });

    if (!mysqlSchoolYear) {
      return res.status(404).json({ error: "School year not found in MySQL" });
    }

    console.log("Found school year in MySQL:", mysqlSchoolYear);

    // Fetch the semester from MySQL
    const mysqlSemester = await mysqlPrisma.semester.findFirst({
      where: {
        semester: semester as string,
        schoolYearId: mysqlSchoolYear.id,
      },
    });

    if (!mysqlSemester) {
      return res.status(404).json({ error: "Semester not found in MySQL" });
    }

    console.log("Found semester in MySQL:", mysqlSemester);

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
    } else {
      console.log("Found existing school year in PostgreSQL:", schoolYear);
    }

    // Fetch or create the semester in PostgreSQL
    let schoolSemester = await prisma.semester.findFirst({
      where: {
        name: semester as string,
        schoolYearId: schoolYear.id,
      },
    });

    if (!schoolSemester) {
      schoolSemester = await prisma.semester.create({
        data: {
          name: semester as string,
          schoolYearId: schoolYear.id,
        },
      });
      console.log("Created new semester in PostgreSQL:", schoolSemester);
    } else {
      console.log("Found existing semester in PostgreSQL:", schoolSemester);
    }

    console.log("Using schoolYear.id:", schoolYear.id);
    console.log("Using schoolSemester.id:", schoolSemester.id);

    // Fetch students from MySQL using Prisma
    const mysqlStudents = await mysqlPrisma.student.findMany({
      where: {
        enrollmentYearId: mysqlSchoolYear.id,
        enrollmentSemesterId: mysqlSemester.id,
      },
    });

    console.log("Fetched students from MySQL:", mysqlStudents);

    if (mysqlStudents.length === 0) {
      console.log(
        "No students found in MySQL for the given year and semester."
      );
    }

    const postgresStudents = await prisma.student.findMany();

    for (const mysqlStudent of mysqlStudents) {
      // Check if the student exists in PostgreSQL
      const existingStudent = postgresStudents.find(
        (student) => student.email === mysqlStudent.email
      );

      if (existingStudent) {
        // Update the student's year and semester if they are different
        if (
          existingStudent.enrollmentYearId !== schoolYear.id ||
          existingStudent.enrollmentSemesterId !== schoolSemester.id
        ) {
          await prisma.student.update({
            where: { id: existingStudent.id },
            data: {
              enrollmentYearId: schoolYear.id,
              enrollmentSemesterId: schoolSemester.id,
              archived: false, // Unarchive the student if they are archived
            },
          });
          console.log(
            "Updated student year and semester in PostgreSQL:",
            mysqlStudent.email
          );
        }
      } else {
        // Check if the program exists in PostgreSQL
        let program = await prisma.program.findFirst({
          where: {
            name: mysqlStudent.program,
          },
        });

        // Create the program if it doesn't exist
        if (!program) {
          program = await prisma.program.create({
            data: {
              name: mysqlStudent.program,
              description: "Program created during student sync",
            },
          });
          console.log("Created new program in PostgreSQL:", program);
        }

        // Create the student in PostgreSQL
        await prisma.student.create({
          data: {
            firstName: mysqlStudent.firstName,
            lastName: mysqlStudent.lastName,
            email: mysqlStudent.email,
            programId: program.id,
            studentId: mysqlStudent.studentId || "", // Provide a default value
            phone: mysqlStudent.phone || "", // Provide a default value
            gender: mysqlStudent.gender || "OTHER", // Provide a default value
            enrollmentYearId: schoolYear.id, // Link to the school year
            enrollmentSemesterId: schoolSemester.id, // Link to the semester
          },
        });
        console.log("Student created in PostgreSQL:", mysqlStudent.email);
      }
    }

    // Archive students that are not included in the MySQL students for the given year and semester
    const mysqlStudentEmails = mysqlStudents.map((student) => student.email);
    for (const student of postgresStudents) {
      if (
        !mysqlStudentEmails.includes(student.email) &&
        student.enrollmentYearId === schoolYear.id &&
        student.enrollmentSemesterId === schoolSemester.id
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
