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

    const allStudentsCount = await prisma.student.count({
      where: {
        clearances: {
          some: {
            steps: {
              some: whereClause,
            },
          },
        },
      },
    });

    const pendingStudentsCount = await prisma.clearanceStep.count({
      where: {
        ...whereClause,
        status: "PENDING",
      },
    });

    const approvedStudentsCount = await prisma.clearanceStep.count({
      where: {
        ...whereClause,
        status: "APPROVED",
      },
    });

    const signedStudentsCount = await prisma.clearanceStep.count({
      where: {
        ...whereClause,
        status: "SIGNED",
      },
    });

    res.status(200).json({
      allStudents: allStudentsCount,
      pendingStudents: pendingStudentsCount,
      approvedStudents: approvedStudentsCount,
      signedStudents: signedStudentsCount,
      approvedsignedStudents: approvedStudentsCount + signedStudentsCount,
    });
  } catch (error) {
    console.error("Error fetching student counts:", error);
    res.status(500).json({ message: "Error fetching student counts", error });
  }
}
