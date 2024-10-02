// File: src/pages/api/assign-officers.ts
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { entityId, entityType, staffId, signatoryId } = req.body;

    try {
      // Check if the user exists for staff
      const staffUser = await prisma.user.findUnique({
        where: { id: staffId },
      });
      if (!staffUser) {
        return res.status(404).json({ error: "Staff user not found" });
      }

      // Check if the user exists for signatory
      const signatoryUser = await prisma.user.findUnique({
        where: { id: signatoryId },
      });
      if (!signatoryUser) {
        return res.status(404).json({ error: "Signatory user not found" });
      }

      // Ensure the staff exists, if not create them
      let staffExists = await prisma.staff.findUnique({
        where: { userId: staffId },
      });
      if (!staffExists) {
        staffExists = await prisma.staff.create({
          data: {
            userId: staffId,
            officeId: entityType === "office" ? entityId : undefined,
            departmentId: entityType === "department" ? entityId : undefined,
          },
        });
      } else {
        // Transfer staff to new office or department if already exists
        await prisma.staff.update({
          where: { userId: staffId },
          data: {
            officeId: entityType === "office" ? entityId : undefined,
            departmentId: entityType === "department" ? entityId : undefined,
          },
        });
      }

      // Ensure the signatory exists, if not create them
      let signatoryExists = await prisma.signatory.findUnique({
        where: { userId: signatoryId },
      });
      if (!signatoryExists) {
        signatoryExists = await prisma.signatory.create({
          data: {
            userId: signatoryId,
            officeId: entityType === "office" ? entityId : undefined,
            departmentId: entityType === "department" ? entityId : undefined,
          },
        });
      } else {
        // Transfer signatory to new office or department if already exists
        await prisma.signatory.update({
          where: { userId: signatoryId },
          data: {
            officeId: entityType === "office" ? entityId : undefined,
            departmentId: entityType === "department" ? entityId : undefined,
          },
        });
      }

      // Update user roles
      await prisma.user.update({
        where: { id: staffId },
        data: {
          role: {
            set: ["staff"],
          },
        },
      });

      await prisma.user.update({
        where: { id: signatoryId },
        data: {
          role: {
            set: ["signatory"],
          },
        },
      });

      res.status(200).json({ message: "Officers assigned successfully" });
    } catch (error) {
      console.error("Error assigning officers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const { entityId, entityType } = req.body;

    try {
      // Find all staff and signatories associated with the office or department
      const staffUsers = await prisma.staff.findMany({
        where: {
          OR: [
            { officeId: entityType === "office" ? entityId : undefined },
            {
              departmentId: entityType === "department" ? entityId : undefined,
            },
          ],
        },
        select: { userId: true },
      });

      const signatoryUsers = await prisma.signatory.findMany({
        where: {
          OR: [
            { officeId: entityType === "office" ? entityId : undefined },
            {
              departmentId: entityType === "department" ? entityId : undefined,
            },
          ],
        },
        select: { userId: true },
      });

      // Delete all staff associated with the office or department
      await prisma.staff.deleteMany({
        where: {
          OR: [
            { officeId: entityType === "office" ? entityId : undefined },
            {
              departmentId: entityType === "department" ? entityId : undefined,
            },
          ],
        },
      });

      // Delete all signatories associated with the office or department
      await prisma.signatory.deleteMany({
        where: {
          OR: [
            { officeId: entityType === "office" ? entityId : undefined },
            {
              departmentId: entityType === "department" ? entityId : undefined,
            },
          ],
        },
      });

      // Update user roles to personnel
      const userIds = [...staffUsers, ...signatoryUsers].map(
        (user) => user.userId
      );
      await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: {
          role: {
            set: ["personnel"],
          },
        },
      });

      res.status(200).json({ message: "Officers reset successfully" });
    } catch (error) {
      console.error("Error resetting officers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
