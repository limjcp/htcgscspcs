import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, middleName, lastName, email, username, role, password } =
    req.body;

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        username,
        password,
        role: [role],
      },
    });

    if (role === "staff") {
      await prisma.staff.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === "signatory") {
      await prisma.signatory.create({
        data: {
          userId: user.id,
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};
