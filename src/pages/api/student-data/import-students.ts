import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import xlsx from "xlsx";
import db from "../../../utils/db";
import cuid from "cuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const TIMEOUT_MS = 20000; // Set timeout to 20 seconds
const BATCH_SIZE = 1; // Process 100 records at a time

async function processBatch(dataBatch, db) {
  for (const record of dataBatch) {
    const studentId = record.studentId ?? null;
    const firstName = record.firstName ?? null;
    const middleName = record.middleName ?? null;
    const lastName = record.lastName ?? null;
    const email = record.email ?? null;
    const phone = record.phone ?? null;
    const address = record.address ?? null;
    const dateOfBirth = record.dateOfBirth
      ? new Date(Math.round((record.dateOfBirth - 25569) * 86400 * 1000))
      : null;
    const gender = record.gender ?? null;
    const enrollmentYear = record.enrollmentYear ?? null;
    const enrollmentSemester = record.enrollmentSemester ?? null;
    const status = record.status ?? null;
    const program = record.program ?? null;

    if (!studentId || !firstName || !lastName) {
      console.warn("Skipping incomplete record:", record);
      continue;
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      let enrollmentYearId = null;
      if (enrollmentYear) {
        const [rows]: any = await connection.execute(
          "SELECT id FROM SchoolYear WHERE year = ?",
          [enrollmentYear]
        );
        if (rows.length > 0) {
          enrollmentYearId = rows[0].id;
        } else {
          const newSchoolYearId = cuid();
          await connection.execute(
            "INSERT INTO SchoolYear (id, year) VALUES (?, ?)",
            [newSchoolYearId, enrollmentYear]
          );
          enrollmentYearId = newSchoolYearId;
        }
      }

      let enrollmentSemesterId = null;
      if (enrollmentSemester && enrollmentYearId) {
        const [rows]: any = await connection.execute(
          "SELECT id FROM Semester WHERE semester = ? AND schoolYearId = ?",
          [enrollmentSemester, enrollmentYearId]
        );
        if (rows.length > 0) {
          enrollmentSemesterId = rows[0].id;
        } else {
          const newSemesterId = cuid();
          await connection.execute(
            "INSERT INTO Semester (id, semester, schoolYearId) VALUES (?, ?, ?)",
            [newSemesterId, enrollmentSemester, enrollmentYearId]
          );
          enrollmentSemesterId = newSemesterId;
        }
      }

      const dateOfBirthFormatted = dateOfBirth
        ? dateOfBirth.toISOString().slice(0, 19).replace("T", " ")
        : null;

      const [studentRows]: any = await connection.execute(
        "SELECT id FROM Student WHERE studentId = ? OR email = ?",
        [studentId, email]
      );
      if (studentRows.length > 0) {
        const existingStudentId = studentRows[0].id;
        await connection.execute(
          `UPDATE Student SET
            studentId = ?,
            firstName = ?,
            middleName = ?,
            lastName = ?,
            email = ?,
            phone = ?,
            address = ?,
            dateOfBirth = ?,
            gender = ?,
            enrollmentYearId = ?,
            enrollmentSemesterId = ?,
            status = ?,
            program = ?
          WHERE id = ?`,
          [
            studentId,
            firstName,
            middleName,
            lastName,
            email,
            phone,
            address,
            dateOfBirthFormatted,
            gender,
            enrollmentYearId,
            enrollmentSemesterId,
            status,
            program,
            existingStudentId,
          ]
        );
      } else {
        const newStudentId = cuid();
        await connection.execute(
          `INSERT INTO Student (
            id,
            studentId,
            firstName,
            middleName,
            lastName,
            email,
            phone,
            address,
            dateOfBirth,
            gender,
            enrollmentYearId,
            enrollmentSemesterId,
            status,
            program
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newStudentId,
            studentId,
            firstName,
            middleName,
            lastName,
            email,
            phone,
            address,
            dateOfBirthFormatted,
            gender,
            enrollmentYearId,
            enrollmentSemesterId,
            status,
            program,
          ]
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error processing record:", record, error);
    } finally {
      connection.release();
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = Date.now();
  const form = formidable({});

  const timeoutHandler = setTimeout(() => {
    res.status(504).json({ error: "Request timed out" });
  }, TIMEOUT_MS);

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      console.error(err);
      clearTimeout(timeoutHandler);
      res.status(400).json({ error: "File upload error" });
      return;
    }

    try {
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const workbook = xlsx.readFile(file.filepath);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const dataBatch = data.slice(i, i + BATCH_SIZE);
        await processBatch(dataBatch, db);
      }

      clearTimeout(timeoutHandler);
      const endTime = Date.now();
      console.log(`Execution time: ${endTime - startTime} ms`);
      res.status(200).json({ message: "Data imported successfully" });
    } catch (error) {
      clearTimeout(timeoutHandler);
      console.error(error);
      res.status(500).json({ error: "Import failed" });
    }
  });
}
