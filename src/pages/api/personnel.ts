// api/personnel.ts
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const personnel = await prisma.user.findMany({
        where: { role: { has: "personnel" } },
      });
      res.status(200).json(personnel);
    } catch (error) {
      res.status(500).json({ error: "Error fetching personnel list." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
