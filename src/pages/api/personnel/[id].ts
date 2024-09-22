// api/personnel/[id].ts
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "DELETE") {
    try {
      await prisma.user.delete({
        where: { id: String(id) },
      });
      res.status(200).json({ message: "Personnel deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error deleting personnel." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
