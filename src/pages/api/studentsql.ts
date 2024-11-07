// src/pages/api/students.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [rows] = await db.query("SELECT * FROM Student"); // Replace with your table name
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
}
