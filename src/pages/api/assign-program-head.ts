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
    // Create or update the Signatory record
    await prisma.signatory.upsert({
      where: { userId },
      update: { departmentId, isProgramHead: true },
      create: { userId, departmentId, isProgramHead: true },
    });

    // Update the user's role to signatory
    await prisma.user.update({
      where: { id: userId },
      data: { role: { set: ["signatory"] } },
    });

    // Update the department's programHeadId
    await prisma.department.update({
      where: { id: departmentId },
      data: { programHeadId: userId },
    });

    res.status(200).json({ message: "Program Head assigned successfully" });
  } catch (error) {
    console.error("Error assigning Program Head:", error);
    res
      .status(500)
      .json({ message: "Error assigning Program Head", error: error.message });
  }
}
