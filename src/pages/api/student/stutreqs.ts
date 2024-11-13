import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year, semesterId, officeId, departmentId } = req.query;

  if (!year || !semesterId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const requirements = await prisma.requirement.findMany({
      where: {
        AND: [
          {
            schoolYearId: String(year),
            semesterId: String(semesterId),
          },
          {
            OR: [
              ...(officeId ? [{ officeId: String(officeId) }] : []),
              ...(departmentId ? [{ departmentId: String(departmentId) }] : []),
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        office: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log("Found requirements:", requirements);
    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ error: "Failed to fetch requirements" });
  }
}
