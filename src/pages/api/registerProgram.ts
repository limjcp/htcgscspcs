import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Program name and description are required" });
  }

  try {
    const newProgram = await prisma.program.create({
      data: {
        name,
        description,
      },
    });
    res
      .status(201)
      .json({
        message: "Program registered successfully",
        program: newProgram,
      });
  } catch (error) {
    console.error("Error registering program:", error);
    res.status(500).json({ message: "Error registering program" });
  }
}
