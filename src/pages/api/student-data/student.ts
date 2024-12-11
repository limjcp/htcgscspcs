// pages/api/students.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [rows] = await db.execute(
      `SELECT 
        Student.*,
        SchoolYear.year AS enrollmentYearYear,
        Semester.semester AS enrollmentSemesterSemester
      FROM Student
      LEFT JOIN SchoolYear ON Student.enrollmentYearId = SchoolYear.id
      LEFT JOIN Semester ON Student.enrollmentSemesterId = Semester.id`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
