import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { PrismaClient as MySQLPrismaClient } from "../../../generated/mysql-client";

const mysqlPrisma = new MySQLPrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch students from MySQL using Prisma
    const mysqlStudents = await mysqlPrisma.student.findMany();

    console.log("Fetched students from MySQL:", mysqlStudents);

    const postgresStudents = await prisma.student.findMany();
    const postgresStudentEmails = postgresStudents.map(
      (student) => student.email
    );

    for (const mysqlStudent of mysqlStudents) {
      // Check if the student exists in PostgreSQL
      if (!postgresStudentEmails.includes(mysqlStudent.email)) {
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
              enrollmentYear: mysqlStudent.enrollmentYear || 0, // Provide a default value
              yearLevel: mysqlStudent.yearLevel || "FIRST", // Provide a default value
            },
          });
          console.log("Student created in PostgreSQL:", mysqlStudent.email);
        }
      }
    }

    // Archive students that no longer exist in MySQL
    const mysqlStudentEmails = mysqlStudents.map((student) => student.email);
    for (const student of postgresStudents) {
      if (!mysqlStudentEmails.includes(student.email)) {
        await prisma.student.update({
          where: { studentId: student.studentId },
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
