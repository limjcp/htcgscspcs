// File: `src/pages/api/offices.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const offices = await prisma.office.findMany();
      res.status(200).json(offices);
    } catch (error) {
      console.error("Error fetching offices:", error);
      res.status(500).json({ error: "Failed to fetch offices" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
