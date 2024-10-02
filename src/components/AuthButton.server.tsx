import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/auth";
import React from "react";
import AuthButtonClient from "./AuthButton.client";

export default async function AuthButton() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      firstName: session.user.firstName,
      email: session.user.email,
      username: session.user.username,
      role: session.user.role,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
