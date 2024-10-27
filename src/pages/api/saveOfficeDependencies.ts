// /pages/api/saveOfficeDependencies.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { officeId, dependencies } = req.body;

  try {
    console.log("Received data:", { officeId, dependencies });

    // Delete existing dependencies
    await prisma.officeDependency.deleteMany({
      where: { dependentId: officeId },
    });

    // Create new dependencies
    await prisma.officeDependency.createMany({
      data: dependencies.map((dependencyId: string) => ({
        dependentId: officeId,
        requiredId: dependencyId,
      })),
    });

    res.status(200).json({ message: "Dependencies updated successfully" });
  } catch (error) {
    console.error("Failed to update dependencies", error);
    res.status(500).json({ error: "Failed to update dependencies" });
  }
}
