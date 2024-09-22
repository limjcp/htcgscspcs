import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { startYear, endYear, year, semesters } = req.body;

    if (
      !startYear ||
      !endYear ||
      !year ||
      !semesters ||
      semesters.length !== 2
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields" });
    }

    try {
      console.log("Creating school year with data:", req.body); // Log the request body
      const schoolYear = await prisma.schoolYear.create({
        data: {
          startYear: parseInt(startYear),
          endYear: parseInt(endYear),
          year,
          semesters: {
            create: semesters.map((semester: any) => ({
              name: semester.name,
              startDate: new Date(semester.startDate),
              endDate: new Date(semester.endDate),
            })),
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
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Missing school year ID" });
    }

    try {
      await prisma.$transaction([
        prisma.semester.deleteMany({
          where: { schoolYearId: id },
        }),
        prisma.schoolYear.delete({
          where: { id },
        }),
      ]);
      res.status(200).json({ message: "School year deleted successfully" });
    } catch (error) {
      console.error("Error deleting school year:", error);
      res.status(500).json({ error: "Failed to delete school year" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
