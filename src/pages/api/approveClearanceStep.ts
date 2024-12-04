// pages/api/approveClearanceStep.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Adjust the import path based on your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed.` });
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
      status: {
        in: ["PENDING", "REJECTED", "PARTIALLY_COMPLETED"],
      },
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
        status: "COMPLETED",
        signedAt: new Date(),
        signedBy: staffName,
        comments: null, // Clear any existing comments
      },
    });

    if (clearanceStep.count === 0) {
      return res
        .status(404)
        .json({ message: "Clearance step not found or already approved" });
    }

    res.status(200).json({ message: "Clearance step approved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
