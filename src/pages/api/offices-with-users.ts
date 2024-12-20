// File: `src/pages/api/offices-with-users.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

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

    const result = offices.map((office) => ({
      id: office.id,
      name: office.name,
      staff: office.staff.map((staff) => ({
        id: staff.user.id,
        name: staff.user.firstName + " " + staff.user.lastName,
      })),
      signatories: office.signatory.map((signatory) => ({
        id: signatory.user.id,
        name: signatory.user.firstName + " " + signatory.user.lastName,
      })),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching offices:", error);
    res.status(500).json({ error: "Failed to fetch offices" });
  }
}
