import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { semesterId } = req.body;

  if (!semesterId) {
    return res.status(400).json({ error: "Semester ID is required" });
  }

  try {
    // Fetch the semester details including the associated school year
    const semester = await prisma.semester.findUnique({
      where: { id: semesterId },
      include: { schoolYear: true },
    });

    if (!semester) {
      return res.status(404).json({ error: "Semester not found" });
    }

    const schoolYearId = semester.schoolYear.id;

    const students = await prisma.student.findMany({
      include: {
        program: {
          include: {
            department: true,
          },
        },
      },
    });

    console.log("Fetched Students:", students);

    const offices = await prisma.office.findMany();

    const clearanceSteps = students.map((student) => ({
      studentId: student.id,
      semesterId,
      schoolYearId,
      steps: {
        create: offices.map((office) => ({
          officeId: office.id,
          status: "PENDING",
          departmentId: student.program.department?.id || null,
        })),
      },
    }));

    // Filter out students without a department
    const validClearanceSteps = clearanceSteps.filter((step) =>
      step.steps.create.every((s) => s.departmentId !== null)
    );

    console.log("Valid Clearance Steps:", validClearanceSteps);

    const createdClearances = await prisma.clearance.createMany({
      data: validClearanceSteps,
    });

    console.log("Created Clearances:", createdClearances);

    res
      .status(200)
      .json({ message: "Clearance generated successfully for all students!" });
  } catch (error) {
    console.error("Error generating clearance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
