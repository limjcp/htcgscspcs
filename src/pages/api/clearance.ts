import { NextApiRequest, NextApiResponse } from "next";
import { ClearanceStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const student = await prisma.student.findUnique({
      where: {
        userId,
      },
      include: {
        clearances: {
          include: {
            steps: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const signedSteps = student.clearances.flatMap((clearance) =>
      clearance.steps.filter((step) => step.status === ClearanceStatus.SIGNED)
    ).length;

    const notSignedSteps = student.clearances.flatMap((clearance) =>
      clearance.steps.filter((step) => step.status !== ClearanceStatus.SIGNED)
    ).length;

    res.status(200).json({ signedSteps, notSignedSteps });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
