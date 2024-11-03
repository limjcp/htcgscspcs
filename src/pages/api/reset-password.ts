import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const hashedPassword = await bcrypt.hash("123", 10);

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error resetting password" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
