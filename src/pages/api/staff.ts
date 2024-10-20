// File: `src/pages/api/staff.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const staff = await prisma.staff.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      res.status(500).json({ error: "Failed to fetch staff" });
    }
  } else if (req.method === "POST") {
    const { userId, officeId } = req.body;

    try {
      // Check if the staff record already exists
      const existingStaff = await prisma.staff.findUnique({
        where: { userId },
      });

      if (existingStaff) {
        // Update the existing staff record
        await prisma.staff.update({
          where: { userId },
          data: { officeId },
        });
      } else {
        // Create a new staff record
        await prisma.staff.create({
          data: { userId, officeId },
        });
      }

      // Update the user's role to include "staff" and "personnel"
      await prisma.user.update({
        where: { id: userId },
        data: { role: { set: ["staff", "personnel"] } },
      });

      res.status(200).json({ message: "Staff assigned successfully" });
    } catch (error) {
      console.error("Error assigning staff:", error);
      res.status(500).json({ error: "Failed to assign staff" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
