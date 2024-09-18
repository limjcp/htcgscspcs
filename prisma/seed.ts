import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a school year
  const schoolYear1 = await prisma.schoolYear.create({
    data: {
      year: "2024-2025", // Ensure this matches the required field in your schema
      startYear: 2024,
      endYear: 2025,
    },
  });

  // Create a semester
  const semester1 = await prisma.semester.create({
    data: {
      name: "Fall 2024",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-12-31"),
      schoolYear: {
        connect: { id: schoolYear1.id },
      },
    },
  });

  // Create offices
  const office1 = await prisma.office.create({
    data: {
      name: "Registrar Office",
      requirements: {
        create: [
          {
            name: "Transcript submission",
            description: "Submit your latest transcript.",
            schoolYear: {
              connect: { id: schoolYear1.id },
            },
            semester: {
              connect: { id: semester1.id },
            },
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
            schoolYear: {
              connect: { id: schoolYear1.id },
            },
            semester: {
              connect: { id: semester1.id },
            },
          },
        ],
      },
    },
  });

  const office3 = await prisma.office.create({
    data: {
      name: "CETE Office",
    },
  });

  const office4 = await prisma.office.create({
    data: {
      name: "CTE Office",
    },
  });

  // Create programs
  const program1 = await prisma.program.create({
    data: {
      name: "BSIT",
      officeId: office3.id,
    },
  });

  const program2 = await prisma.program.create({
    data: {
      name: "BSED",
      officeId: office4.id,
    },
  });

  // Create users
  const admin = await prisma.user.create({
    data: {
      name: "Reymart Canuel",
      username: "admin",
      email: "admin@example.com",
      password: "123",
      role: ["admin"],
    },
  });

  const staff = await prisma.user.create({
    data: {
      name: "Karl Angelo",
      username: "staff",
      email: "staff@example.com",
      password: "123",
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
      name: "Luisito Pineda",
      username: "signatory",
      email: "signatory@example.com",
      password: "123",
      role: ["signatory"],
      signatory: {
        create: {
          officeId: office2.id,
        },
      },
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: "Jahn Claudio Lim",
      username: "student1",
      email: "student1@example.com",
      password: "123",
      role: ["student"],
      student: {
        create: {
          studentNumber: "2024001",
          programId: program1.id,
        },
      },
    },
    include: {
      student: true,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Ferdinand Sollano Jr.",
      username: "student2",
      email: "student2@example.com",
      password: "123",
      role: ["student"],
      student: {
        create: {
          studentNumber: "2024002",
          programId: program2.id,
        },
      },
    },
    include: {
      student: true,
    },
  });

  // Create clearances for the students
  const clearance1 = await prisma.clearance.create({
    data: {
      studentId: student1.student!.id,
      semesterId: semester1.id,
      schoolYearId: schoolYear1.id,
      steps: {
        create: [
          { officeId: office1.id, status: "PENDING" },
          { officeId: office3.id, status: "PENDING" },
        ],
      },
    },
  });

  const clearance2 = await prisma.clearance.create({
    data: {
      studentId: student2.student!.id,
      semesterId: semester1.id,
      schoolYearId: schoolYear1.id,
      steps: {
        create: [
          { officeId: office1.id, status: "PENDING" },
          { officeId: office4.id, status: "PENDING" },
        ],
      },
    },
  });

  console.log({
    schoolYear1,
    semester1,
    office1,
    office2,
    office3,
    office4,
    program1,
    program2,
    admin,
    staff,
    signatory,
    student1,
    student2,
    clearance1,
    clearance2,
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
