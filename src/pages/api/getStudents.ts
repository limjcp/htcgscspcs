import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { officeId } = req.query;

  if (!officeId) {
    return res.status(400).json({ message: "Office ID is required" });
  }

  try {
    const students = await prisma.student.findMany({
      include: {
        user: true,
        clearances: {
          include: {
            steps: {
              where: { officeId: String(officeId) },
              include: {
                office: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error });
  }
}
