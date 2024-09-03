import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    // Add any other custom properties you need
  }
}
