import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { officeId, newUserId, roleType } = req.body;

    try {
      if (roleType === "staff") {
        // Update staff
        await prisma.staff.updateMany({
          where: { officeId },
          data: { userId: newUserId },
        });
      } else if (roleType === "signatory") {
        // Update signatory
        await prisma.signatory.updateMany({
          where: { officeId },
          data: { userId: newUserId },
        });
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
