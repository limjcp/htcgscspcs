import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requirements = await prisma.requirement.findMany({
      include: {
        office: true,
        department: true,
      },
    });
    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ error: "Error fetching requirements" });
  }
}
