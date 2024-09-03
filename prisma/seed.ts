import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create offices
  const office1 = await prisma.office.create({
    data: {
      name: "Registrar Office",
      requirements: {
        create: [
          {
            name: "Transcript submission",
            description: "Submit your latest transcript.",
          },
        ],
      },
    },
  });

  const office2 = await prisma.office.create({
    data: {
      name: "Library Office",
      requirements: {
        create: [
          {
            name: "Return all borrowed books",
            description: "Ensure all borrowed books are returned.",
          },
        ],
      },
    },
  });

  // Create a semester
  const semester1 = await prisma.semester.create({
    data: {
      name: "Fall 2024",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-12-31"),
    },
  });

  // Create users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword",
      role: ["admin"],
    },
  });

  const staff = await prisma.user.create({
    data: {
      name: "Staff User",
      email: "staff@example.com",
      password: "hashedpassword",
      role: ["staff"],
      staff: {
        create: {
          officeId: office1.id,
        },
      },
    },
  });

  const signatory = await prisma.user.create({
    data: {
      name: "Signatory User",
      email: "signatory@example.com",
      password: "hashedpassword",
      role: ["signatory"],
      signatory: {
        create: {
          officeId: office2.id,
        },
      },
    },
  });

  const student = await prisma.user.create({
    data: {
      name: "Student User",
      email: "student@example.com",
      password: "hashedpassword",
      role: ["student"],
      student: {
        create: {
          studentNumber: "2024001",
        },
      },
    },
    include: {
      student: true,
    },
  });

  // Create a clearance for the student
  const clearance = await prisma.clearance.create({
    data: {
      studentId: student.student!.id,
      semesterId: semester1.id,
      steps: {
        create: [
          { officeId: office1.id, status: "PENDING" },
          { officeId: office2.id, status: "PENDING" },
        ],
      },
    },
  });

  console.log({
    office1,
    office2,
    semester1,
    admin,
    staff,
    signatory,
    student,
    clearance,
  });
}

main()
  .then(() => {
    console.log("Seed data created successfully.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
