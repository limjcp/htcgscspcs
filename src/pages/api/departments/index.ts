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
          programHead: {
            select: {
              user: {
                select: {
                  id: true, // Include the dean's ID
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      const formattedDepartments = departments.map((department) => ({
        ...department,
        dean: department.programHead
          ? `${department.programHead.user.firstName} ${department.programHead.user.lastName}`
          : null,
        deanId: department.programHead ? department.programHead.user.id : null, // Set the deanId
      }));

      console.log("Fetched departments:", formattedDepartments);
      res.status(200).json(formattedDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  } else if (req.method === "POST") {
    const { name, description, programIds } = req.body;

    try {
      const department = await prisma.department.create({
        data: {
          name,
          description,
          programs: {
            connect: programIds.map((id) => ({ id })),
          },
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
