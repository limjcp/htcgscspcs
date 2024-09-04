import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { studentId, stepId, officeId, staffName } = req.body;

  console.log("Received request body:", req.body);

  if (!studentId || !stepId || !officeId || !staffName) {
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
        signedAt: new Date(),
        signedBy: staffName,
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
