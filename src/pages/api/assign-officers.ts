// File: `src/pages/api/assign-officers.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { officeId, staffId, signatoryId } = req.body;

    try {
      await prisma.office.update({
        where: { id: officeId },
        data: {
          staff: { connect: { id: staffId } },
          signatory: { connect: { id: signatoryId } },
        },
      });
      res.status(200).json({ message: "Officers assigned successfully" });
    } catch (error) {
      console.error("Error assigning officers:", error);
      res.status(500).json({ error: "Failed to assign officers" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
