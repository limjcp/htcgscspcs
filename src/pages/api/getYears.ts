import mysqlPrisma from "@/lib/prisma-mysql";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const years = await mysqlPrisma.schoolYear.findMany({
      select: {
        year: true,
      },
    });

    res.status(200).json(years);
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ error: error.message });
  }
}
