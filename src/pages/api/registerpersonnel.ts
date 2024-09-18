import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, username, role, officeId, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password,
        role: [role],
        staff: role === "staff" ? { create: { officeId } } : undefined,
        signatory: role === "signatory" ? { create: { officeId } } : undefined,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};
