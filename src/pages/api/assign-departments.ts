// File: `src/pages/api/assign-departments.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { officeId, departmentIds } = req.body;

    try {
      await prisma.office.update({
        where: { id: officeId },
        data: {
          departments: {
            set: departmentIds.map((id) => ({ id })),
          },
        },
      });
      res.status(200).json({ message: "Departments assigned successfully" });
    } catch (error) {
      console.error("Error assigning departments:", error);
      res.status(500).json({ error: "Failed to assign departments" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
