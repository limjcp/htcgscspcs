// File: `src/pages/api/update-office.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { officeId, staffId, signatoryId } = req.body;

  try {
    if (staffId) {
      await prisma.staff.update({
        where: { officeId },
        data: { userId: staffId },
      });
    }

    if (signatoryId) {
      await prisma.signatory.update({
        where: { officeId },
        data: { userId: signatoryId },
      });
    }

    res.status(200).json({ message: "Office updated successfully" });
  } catch (error) {
    console.error("Error updating office:", error);
    res.status(500).json({ error: "Failed to update office" });
  }
}
