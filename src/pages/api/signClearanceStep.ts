import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { ClearanceStatus } from "@prisma/client";

async function checkDependencies(
  officeId: string,
  clearanceId: string
): Promise<boolean> {
  // Get office dependencies
  const dependencies = await prisma.officeDependency.findMany({
    where: {
      dependentId: officeId,
    },
    include: {
      required: true,
    },
  });

  // Check if all dependent offices are signed
  for (const dependency of dependencies) {
    const dependentStep = await prisma.clearanceStep.findFirst({
      where: {
        clearanceId: clearanceId,
        officeId: dependency.requiredId,
        status: ClearanceStatus.SIGNED,
      },
    });

    if (!dependentStep) {
      return false;
    }
  }

  return true;
}

async function checkAllStepsSigned(clearanceId: string): Promise<boolean> {
  const steps = await prisma.clearanceStep.findMany({
    where: {
      clearanceId: clearanceId,
    },
  });

  return steps.every((step) => step.status === ClearanceStatus.SIGNED);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { studentId, stepId, officeId, departmentId, signatoryName } = req.body;

  if (!studentId || !stepId || (!officeId && !departmentId) || !signatoryName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Get clearance step with clearance information
    const clearanceStep = await prisma.clearanceStep.findFirst({
      where: {
        id: stepId,
        status: ClearanceStatus.APPROVED,
      },
      include: {
        clearance: true,
      },
    });

    if (!clearanceStep) {
      return res
        .status(404)
        .json({ message: "Clearance step not found or not approved" });
    }

    // Check dependencies if office is specified
    if (officeId) {
      const dependenciesMet = await checkDependencies(
        officeId,
        clearanceStep.clearanceId
      );
      if (!dependenciesMet) {
        return res.status(400).json({
          message: "Dependencies must be signed first",
        });
      }
    }

    // Sign the clearance step
    await prisma.clearanceStep.update({
      where: {
        id: stepId,
      },
      data: {
        status: ClearanceStatus.SIGNED,
        signedAt: new Date(),
        signedBy: signatoryName,
      },
    });

    // Check if all steps are signed
    const allStepsSigned = await checkAllStepsSigned(clearanceStep.clearanceId);
    if (allStepsSigned) {
      // Update clearance status to CLEARED
      await prisma.clearance.update({
        where: {
          id: clearanceStep.clearanceId,
        },
        data: {
          status: ClearanceStatus.CLEARED,
        },
      });
    }

    res.status(200).json({
      message: "Clearance step signed successfully",
      clearanceCompleted: allStepsSigned,
    });
  } catch (error) {
    console.error("Error signing clearance step:", error);
    res.status(500).json({ message: "Error signing clearance step", error });
  }
}
