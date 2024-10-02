import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const schoolYears = await prisma.schoolYear.findMany();
    res.status(200).json(schoolYears);
  } catch (error) {
    console.error("Error fetching school years:", error);
    res.status(500).json({ error: "Failed to fetch school years." });
  }
}
