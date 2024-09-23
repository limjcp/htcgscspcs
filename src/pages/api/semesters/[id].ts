import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { action } = req.body;

    try {
      if (action === "start") {
        // Update semester status to ONGOING
        await prisma.semester.update({
          where: { id: id as string },
          data: { status: "ONGOING" },
        });

        // Distribute new clearances to students
        const students = await prisma.student.findMany();
        const semester = await prisma.semester.findUnique({
          where: { id: id as string },
        });

        if (!semester) {
          throw new Error("Semester not found");
        }

        const clearancePromises = students.map((student) =>
          prisma.clearance.create({
            data: {
              studentId: student.id,
              semesterId: id as string,
              schoolYearId: semester.schoolYearId,
              status: "PENDING",
            },
          })
        );
        await Promise.all(clearancePromises);

        res.status(200).json({ message: "Semester started successfully!" });
      } else if (action === "end") {
        // Fetch the semester data
        const semester = await prisma.semester.findUnique({
          where: { id: id as string },
        });

        if (!semester) {
          throw new Error("Semester not found");
        }

        // Update semester status to FINISHED
        await prisma.semester.update({
          where: { id: id as string },
          data: { status: "FINISHED" },
        });

        // Generate reports
        const clearances = await prisma.clearance.findMany({
          where: { semesterId: id as string },
          include: { student: true },
        });
        const totalStudents = clearances.length;
        const clearedStudents = clearances.filter(
          (c) => c.status === "CLEARED"
        ).length;
        const pendingStudents = clearances.filter(
          (c) => c.status === "PENDING"
        ).length;
        const rejectedStudents = clearances.filter(
          (c) => c.status === "REJECTED"
        ).length;

        await prisma.report.create({
          data: {
            semesterId: id as string,
            totalStudents,
            clearedStudents,
            pendingStudents,
            rejectedStudents,
            schoolYear: semester.schoolYearId,
            clearedStudentsList: clearances
              .filter((c) => c.status === "CLEARED" && c.student?.name)
              .map((c) => c.student.name),
            notClearedStudentsList: clearances
              .filter((c) => c.status !== "CLEARED" && c.student?.name)
              .map((c) => c.student.name),
          },
        });

        res.status(200).json({ message: "Semester ended successfully!" });
      } else if (action === "delete") {
        await prisma.semester.delete({
          where: { id: id as string },
        });
        res.status(200).json({ message: "Semester deleted successfully!" });
      } else if (action === "edit") {
        // Handle edit action
        // You can add the logic for editing a semester here
        res.status(200).json({ message: "Semester edited successfully!" });
      } else {
        res.status(400).json({ message: "Invalid action" });
      }
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
