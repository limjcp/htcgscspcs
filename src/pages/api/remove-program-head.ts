import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { departmentId } = req.body;

  if (!departmentId) {
    return res.status(400).json({ message: "Department ID is required" });
  }

  try {
    await prisma.department.update({
      where: { id: departmentId },
      data: { programHeadId: null },
    });

    res.status(200).json({ message: "Program Head removed successfully" });
  } catch (error) {
    console.error("Error removing Program Head:", error);
    res.status(500).json({ message: "Error removing Program Head", error });
  }
}