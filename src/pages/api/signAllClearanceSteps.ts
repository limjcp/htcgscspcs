import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { steps } = req.body;

  if (!steps || !Array.isArray(steps)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const updatePromises = steps.map((step) =>
      prisma.clearanceStep.update({
        where: {
          id: step.stepId,
        },
        data: {
          status: "SIGNED",
        },
      })
    );

    await Promise.all(updatePromises);

    res
      .status(200)
      .json({ message: "All approved clearance steps signed successfully" });
  } catch (error) {
    console.error("Error signing all clearance steps:", error);
    res
      .status(500)
      .json({ message: "Error signing all clearance steps", error });
  }
}
