import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { studentId, stepId, officeId } = req.body;

  if (!studentId || !stepId || !officeId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const clearanceStep = await prisma.clearanceStep.updateMany({
      where: {
        id: stepId,
        clearance: {
          studentId: studentId,
        },
        officeId: String(officeId),
        status: "PENDING",
      },
      data: {
        status: "APPROVED",
      },
    });

    if (clearanceStep.count === 0) {
      return res
        .status(404)
        .json({ message: "Clearance step not found or already approved" });
    }

    res.status(200).json({ message: "Clearance step approved successfully" });
  } catch (error) {
    console.error("Error approving clearance step:", error);
    res.status(500).json({ message: "Error approving clearance step", error });
  }
}
