import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  theme: {
    logo: "/htc-new-seal.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "HTC Account",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username as string,
          },
          include: {
            student: {
              include: {
                program: {
                  include: {
                    department: true,
                  },
                },
              },
            },
            staff: {
              include: {
                office: true,
                Department: true,
                Position: true,
              },
            },
            signatory: {
              include: {
                office: true,
                Department: true,
                Position: true,
              },
            },
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid =
          user.password && user.password.length > 20
            ? await bcrypt.compare(
                credentials.password as string,
                user.password
              )
            : credentials.password === user.password;

        if (!isPasswordValid) {
          return null;
        }

        let departmentId = null;
        let departmentName = null;
        if (user.staff?.Department?.length) {
          departmentId = user.staff.departmentId;
          departmentName = user.staff.Department[0].name;
        } else if (user.signatory?.Department?.length) {
          departmentId = user.signatory.departmentId;
          departmentName = user.signatory.Department[0].name;
        } else if (user.student?.program?.department) {
          departmentId = user.student.program.department.id;
          departmentName = user.student.program.department.name;
        }

        let officeId = null;
        let officeName = null;
        if (user.staff?.office) {
          officeId = user.staff.officeId;
          officeName = user.staff.office.name;
        } else if (user.signatory?.office) {
          officeId = user.signatory.officeId;
          officeName = user.signatory.office.name;
        }

        let programName = null;
        if (user.student?.program) {
          programName = user.student.program.name;
        }

        let position = null;
        if (user.staff?.Position) {
          position = user.staff.Position.name;
        } else if (user.signatory?.Position) {
          position = user.signatory.Position.name;
        }

        // Update lastLogin
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          ...user,
          officeId,
          officeName,
          departmentId,
          departmentName,
          programName,
          position,
        };
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.studentId = token.studentId || null;
      session.user.staffId = token.staffId || null;
      session.user.signatoryId = token.signatoryId || null;
      session.user.officeId = token.officeId || null;
      session.user.officeName = token.officeName || null;
      session.user.departmentId = token.departmentId || null;
      session.user.departmentName = token.departmentName || null;
      session.user.programName = token.programName || null;
      session.user.firstName = token.firstName || null;
      session.user.middleName = token.middleName || null;
      session.user.lastName = token.lastName || null;
      session.user.lastLogin = token.lastLogin || null;
      session.user.position = token.position || null;

      session.user.greeting = `Goodholy! ${token.firstName} ${
        token.lastName
      }, ${token.officeName ? token.officeName : token.departmentName}${
        token.position ? ", " + token.position : ""
      }`;

      session.user.greetingsStudent = `Goodholy ${token.firstName} ${token.lastName}, ${token.programName} ${token.departmentName}`;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.studentId = user.student?.id || null;
        token.staffId = user.staff?.id || null;
        token.signatoryId = user.signatory?.id || null;
        token.officeId = user.officeId || null;
        token.officeName = user.officeName || null;
        token.departmentId = user.departmentId || null;
        token.departmentName = user.departmentName || null;
        token.programName = user.programName || null;
        token.firstName = user.firstName;
        token.middleName = user.middleName;
        token.lastName = user.lastName;
        token.lastLogin = user.lastLogin;
        token.position = user.position || null;
      }
      return token;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
