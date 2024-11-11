import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { studentId } = req.query;
    try {
      const studentRequirements = await prisma.studentRequirement.findMany({
        where: {
          studentId: String(studentId),
        },
        include: {
          requirement: true,
        },
      });
      res.status(200).json(studentRequirements);
    } catch (error) {
      res.status(500).json({ error: "Error fetching student requirements" });
    }
  } else if (req.method === "PATCH") {
    const { id } = req.query;
    const { status, comments } = req.body;
    try {
      const updatedRequirement = await prisma.studentRequirement.update({
        where: { id: String(id) },
        data: {
          status,
          comments,
        },
      });
      res.status(200).json(updatedRequirement);
    } catch (error) {
      res.status(500).json({ error: "Error updating student requirement" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
