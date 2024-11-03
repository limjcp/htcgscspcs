import prisma from "@/lib/prisma";

export default async function handler(req, res) {
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
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
