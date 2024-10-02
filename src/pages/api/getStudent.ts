import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const students = await prisma.student.findMany({
    where: { archived: false },
    include: {
      program: true,
    },
  });

  res.status(200).json(students);
}
