import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { requirementId } = req.body;

  if (!requirementId) {
    return res.status(400).json({ message: "Missing requirementId" });
  }

  try {
    await prisma.requirement.delete({
      where: {
        id: requirementId,
      },
    });

    res.status(200).json({ message: "Requirement deleted successfully" });
  } catch (error) {
    console.error("Error deleting requirement:", error);
    res.status(500).json({ message: "Error deleting requirement", error });
  }
}
