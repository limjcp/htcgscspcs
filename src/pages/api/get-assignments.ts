// File: src/pages/api/get-assignments.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { officeId } = req.query;

    try {
      const office = await prisma.office.findUnique({
        where: { id: officeId as string },
        include: {
          staff: true,
          signatory: true,
        },
      });

      if (!office) {
        return res.status(404).json({ error: "Office not found" });
      }

      const staffId = office.staff.length > 0 ? office.staff[0].id : null;
      const signatoryId =
        office.signatory.length > 0 ? office.signatory[0].id : null;

      res.status(200).json({ staffId, signatoryId });
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
