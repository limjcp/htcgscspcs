import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { officeId, departmentId } = req.query;

  if (!officeId && !departmentId) {
    return res
      .status(400)
      .json({ message: "Missing officeId or departmentId" });
  }

  try {
    const whereClause = officeId
      ? { officeId: String(officeId) }
      : { departmentId: String(departmentId) };

    const requirements = await prisma.requirement.findMany({
      where: whereClause,
    });

    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ message: "Error fetching requirements", error });
  }
}
