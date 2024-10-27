// /pages/api/getOfficesWithDependencies.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const offices = await prisma.office.findMany({
      include: {
        dependencies: {
          include: {
            required: true,
          },
        },
        dependentOn: {
          include: {
            required: true,
          },
        },
      },
    });
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offices" });
  }
}
