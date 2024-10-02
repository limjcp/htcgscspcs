import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const offices = await prisma.office.findMany({
      include: {
        staff: {
          include: {
            user: true,
          },
        },
        signatory: {
          include: {
            user: true,
          },
        },
      },
    });

    const departments = await prisma.department.findMany({
      include: {
        staff: {
          include: {
            user: true,
          },
        },
        signatory: {
          include: {
            user: true,
          },
        },
      },
    });

    res.status(200).json({ offices, departments });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
