import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { schoolYearId } = req.query;

  try {
    const semesters = await prisma.semester.findMany({
      where: { schoolYearId: String(schoolYearId) },
    });
    res.status(200).json(semesters);
  } catch (error) {
    console.error("Error fetching semesters:", error);
    res.status(500).json({ error: "Failed to fetch semesters." });
  }
}
