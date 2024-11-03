import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        lastLogin: true,
        role: true,
        username: true,
      },
    });
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
