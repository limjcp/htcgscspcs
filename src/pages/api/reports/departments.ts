import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const departments = await prisma.department.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
