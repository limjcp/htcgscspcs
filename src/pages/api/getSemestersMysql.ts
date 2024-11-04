import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient as MySQLPrismaClient } from "../../../generated/mysql-client";

const mysqlPrisma = new MySQLPrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ error: "Year parameter is required" });
  }

  try {
    const semesters = await mysqlPrisma.semester.findMany({
      where: {
        schoolYear: {
          year: year as string,
        },
      },
      select: {
        id: true,
        semester: true,
        schoolYearId: true,
      },
    });

    res.status(200).json(semesters);
  } catch (error) {
    console.error("Error fetching semesters:", error);
    res.status(500).json({ error: error.message });
  }
}
