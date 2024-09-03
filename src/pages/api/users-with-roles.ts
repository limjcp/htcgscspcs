// File: `src/pages/api/users-with-roles.ts`
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        include: {
          staff: {
            select: {
              office: true,
            },
          },
          signatory: {
            select: {
              office: true,
            },
          },
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users with roles:", error);
      res.status(500).json({ error: "Failed to fetch users with roles" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
