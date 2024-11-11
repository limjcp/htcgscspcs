import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { year } = req.query;

    try {
      const semesters = await prisma.semester.findMany({
        where: {
          schoolYear: {
            year: year as string,
          },
        },
        select: {
          name: true,
        },
      });
      res.status(200).json(semesters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch semesters" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
