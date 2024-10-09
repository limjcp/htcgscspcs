import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function approveClearanceStep(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { studentId, stepId, officeId, departmentId, staffName } = req.body;

  console.log("Received request body:", req.body);

  // Validate request body
  if (!studentId || !stepId || (!officeId && !departmentId) || !staffName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const whereClause: any = {
      id: stepId,
      status: "PENDING",
      clearance: {
        studentId: studentId,
      },
    };

    if (officeId) {
      whereClause.officeId = officeId;
    } else if (departmentId) {
      whereClause.departmentId = departmentId;
    }

    const clearanceStep = await prisma.clearanceStep.updateMany({
      where: whereClause,
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
