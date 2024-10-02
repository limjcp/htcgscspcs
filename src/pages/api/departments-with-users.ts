// File: `src/pages/api/departments-with-users.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    const result = departments.map((department) => ({
      id: department.id,
      name: department.name,
      staff: department.staff.map((staff) => ({
        id: staff.user.id,
        name: staff.user.firstName + " " + staff.user.lastName,
      })),
      signatories: department.signatory.map((signatory) => ({
        id: signatory.user.id,
        name: signatory.user.firstName + " " + signatory.user.lastName,
      })),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
}
