import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const offices = await prisma.office.findMany();
  res.json(offices);
};
