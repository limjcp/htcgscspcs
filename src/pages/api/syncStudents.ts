import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import prisma from "@/lib/prisma";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function connectToMySQL(retries = 0): Promise<mysql.Connection> {
  try {
    return await mysql.createConnection({
      host: "htcgensanschoolautomate-htcgensanschoolautomate.i.aivencloud.com",
      user: "avnadmin",
      password: "AVNS_IDj82JAjLU_v4xhxeeP",
      database: "defaultdb",
      port: 22874,
      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
      connectTimeout: 10000, // 10 seconds
    });
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying MySQL connection (${retries + 1}/${MAX_RETRIES})...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return connectToMySQL(retries + 1);
    } else {
      throw error;
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mysqlConnection = await connectToMySQL();

    const [mysqlStudents] = await mysqlConnection.execute(
      "SELECT * FROM Student" // Corrected table name
    );

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
