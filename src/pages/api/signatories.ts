// File: `src/pages/api/signatories.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const signatories = await prisma.signatory.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(signatories);
    } catch (error) {
      console.error("Error fetching signatories:", error);
      res.status(500).json({ error: "Failed to fetch signatories" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
