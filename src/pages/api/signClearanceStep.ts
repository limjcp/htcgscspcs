import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { studentId, stepId, officeId, departmentId, signatoryName } = req.body;

  if (!studentId || !stepId || (!officeId && !departmentId) || !signatoryName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const whereClause: any = {
      id: stepId,
      status: "APPROVED",
      clearance: {
        studentId: studentId,
      },
    };

    if (officeId) {
      whereClause.officeId = String(officeId);
    } else if (departmentId) {
      whereClause.departmentId = String(departmentId);
    }

    const clearanceStep = await prisma.clearanceStep.findFirst({
      where: whereClause,
    });

    if (!clearanceStep) {
      return res
        .status(404)
        .json({ message: "Clearance step not found or not approved" });
    }

    const signedClearanceStep = await prisma.clearanceStep.update({
      where: {
        id: stepId,
      },
      data: {
        status: "SIGNED",
        signedAt: new Date(),
        signedBy: signatoryName,
      },
    });

    res.status(200).json({ message: "Clearance step signed successfully" });
  } catch (error) {
    console.error("Error signing clearance step:", error);
    res.status(500).json({ message: "Error signing clearance step", error });
  }
}
