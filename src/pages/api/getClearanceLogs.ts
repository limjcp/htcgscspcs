import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const logs = await prisma.clearanceLog.findMany({
      orderBy: { generatedAt: "desc" },
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching clearance logs:", error);
    res.status(500).json({ error: "Failed to fetch clearance logs." });
  }
}
