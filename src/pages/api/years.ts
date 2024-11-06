import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const years = await prisma.schoolYear.findMany({
      select: {
        id: true,
        year: true,
      },
    });
    res.status(200).json(years);
  } catch (error) {
    console.error("Failed to fetch years:", error);
    res.status(500).json({ error: "Failed to fetch years" });
  }
}
