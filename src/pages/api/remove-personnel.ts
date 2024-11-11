import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, officeOrDepartmentId, type } = req.body;

    if (!userId || !officeOrDepartmentId || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (type === "staff") {
        await prisma.staff.deleteMany({
          where: { userId, officeId: officeOrDepartmentId },
        });
      } else if (type === "signatory") {
        await prisma.signatory.deleteMany({
          where: { userId, officeId: officeOrDepartmentId },
        });
      }

      res.status(200).json({ message: `${type} removed successfully` });
    } catch (error) {
      console.error("Error removing personnel:", error);
      res.status(500).json({ error: "Failed to remove personnel" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
