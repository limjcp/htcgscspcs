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
            student: true,
            staff: true,
            signatory: true,
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

        let officeId = null;
        if (user.staff) {
          officeId = user.staff.officeId;
        } else if (user.signatory) {
          officeId = user.signatory.officeId;
        }

        return { ...user, officeId };
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
      }
      return token;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
