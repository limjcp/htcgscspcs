import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const students = await prisma.student.findMany({
      where: { userCreated: false, archived: false },
    });

    for (const student of students) {
      const hashedPassword = await bcrypt.hash("123", 10);

      await prisma.user.create({
        data: {
          firstName: student.firstName,
          lastName: student.lastName,
          username: student.email.split("@")[0],
          email: student.email,
          password: hashedPassword,
          role: ["student"],
          student: { connect: { id: student.id } }, // Corrected property
        },
      });

      // Mark the student as user created
      await prisma.student.update({
        where: { id: student.id },
        data: { userCreated: true },
      });
    }

    res.status(200).json({ message: "Registration completed!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
