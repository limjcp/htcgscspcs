import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { semesterId } = req.query;

  if (req.method === "GET") {
    try {
      const totalStudents = await prisma.clearance.count({
        where: { semesterId: semesterId as string },
      });
      const clearedStudents = await prisma.clearance.count({
        where: {
          semesterId: semesterId as string,
          status: "CLEARED",
        },
      });
      const notClearedStudents = totalStudents - clearedStudents;

      const requirements = await prisma.requirement.findMany({
        where: { semesterId: semesterId as string },
        include: { office: true, department: true },
      });

      res.status(200).json({
        totalStudents,
        clearedStudents,
        notClearedStudents,
        requirements,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
      res.status(500).json({ error: "Failed to fetch counts" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
