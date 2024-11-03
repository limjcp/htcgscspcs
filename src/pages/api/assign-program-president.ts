import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { departmentId, userId } = req.body;

  console.log("Received departmentId:", departmentId);
  console.log("Received userId:", userId);

  if (!departmentId || !userId) {
    return res
      .status(400)
      .json({ message: "Department ID and User ID are required" });
  }

  try {
    // Create or update the Staff record
    await prisma.staff.upsert({
      where: { userId },
      update: { departmentId },
      create: { userId, departmentId },
    });

    // Update the user's role to staff
    await prisma.user.update({
      where: { id: userId },
      data: { role: { set: ["staff"] } },
    });

    // Update the department's programPresidentId
    await prisma.department.update({
      where: { id: departmentId },
      data: { programPresidentId: userId },
    });

    res
      .status(200)
      .json({ message: "Program President assigned successfully" });
  } catch (error) {
    console.error("Error assigning Program President:", error);
    res
      .status(500)
      .json({
        message: "Error assigning Program President",
        error: error.message,
      });
  }
}
