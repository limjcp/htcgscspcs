import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { year, semester, departmentId, clearanceStatus } = req.body;

    try {
      const students = await prisma.student.findMany({
        where: {
          enrollmentYear: {
            year: year,
          },
          enrollmentSemester: {
            name: semester,
          },
          ...(departmentId !== "all" && {
            program: {
              departmentId: departmentId,
            },
          }),
          ...(clearanceStatus === "cleared" && {
            clearances: {
              some: {
                status: "CLEARED",
              },
            },
          }),
          ...(clearanceStatus === "not_cleared" && {
            clearances: {
              none: {
                status: "CLEARED",
              },
            },
          }),
        },
        include: {
          clearances: true,
          program: {
            include: {
              department: true,
            },
          },
        },
      });

      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
