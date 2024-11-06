import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ error: "Year is required" });
  }

  try {
    const semesters = await prisma.semester.findMany({
      where: { schoolYearId: String(year) },
    });
    res.status(200).json(semesters);
  } catch (error) {
    console.error("Error fetching semesters:", error);
    res.status(500).json({ error: "Error fetching semesters" });
  }
}
