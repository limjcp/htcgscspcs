// File: `src/pages/api/offices-with-users.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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

    console.log("Fetched offices:", JSON.stringify(offices, null, 2)); // Add logging

    const result = offices.map((office) => ({
      id: office.id,
      name: office.name,
      staff: office.staff.map((staff) => ({
        id: staff.user.id,
        name: staff.user.name,
      })),
      signatories: office.signatory.map((signatory) => ({
        id: signatory.user.id,
        name: signatory.user.name,
      })),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching offices:", error); // Add logging
    res.status(500).json({ error: "Failed to fetch offices" });
  }
}
