// pages/api/rejectClearanceStep.ts

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

  const { stepId, comments, staffName } = req.body;

  if (!stepId || !staffName) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Update the clearance step status to 'REJECTED'
    await prisma.clearanceStep.update({
      where: { id: stepId },
      data: {
        status: "PARTIALLY_COMPLETED",
        comments: comments || null,
        signedAt: new Date(),
        signedBy: staffName,
      },
    });

    return res
      .status(200)
      .json({ message: "Clearance step remark successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
