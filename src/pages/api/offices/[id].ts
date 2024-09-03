import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    console.error("Invalid ID:", id);
    return res.status(400).json({ error: "Invalid ID" });
  }

  const officeId = id as string;

  console.log("Request method:", req.method);
  console.log("Office ID:", officeId);
  console.log("Request body:", req.body);

  if (req.method === "PUT") {
    const { name } = req.body;

    try {
      const officeExists = await prisma.office.findUnique({
        where: { id: officeId },
      });

      if (!officeExists) {
        console.error("Office not found:", officeId);
        return res.status(404).json({ error: "Office not found" });
      }

      const office = await prisma.office.update({
        where: { id: officeId },
        data: { name },
      });
      res.status(200).json(office);
    } catch (error) {
      console.error("Failed to update office:", error);
      res.status(500).json({ error: "Failed to update office" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.office.delete({
        where: { id: officeId },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete office:", error);
      res.status(500).json({ error: "Failed to delete office" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
