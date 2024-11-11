import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { RequirementStatus } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { officeId, departmentId, semesterId } = req.query;
    try {
      const requirements = await prisma.requirement.findMany({
        where: {
          OR: [
            { officeId: String(officeId) },
            { departmentId: String(departmentId) },
          ],
          semesterId: String(semesterId),
        },
      });
      res.status(200).json(requirements);
    } catch (error) {
      res.status(500).json({ error: "Error fetching requirements" });
    }
  } else if (req.method === "POST") {
    const {
      name,
      description,
      officeId,
      departmentId,
      semesterId,
      schoolYearId,
    } = req.body;
    try {
      const requirement = await prisma.requirement.create({
        data: {
          name,
          description,
          officeId,
          departmentId,
          semesterId,
          schoolYearId,
        },
      });

      // Fetch students enrolled in the selected year and semester
      const students = await prisma.student.findMany({
        where: {
          enrollmentYearId: schoolYearId,
          enrollmentSemesterId: semesterId,
        },
      });

      // Create StudentRequirement entries for each student
      const studentRequirements = students.map((student) => ({
        studentId: student.id,
        requirementId: requirement.id,
        status: "PENDING" as RequirementStatus,
      }));

      await prisma.studentRequirement.createMany({
        data: studentRequirements,
      });

      res.status(200).json(requirement);
    } catch (error) {
      res.status(500).json({ error: "Error creating requirement" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await prisma.requirement.delete({ where: { id: String(id) } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting requirement" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
