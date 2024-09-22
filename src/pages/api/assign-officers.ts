// File: src/pages/api/assign-officers.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { officeId, staffId, signatoryId } = req.body;

    try {
      // Ensure the staff and signatory exist, if not create them
      let staffExists = await prisma.staff.findUnique({
        where: { id: staffId },
      });
      if (!staffExists) {
        staffExists = await prisma.staff.create({
          data: {
            id: staffId,
            user: {
              connect: { id: staffId }, // Assuming staffId is the same as userId
            },
            office: {
              connect: { id: officeId },
            },
          },
        });
      } else {
        // Transfer staff to new office if already exists
        await prisma.staff.update({
          where: { id: staffId },
          data: {
            office: {
              connect: { id: officeId },
            },
          },
        });
      }

      let signatoryExists = await prisma.signatory.findUnique({
        where: { id: signatoryId },
      });
      if (!signatoryExists) {
        signatoryExists = await prisma.signatory.create({
          data: {
            id: signatoryId,
            user: {
              connect: { id: signatoryId }, // Assuming signatoryId is the same as userId
            },
            office: {
              connect: { id: officeId },
            },
          },
        });
      } else {
        // Transfer signatory to new office if already exists
        await prisma.signatory.update({
          where: { id: signatoryId },
          data: {
            office: {
              connect: { id: officeId },
            },
          },
        });
      }

      // Update user roles
      await prisma.user.update({
        where: { id: staffId },
        data: {
          role: {
            push: "staff",
          },
        },
      });

      await prisma.user.update({
        where: { id: signatoryId },
        data: {
          role: {
            push: "signatory",
          },
        },
      });

      console.log("Staff exists:", staffExists);
      console.log("Signatory exists:", signatoryExists);

      res.status(200).json({ message: "Officers assigned successfully" });
    } catch (error) {
      console.error("Error assigning officers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const { officeId, staffId, signatoryId } = req.body;

    try {
      // Delete all staff associated with the office
      await prisma.staff.deleteMany({
        where: { officeId },
      });

      // Delete all signatories associated with the office
      await prisma.signatory.deleteMany({
        where: { officeId },
      });

      // Update user roles to personnel
      if (staffId) {
        const user = await prisma.user.findUnique({
          where: { id: staffId },
        });
        if (user) {
          const updatedRoles = user.role.filter(
            (role) => role !== "staff" && role !== "signatory"
          );
          if (!updatedRoles.includes("personnel")) {
            updatedRoles.push("personnel");
          }
          await prisma.user.update({
            where: { id: staffId },
            data: {
              role: updatedRoles,
            },
          });
        }
      }

      if (signatoryId) {
        const user = await prisma.user.findUnique({
          where: { id: signatoryId },
        });
        if (user) {
          const updatedRoles = user.role.filter(
            (role) => role !== "staff" && role !== "signatory"
          );
          if (!updatedRoles.includes("personnel")) {
            updatedRoles.push("personnel");
          }
          await prisma.user.update({
            where: { id: signatoryId },
            data: {
              role: updatedRoles,
            },
          });
        }
      }

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
