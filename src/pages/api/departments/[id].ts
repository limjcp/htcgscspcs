import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    console.error("Invalid ID:", id);
    return res.status(400).json({ error: "Invalid ID" });
  }

  const departmentId = id as string;

  console.log("Request method:", req.method);
  console.log("department ID:", departmentId);
  console.log("Request body:", req.body);

  if (req.method === "PUT") {
    const { name, description, programIds } = req.body;

    try {
      const departmentExists = await prisma.department.findUnique({
        where: { id: departmentId },
      });

      if (!departmentExists) {
        console.error("department not found:", departmentId);
        return res.status(404).json({ error: "department not found" });
      }

      const department = await prisma.department.update({
        where: { id: departmentId },
        data: {
          name,
          description,
          programs: {
            set: programIds.map((id) => ({ id })),
          },
        },
      });
      res.status(200).json(department);
    } catch (error) {
      console.error("Failed to update department:", error);
      res.status(500).json({ error: "Failed to update department" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.department.delete({
        where: { id: departmentId },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete department:", error);
      res.status(500).json({ error: "Failed to delete department" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
