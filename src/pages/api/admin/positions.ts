// pages/api/admin/positions.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const positions = await prisma.position.findMany({
      include: {
        signatory: true,
      },
    });
    res.status(200).json(positions);
  } else if (req.method === "POST") {
    const { name } = req.body;
    const newPosition = await prisma.position.create({
      data: { name },
    });
    res.status(201).json(newPosition);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
