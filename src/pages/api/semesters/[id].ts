import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { action } = req.body;

    try {
      if (action === "start") {
        // Distribute new clearances to students
        const students = await prisma.student.findMany();
        for (const student of students) {
          await prisma.clearance.create({
            data: {
              studentId: student.id,
              semesterId: id as string,
            },
          });
        }
      } else if (action === "end") {
        // Generate reports
        const clearances = await prisma.clearance.findMany({
          where: { semesterId: id as string },
        });
        const totalStudents = clearances.length;
        const clearedStudents = clearances.filter(
          (c) => c.status === "CLEARED",
        ).length;
        const pendingStudents = clearances.filter(
          (c) => c.status === "PENDING",
        ).length;
        const rejectedStudents = clearances.filter(
          (c) => c.status === "REJECTED",
        ).length;

        await prisma.report.create({
          data: {
            semesterId: id as string,
            totalStudents,
            clearedStudents,
            pendingStudents,
            rejectedStudents,
          },
        });
      } else if (action === "delete") {
        await prisma.semester.delete({
          where: { id: id as string },
        });
      } else if (action === "edit") {
        // Handle edit action
        // You can add the logic for editing a semester here
      }

      res.status(200).json({ message: `Semester ${action} successfully!` });
    } catch (error) {
      console.error(`Error ${action} semester:`, error);
      res.status(500).json({ error: `Failed to ${action} semester` });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
