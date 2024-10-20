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
  } else if (req.method === "POST") {
    const { userId, officeId } = req.body;

    try {
      // Check if the signatory record already exists
      const existingSignatory = await prisma.signatory.findUnique({
        where: { userId },
      });

      if (existingSignatory) {
        // Update the existing signatory record
        await prisma.signatory.update({
          where: { userId },
          data: { officeId },
        });
      } else {
        // Create a new signatory record
        await prisma.signatory.create({
          data: { userId, officeId },
        });
      }

      // Update the user's role to include "signatory" and "personnel"
      await prisma.user.update({
        where: { id: userId },
        data: { role: { set: ["signatory", "personnel"] } },
      });

      res.status(200).json({ message: "Signatory assigned successfully" });
    } catch (error) {
      console.error("Error assigning signatory:", error);
      res.status(500).json({ error: "Failed to assign signatory" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
