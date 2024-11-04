import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  if (req.method === "GET") {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        office: true,
        department: true,
      },
    });
    res.json(appointments);
  } else if (req.method === "POST") {
    const { userId, officeId, departmentId, appointmentDate } = req.body;

    // Validation: Ensure only one of officeId or departmentId is provided
    if ((officeId && departmentId) || (!officeId && !departmentId)) {
      return res.status(400).json({
        error: "Please select either an office or a department, but not both.",
      });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        userId,
        officeId: officeId || null, // Ensure null if not provided
        departmentId: departmentId || null, // Ensure null if not provided
        appointmentDate: new Date(appointmentDate),
      },
    });
    res.json(newAppointment);
  } else if (req.method === "PUT") {
    const { appointmentId, resignationDate } = req.body;

    // Validation: Ensure resignationDate is provided
    if (!resignationDate) {
      return res.status(400).json({
        error: "Please provide a resignation date.",
      });
    }

    try {
      const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { resignationDate: new Date(resignationDate) },
      });
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Error updating appointment:", error);
      res.status(500).json({ error: "Failed to update appointment" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
