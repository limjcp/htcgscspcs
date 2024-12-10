// src/pages/api/cron/check-resignations.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get all appointments where resignationDate is in the past
    const expiredAppointments = await prisma.appointment.findMany({
      where: {
        resignationDate: {
          lte: new Date(), // Less than or equal to current date
        },
      },
      include: {
        user: true,
      },
    });

    for (const appointment of expiredAppointments) {
      // Handle staff resignations
      if (appointment.officeId) {
        await prisma.staff.updateMany({
          where: {
            userId: appointment.userId,
            officeId: appointment.officeId,
          },
          data: {
            officeId: null,
          },
        });

        await prisma.signatory.updateMany({
          where: {
            userId: appointment.userId,
            officeId: appointment.officeId,
          },
          data: {
            officeId: null,
          },
        });
      }

      // Handle department resignations
      if (appointment.departmentId) {
        await prisma.staff.updateMany({
          where: {
            userId: appointment.userId,
            departmentId: appointment.departmentId,
          },
          data: {
            departmentId: null,
          },
        });

        await prisma.signatory.updateMany({
          where: {
            userId: appointment.userId,
            departmentId: appointment.departmentId,
          },
          data: {
            departmentId: null,
          },
        });
      }

      // Update user roles back to personnel
      await prisma.user.update({
        where: {
          id: appointment.userId,
        },
        data: {
          role: {
            set: ["personnel"],
          },
        },
      });

      // Delete the appointment record
      await prisma.appointment.delete({
        where: {
          id: appointment.id,
        },
      });
    }

    return NextResponse.json({
      message: `Successfully processed resignations`,
    });
  } catch (error) {
    console.error("Error processing resignations:", error);
    return NextResponse.json(
      { error: "Failed to process resignations" },
      { status: 500 }
    );
  }
}
