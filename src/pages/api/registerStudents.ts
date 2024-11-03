import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { studentIds } = req.body;

  if (!studentIds || !Array.isArray(studentIds)) {
    return res.status(400).json({ error: "Invalid student IDs" });
  }

  try {
    // Fetch the students with the selected IDs along with their programs
    const students = await prisma.student.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
      include: {
        program: true,
      },
    });

    for (const student of students) {
      const hashedPassword = await bcrypt.hash("123", 10);

      // Extract the program, surname, and initials
      const program = student.program.name.toLowerCase();
      const surname = student.lastName.toLowerCase();
      const initials =
        student.firstName.charAt(0).toLowerCase() +
        (student.middleName ? student.middleName.charAt(0).toLowerCase() : "");

      // Construct the username
      const username = `${program}_${surname}${initials}`;

      await prisma.user.create({
        data: {
          firstName: student.firstName,
          lastName: student.lastName,
          username: username,
          email: student.email,
          password: hashedPassword,
          role: ["student"],
          student: { connect: { id: student.id } },
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
