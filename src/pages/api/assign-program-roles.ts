import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { departmentId, programHeadId, programPresidentId } = req.body;

    console.log("Request body:", req.body);

    if (!departmentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
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
              departmentId,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
            },
          });
        } else {
          // Update the department for the existing signatory
          await prisma.signatory.update({
            where: { userId: programHeadId },
            data: { departmentId },
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
          where: { departmentId },
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
              departmentId,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
            },
          });
        } else {
          // Update the department for the existing staff
          await prisma.staff.update({
            where: { userId: programPresidentId },
            data: { departmentId },
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
          where: { departmentId },
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
      await prisma.department.update({
        where: { id: departmentId },
        data: {
          programHead: programHeadId
            ? { connect: { userId: programHeadId } }
            : undefined,
          programPresident: programPresidentId
            ? { connect: { userId: programPresidentId } }
            : undefined,
        },
      });

      res.status(200).json({ message: "Program roles assigned successfully" });
    } catch (error) {
      console.error("Error assigning program roles:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
