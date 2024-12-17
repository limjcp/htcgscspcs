import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

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

  const { studentRequirementId, status, comments } = req.body;

  if (!studentRequirementId || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    await prisma.studentRequirement.update({
      where: { id: studentRequirementId },
      data: {
        status,
        comments,
        approvedAt: status === "COMPLETED" ? new Date() : null,
      },
    });

    res
      .status(200)
      .json({ message: "Student requirement updated successfully." });
  } catch (error) {
    console.error("Error updating student requirement:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
