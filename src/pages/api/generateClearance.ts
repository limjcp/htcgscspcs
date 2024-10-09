import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { sendClearanceEmail } from "@/utils/emailService"; // Import the email sending function

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

    // Fetch all students
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

    // Fetch all offices
    const offices = await prisma.office.findMany();

    // Generate clearance for all students
    const clearances = await Promise.all(
      students.map(async (student) => {
        const clearance = await prisma.clearance.create({
          data: {
            studentId: student.id,
            semesterId,
            schoolYearId,
          },
        });

        // Create office steps
        const officeSteps = offices.map((office) => ({
          clearanceId: clearance.id,
          officeId: office.id,
          status: "PENDING",
        }));

        await prisma.clearanceStep.createMany({
          data: officeSteps,
        });

        // Create department step if department exists
        if (student.program.department?.id) {
          const departmentStep = {
            clearanceId: clearance.id,
            departmentId: student.program.department.id,
            status: "PENDING",
          };

          await prisma.clearanceStep.create({
            data: departmentStep,
          });
        }

        // Send email to the student about clearance availability
        try {
          await sendClearanceEmail(
            student.email,
            `${semester.name} ${semester.schoolYear.startYear}-${semester.schoolYear.endYear}`
          );
          console.log(`Email sent to ${student.email}`);
        } catch (emailError) {
          console.error(
            `Failed to send email to ${student.email}:`,
            emailError
          );
        }

        return clearance;
      })
    );

    console.log("Created Clearances:", clearances);

    res
      .status(200)
      .json({ message: "Clearance generated successfully for all students!" });
  } catch (error) {
    console.error("Error generating clearance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
