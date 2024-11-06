import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const years = await prisma.schoolYear.findMany();
    res.status(200).json(years);
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ error: "Error fetching years" });
  }
}
