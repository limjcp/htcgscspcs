import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const programs = await prisma.program.findMany();
    res.status(200).json({ programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Error fetching programs" });
  }
}
