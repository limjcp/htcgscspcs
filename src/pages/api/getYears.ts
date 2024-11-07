import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Connecting to MySQL...");
    const [years] = await db.execute("SELECT year FROM SchoolYear");
    console.log("Fetched years from MySQL:", years);
    res.status(200).json(years);
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ error: error.message });
  }
}
