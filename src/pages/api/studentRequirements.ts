// filepath: /pages/api/studentRequirements.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { studentId, semesterId } = req.query;

  if (!studentId || !semesterId) {
    return res.status(400).json({ message: "Missing studentId or semesterId" });
  }

  try {
    const studentRequirements = await prisma.studentRequirement.findMany({
      where: {
        studentId: String(studentId),
        requirement: {
          semesterId: String(semesterId),
        },
      },
      include: {
        requirement: true,
      },
    });

    res.status(200).json(studentRequirements);
  } catch (error) {
    console.error("Error fetching student requirements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
