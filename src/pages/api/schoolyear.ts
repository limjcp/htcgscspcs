import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { startYear, endYear, year, firstSemester, secondSemester } =
      req.body;

    try {
      const schoolYear = await prisma.schoolYear.create({
        data: {
          startYear: parseInt(startYear),
          endYear: parseInt(endYear),
          year,
          semesters: {
            create: [
              {
                name: firstSemester.name,
                startDate: new Date(firstSemester.startDate),
                endDate: new Date(firstSemester.endDate),
              },
              {
                name: secondSemester.name,
                startDate: new Date(secondSemester.startDate),
                endDate: new Date(secondSemester.endDate),
              },
            ],
          },
        },
      });
      res.status(201).json(schoolYear);
    } catch (error) {
      console.error("Error creating school year:", error);
      res.status(500).json({ error: "Failed to create school year" });
    }
  } else if (req.method === "GET") {
    try {
      const schoolYears = await prisma.schoolYear.findMany({
        include: {
          semesters: true,
        },
      });
      res.status(200).json(schoolYears);
    } catch (error) {
      console.error("Error fetching school years:", error);
      res.status(500).json({ error: "Failed to fetch school years" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
