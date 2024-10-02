import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    role: string[];

    // Add any other custom properties you need
  }

  interface Session {
    user: User;
  }
}
