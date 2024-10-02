import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  if (req.method === "GET") {
    try {
      const departments = await prisma.department.findMany({
        include: {
          programs: true,
        },
      });
      console.log("Fetched departments:", departments);
      res.status(200).json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  } else if (req.method === "POST") {
    const { name } = req.body;

    try {
      const department = await prisma.department.create({
        data: {
          name,
        },
      });
      console.log("Created department:", department);
      res.status(201).json(department);
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Failed to create department" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
