import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year, semesterId } = req.query;

  if (!year || !semesterId) {
    return res.status(400).json({ error: "Year and semesterId are required" });
  }

  try {
    const requirements = await prisma.requirement.findMany({
      where: {
        schoolYearId: String(year),
        semesterId: String(semesterId),
      },
      include: {
        office: true,
        department: true,
      },
    });
    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ error: "Error fetching requirements" });
  }
}
