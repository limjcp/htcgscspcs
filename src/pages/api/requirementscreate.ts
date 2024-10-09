import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, description, staffId, schoolYearId, semesterId } = req.body;

  if (!schoolYearId || !semesterId) {
    return res
      .status(400)
      .json({ message: "School year ID and semester ID are required" });
  }

  try {
    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
      include: { office: true, department: true },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const requirementData: any = {
      name,
      description,
      schoolYear: {
        connect: { id: schoolYearId },
      },
      semester: {
        connect: { id: semesterId },
      },
    };

    if (staff.officeId) {
      requirementData.office = { connect: { id: staff.officeId } };
    } else if (staff.departmentId) {
      requirementData.department = {
        connect: { id: staff.departmentId },
      };
    } else {
      return res
        .status(400)
        .json({ message: "Staff is not assigned to an office or department" });
    }

    const requirement = await prisma.requirement.create({
      data: requirementData,
    });

    res.status(201).json(requirement);
  } catch (error) {
    console.error("Error creating requirement:", error);
    res.status(500).json({ message: "Error creating requirement", error });
  }
}
