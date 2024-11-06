import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { schoolYearId } = req.query;
    try {
      const semesters = await prisma.semester.findMany({
        where: { schoolYearId: String(schoolYearId) },
      });
      res.status(200).json(semesters);
    } catch (error) {
      res.status(500).json({ error: "Error fetching semesters" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
