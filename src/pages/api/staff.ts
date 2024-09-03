// File: `src/pages/api/staff.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const staff = await prisma.staff.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      res.status(500).json({ error: "Failed to fetch staff" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
