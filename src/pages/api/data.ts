import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    const offices = await prisma.office.findMany();
    const departments = await prisma.department.findMany();
    res.json({ users, offices, departments });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
