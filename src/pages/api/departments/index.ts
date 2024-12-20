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
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
          programPresident: {
            select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
        },
      });

      const formattedDepartments = departments.map((department) => ({
        ...department,
        programHead: department.programHead
          ? {
              id: department.programHead.id,
              firstName: department.programHead.firstName,
              middleName: department.programHead.middleName,
              lastName: department.programHead.lastName,
            }
          : null,
        programPresident: department.programPresident
          ? {
              id: department.programPresident.id,
              firstName: department.programPresident.firstName,
              middleName: department.programPresident.middleName,
              lastName: department.programPresident.lastName,
            }
          : null,
      }));

      console.log("Fetched departments:", formattedDepartments);
      res.status(200).json(formattedDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  } else if (req.method === "POST") {
    const { name, description, programIds, programHeadId, programPresidentId } =
      req.body;

    try {
      const department = await prisma.department.create({
        data: {
          name,
          description,
          programs: {
            connect: programIds.map((id) => ({ id })),
          },
          programHead: programHeadId
            ? { connect: { id: programHeadId } }
            : undefined,
          programPresident: programPresidentId
            ? { connect: { id: programPresidentId } }
            : undefined,
        },
      });

      console.log("Created department:", department);
      res.status(201).json(department);
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Failed to create department" });
    }
  } else if (req.method === "PUT") {
    const {
      id,
      name,
      description,
      programIds,
      programHeadId,
      programPresidentId,
    } = req.body;

    try {
      const departmentExists = await prisma.department.findUnique({
        where: { id },
      });

      if (!departmentExists) {
        console.error("Department not found:", id);
        return res.status(404).json({ error: "Department not found" });
      }

      // Handle program head assignment
      if (programHeadId) {
        let signatoryExists = await prisma.signatory.findUnique({
          where: { userId: programHeadId },
        });
        if (!signatoryExists) {
          const user = await prisma.user.findUnique({
            where: { id: programHeadId },
          });
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          signatoryExists = await prisma.signatory.create({
            data: {
              userId: programHeadId,
              departmentId: id,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
            },
          });
        } else {
          // Update the department for the existing signatory
          await prisma.signatory.update({
            where: { userId: programHeadId },
            data: { departmentId: id },
          });
        }

        // Update user role to signatory
        await prisma.user.update({
          where: { id: programHeadId },
          data: {
            role: {
              set: ["signatory", "personnel"],
            },
          },
        });
      } else {
        // If programHeadId is null, delete the signatory and revert role to personnel
        const existingSignatory = await prisma.signatory.findFirst({
          where: { departmentId: id },
        });
        if (existingSignatory) {
          await prisma.signatory.delete({
            where: { userId: existingSignatory.userId },
          });
          await prisma.user.update({
            where: { id: existingSignatory.userId },
            data: {
              role: {
                set: ["personnel"],
              },
            },
          });
        }
      }

      // Handle program president assignment
      if (programPresidentId) {
        let staffExists = await prisma.staff.findUnique({
          where: { userId: programPresidentId },
        });
        if (!staffExists) {
          const user = await prisma.user.findUnique({
            where: { id: programPresidentId },
          });
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          staffExists = await prisma.staff.create({
            data: {
              userId: programPresidentId,
              departmentId: id,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
            },
          });
        } else {
          // Update the department for the existing staff
          await prisma.staff.update({
            where: { userId: programPresidentId },
            data: { departmentId: id },
          });
        }

        // Update user role to staff
        await prisma.user.update({
          where: { id: programPresidentId },
          data: {
            role: {
              set: ["staff", "personnel"],
            },
          },
        });
      } else {
        // If programPresidentId is null, delete the staff and revert role to personnel
        const existingStaff = await prisma.staff.findFirst({
          where: { departmentId: id },
        });
        if (existingStaff) {
          await prisma.staff.delete({
            where: { userId: existingStaff.userId },
          });
          await prisma.user.update({
            where: { id: existingStaff.userId },
            data: {
              role: {
                set: ["personnel"],
              },
            },
          });
        }
      }

      // Update the department with the new Program Head and Program President
      const department = await prisma.department.update({
        where: { id },
        data: {
          name,
          description,
          programs: {
            set: programIds.map((id) => ({ id })),
          },
          programHead: programHeadId
            ? { connect: { userId: programHeadId } }
            : undefined,
          programPresident: programPresidentId
            ? { connect: { userId: programPresidentId } }
            : undefined,
        },
      });

      console.log("Updated department:", department);
      res.status(200).json(department);
    } catch (error) {
      console.error("Failed to update department:", error);
      res.status(500).json({ error: "Failed to update department" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
