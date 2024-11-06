import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
      where: {
        schoolYearId: year as string,
      },
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json(semesters);
  } catch (error) {
    console.error("Failed to fetch semesters:", error);
    res.status(500).json({ error: "Failed to fetch semesters" });
  }
}
