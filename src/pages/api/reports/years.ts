import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const years = await prisma.schoolYear.findMany({
        select: {
          year: true,
        },
      });
      res.status(200).json(years);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch years" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
