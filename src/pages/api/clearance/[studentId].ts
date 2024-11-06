import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { studentId, year, semesterId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const clearance = await prisma.clearance.findMany({
      where: {
        studentId: String(studentId),
        schoolYearId: String(year),
        semesterId: String(semesterId),
      },
      include: {
        steps: {
          include: {
            office: true,
            department: true,
          },
        },
      },
    });

    if (!clearance || clearance.length === 0) {
      return res.status(404).json({ message: "Clearance not found" });
    }

    res.status(200).json(clearance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clearance", error });
  }
}
