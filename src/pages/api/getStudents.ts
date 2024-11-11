import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { officeId, departmentId, schoolYearId, semesterId } = req.query;

  if (!officeId && !departmentId && (!schoolYearId || !semesterId)) {
    return res.status(400).json({
      message:
        "Office ID, Department ID, or School Year ID and Semester ID are required",
    });
  }

  try {
    let students;

    if (schoolYearId && semesterId) {
      // Fetch students based on schoolYearId and semesterId
      students = await prisma.student.findMany({
        where: {
          enrollmentYearId: String(schoolYearId),
          enrollmentSemesterId: String(semesterId),
          clearances: {
            some: {
              steps: {
                some: {
                  OR: [
                    { officeId: officeId ? String(officeId) : undefined },
                    {
                      departmentId: departmentId
                        ? String(departmentId)
                        : undefined,
                    },
                  ],
                },
              },
            },
          },
        },
        include: {
          user: true,
          program: {
            include: {
              department: true,
            },
          },
          clearances: {
            include: {
              steps: {
                where: {
                  OR: [
                    { officeId: officeId ? String(officeId) : undefined },
                    {
                      departmentId: departmentId
                        ? String(departmentId)
                        : undefined,
                    },
                  ],
                },
                include: {
                  office: true,
                  department: true,
                },
              },
            },
          },
        },
      });
    } else {
      // Fetch students based on officeId or departmentId
      students = await prisma.student.findMany({
        include: {
          user: true,
          clearances: {
            include: {
              steps: {
                where: {
                  OR: [
                    { officeId: officeId ? String(officeId) : undefined },
                    {
                      departmentId: departmentId
                        ? String(departmentId)
                        : undefined,
                    },
                  ],
                },
                include: {
                  office: true,
                  department: true,
                },
              },
            },
          },
        },
      });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error });
  }
}
