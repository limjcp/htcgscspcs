// File: `src/pages/api/update-role.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, newRole } = req.body;

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
      });
      res.status(200).json({ message: "Role updated successfully" });
    } catch (error) {
      console.error("Error updating role:", error);
      res.status(500).json({ error: "Failed to update role" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
