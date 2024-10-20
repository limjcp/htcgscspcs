import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { departmentId, userId } = req.body;

  if (!departmentId || !userId) {
    return res
      .status(400)
      .json({ message: "Department ID and User ID are required" });
  }

  try {
    console.log(
      `Assigning dean: departmentId=${departmentId}, userId=${userId}`
    );

    // Ensure the user is in the Signatory table
    const signatory = await prisma.signatory.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        isProgramHead: true,
      },
    });

    // Assign the user as the program head of the department
    await prisma.department.update({
      where: { id: departmentId },
      data: { programHeadid: signatory.id },
    });

    res.status(200).json({ message: "Dean assigned successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma error code for record not found
      res.status(404).json({ message: "Department or User not found" });
    } else {
      console.error("Error assigning dean:", error);
      res.status(500).json({ message: "Error assigning dean", error });
    }
  }
}
