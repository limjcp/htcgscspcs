import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  if (req.method === "GET") {
    try {
      const offices = await prisma.office.findMany({
        include: {
          programs: true,
        },
      });
      console.log("Fetched offices:", offices);
      res.status(200).json(offices);
    } catch (error) {
      console.error("Error fetching offices:", error);
      res.status(500).json({ error: "Failed to fetch offices" });
    }
  } else if (req.method === "POST") {
    const { name } = req.body;

    try {
      const office = await prisma.office.create({
        data: {
          name,
        },
      });
      console.log("Created office:", office);
      res.status(201).json(office);
    } catch (error) {
      console.error("Error creating office:", error);
      res.status(500).json({ error: "Failed to create office" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
