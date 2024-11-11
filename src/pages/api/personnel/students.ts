import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { semesterId } = req.query;
    try {
      const students = await prisma.student.findMany({
        where: {
          enrollmentSemesterId: String(semesterId),
        },
        include: {
          program: {
            include: {
              department: true,
            },
          },
          clearances: {
            include: {
              steps: {
                include: {
                  office: true,
                  department: true,
                },
              },
            },
          },
          requirements: true, // Include requirements
        },
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: "Error fetching students" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
