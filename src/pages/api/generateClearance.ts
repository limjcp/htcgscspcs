import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { sendClearanceEmail } from "@/utils/emailService"; // Import the email sending function
import { ClearanceStatus } from "@prisma/client"; // Import the ClearanceStatus enum

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

    // Fetch all students who are not archived and are enrolled in the selected semester
    const students = await prisma.student.findMany({
      where: {
        archived: false,
        enrollmentSemesterId: semesterId,
        enrollmentYearId: schoolYearId,
      },
      include: {
        program: {
          include: {
            department: true,
          },
        },
      },
    });

    console.log("Fetched Students:", students);

    // Fetch all offices including the departmentId field
    const offices = await prisma.office.findMany({
      select: {
        id: true,
        name: true,
        Department: true, // Ensure this field is included
      },
    });

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

        // Create office steps with department-specific signatories if applicable
        for (const office of offices) {
          if (office.Department) {
            const departmentStep = {
              clearanceId: clearance.id,
              officeId: office.id,
              departmentId: student.program.department?.id,
              status: ClearanceStatus.PENDING,
            };

            await prisma.clearanceStep.create({
              data: departmentStep,
            });
          } else {
            const officeStep = {
              clearanceId: clearance.id,
              officeId: office.id,
              status: ClearanceStatus.PENDING,
            };

            await prisma.clearanceStep.create({
              data: officeStep,
            });
          }
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

    // Log the clearance generation
    const logEntry = await prisma.clearanceLog.create({
      data: {
        schoolYear: `${semester.schoolYear.startYear}-${semester.schoolYear.endYear}`,
        semester: semester.name,
      },
    });

    res.status(200).json({
      message: "Clearance generated successfully for all students!",
      logEntry,
    });
  } catch (error) {
    console.error("Error generating clearance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
