import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, role, officeOrDepartmentId, type } = req.body;

    if (!userId || !role || !officeOrDepartmentId || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (type === "office") {
        if (role === "staff") {
          const staff = await prisma.staff.findUnique({ where: { userId } });
          if (staff) {
            await prisma.staff.update({
              where: { userId },
              data: { officeId: officeOrDepartmentId },
            });
          } else {
            await prisma.staff.create({
              data: {
                userId,
                officeId: officeOrDepartmentId,
              },
            });
          }
          await prisma.user.update({
            where: { id: userId },
            data: { role: { set: [role.staff] } },
          });
        } else if (role === "signatory") {
          const signatory = await prisma.signatory.findUnique({
            where: { userId },
          });
          if (signatory) {
            await prisma.signatory.update({
              where: { userId },
              data: { officeId: officeOrDepartmentId },
            });
          } else {
            await prisma.signatory.create({
              data: {
                userId,
                officeId: officeOrDepartmentId,
              },
            });
          }
          await prisma.user.update({
            where: { id: userId },
            data: { role: { set: [role.signatory] } },
          });
        }
      } else if (type === "department") {
        if (role === "staff") {
          const staff = await prisma.staff.findUnique({ where: { userId } });
          if (staff) {
            await prisma.staff.update({
              where: { userId },
              data: { departmentId: officeOrDepartmentId },
            });
          } else {
            await prisma.staff.create({
              data: {
                userId,
                departmentId: officeOrDepartmentId,
              },
            });
          }
          await prisma.user.update({
            where: { id: userId },
            data: { role: { set: [role.staff] } },
          });
        } else if (role === "signatory") {
          const signatory = await prisma.signatory.findUnique({
            where: { userId },
          });
          if (signatory) {
            await prisma.signatory.update({
              where: { userId },
              data: { departmentId: officeOrDepartmentId },
            });
          } else {
            await prisma.signatory.create({
              data: {
                userId,
                departmentId: officeOrDepartmentId,
              },
            });
          }
          await prisma.user.update({
            where: { id: userId },
            data: { role: { set: [role.signatory] } },
          });
        }
      }

      res.status(200).json({ message: "User assigned successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}