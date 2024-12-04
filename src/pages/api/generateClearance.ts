// generateClearance.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { sendClearanceEmail } from "@/utils/emailService";
import { ClearanceStatus } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { semesterId } = req.body;

  if (!semesterId) {
    return res.status(400).json({ error: "Semester ID is required" });
  }

  try {
    const semester = await prisma.semester.findUnique({
      where: { id: semesterId },
      include: { schoolYear: true },
    });

    if (!semester) {
      return res.status(404).json({ error: "Semester not found" });
    }

    const schoolYearId = semester.schoolYear.id;

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

    const offices = await prisma.office.findMany({
      include: {
        Department: true,
      },
    });

    const clearances = [];

    for (const student of students) {
      const clearance = await prisma.clearance.create({
        data: {
          studentId: student.id,
          semesterId,
          schoolYearId,
        },
      });

      for (const office of offices) {
        if (office.Department && office.Department.length > 0) {
          const studentDepartmentId = student.program.department?.id;
          const matchingDepartment = office.Department.find(
            (department) => department.id === studentDepartmentId
          );

          if (matchingDepartment) {
            await prisma.clearanceStep.create({
              data: {
                clearanceId: clearance.id,
                officeId: office.id,
                departmentId: matchingDepartment.id,
                status: ClearanceStatus.PENDING,
              },
            });

            const signatories = await prisma.signatory.findMany({
              where: {
                officeId: office.id,
                departmentId: matchingDepartment.id,
              },
              include: { user: true },
            });

            for (const signatory of signatories) {
              await sendClearanceEmail(
                signatory.user.email,
                `${semester.name} ${semester.schoolYear.startYear}-${semester.schoolYear.endYear}`,
                "staff"
              );
            }
          }
        } else {
          await prisma.clearanceStep.create({
            data: {
              clearanceId: clearance.id,
              officeId: office.id,
              status: ClearanceStatus.PENDING,
            },
          });

          const signatories = await prisma.signatory.findMany({
            where: { officeId: office.id },
            include: { user: true },
          });

          for (const signatory of signatories) {
            await sendClearanceEmail(
              signatory.user.email,
              `${semester.name} ${semester.schoolYear.startYear}-${semester.schoolYear.endYear}`,
              "staff"
            );
          }
        }
      }

      // Send email to student without stopping the process if it fails
      await sendClearanceEmail(
        student.email,
        `${semester.name} ${semester.schoolYear.startYear}-${semester.schoolYear.endYear}`,
        "student"
      );
      console.log(`Processed student ${student.email}`);

      clearances.push(clearance);
    }

    console.log("Created Clearances:", clearances);

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
