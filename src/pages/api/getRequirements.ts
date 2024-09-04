import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { officeId } = req.query;

  if (!officeId) {
    return res.status(400).json({ message: "Missing officeId" });
  }

  try {
    const requirements = await prisma.requirement.findMany({
      where: {
        officeId: String(officeId),
      },
    });

    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ message: "Error fetching requirements", error });
  }
}
