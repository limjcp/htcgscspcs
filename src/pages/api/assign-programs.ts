// File: `src/pages/api/assign-programs.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { officeId, departmentId, programIds } = req.body;

    try {
      if (officeId) {
        await prisma.office.update({
          where: { id: officeId },
          data: {
            programs: {
              set: programIds.map((id) => ({ id })),
            },
          },
        });
        res
          .status(200)
          .json({ message: "Programs assigned to office successfully" });
      } else if (departmentId) {
        await prisma.department.update({
          where: { id: departmentId },
          data: {
            programs: {
              set: programIds.map((id) => ({ id })),
            },
          },
        });
        res
          .status(200)
          .json({ message: "Programs assigned to department successfully" });
      } else {
        res
          .status(400)
          .json({ error: "officeId or departmentId must be provided" });
      }
    } catch (error) {
      console.error("Error assigning programs:", error);
      res.status(500).json({ error: "Failed to assign programs" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
