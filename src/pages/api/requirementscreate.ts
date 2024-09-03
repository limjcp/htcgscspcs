import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, description, staffId } = req.body;

  try {
    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
      include: { office: true },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const requirement = await prisma.requirement.create({
      data: {
        name,
        description,
        officeId: staff.officeId,
      },
    });

    res.status(201).json(requirement);
  } catch (error) {
    res.status(500).json({ message: "Error creating requirement", error });
  }
}
