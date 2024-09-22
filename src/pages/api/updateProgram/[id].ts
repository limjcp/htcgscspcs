import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Program name and description are required" });
  }

  try {
    const updatedProgram = await prisma.program.update({
      where: { id: String(id) },
      data: { name, description },
    });
    res.status(200).json({
      message: "Program updated successfully",
      program: updatedProgram,
    });
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json({ message: "Error updating program" });
  }
}
