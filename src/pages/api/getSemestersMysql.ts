import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ error: "Year parameter is required" });
  }

  try {
    const [semesters] = await db.execute(
      "SELECT id, semester, schoolYearId FROM Semester WHERE schoolYearId = (SELECT id FROM SchoolYear WHERE year = ?)",
      [year]
    );
    res.status(200).json(semesters);
  } catch (error) {
    console.error("Error fetching semesters:", error);
    res.status(500).json({ error: error.message });
  }
}
