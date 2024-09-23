import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const semesters = await prisma.semester.findMany();
      res.status(200).json(semesters);
    } catch (error) {
      console.error("Error fetching semesters:", error);
      res.status(500).json({ error: "Failed to fetch semesters" });
    }
  } else if (req.method === "POST") {
    const { name, startDate, endDate, schoolYearId } = req.body;

    try {
      const semester = await prisma.semester.create({
        data: {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          schoolYearId,
        },
      });
      res.status(201).json(semester);
    } catch (error) {
      console.error("Error creating semester:", error);
      res.status(500).json({ error: "Failed to create semester" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
