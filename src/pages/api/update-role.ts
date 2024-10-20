// File: `src/pages/api/update-role.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, newRoles } = req.body;

    console.log("Received request to update roles:", { userId, newRoles });

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { role: { set: newRoles } }, // Use the `set` operator to update the role array
      });
      res.status(200).json({ message: "Roles updated successfully" });
    } catch (error) {
      console.error("Error updating roles:", error);
      res.status(500).json({ error: "Failed to update roles" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
