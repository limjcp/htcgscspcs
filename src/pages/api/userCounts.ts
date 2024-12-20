import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStudents = await prisma.user.count({
      where: { role: { has: "student" } },
    });
    const totalAdmins = await prisma.user.count({
      where: { role: { has: "admin" } },
    });
    const totalSignatories = await prisma.user.count({
      where: { role: { has: "signatory" } },
    });
    const totalStaff = await prisma.user.count({
      where: { role: { has: "staff" } },
    });

    const clearedStudents = await prisma.clearance.count({
      where: { status: "CLEARED" },
    });
    const notClearedStudents = await prisma.clearance.count({
      where: { status: { not: "CLEARED" } },
    });

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalAdmins,
      totalSignatories,
      totalStaff,
      clearedStudents,
      notClearedStudents,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
