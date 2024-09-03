// File: `src/pages/api/assign-user.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, role, officeId } = req.body;

    try {
      if (role === "staff") {
        await prisma.staff.create({
          data: {
            userId,
            officeId,
          },
        });
      } else if (role === "signatory") {
        await prisma.signatory.create({
          data: {
            userId,
            officeId,
          },
        });
      }
      res.status(200).json({ message: "User assigned successfully" });
    } catch (error) {
      console.error("Error assigning user:", error);
      res.status(500).json({ error: "Failed to assign user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
