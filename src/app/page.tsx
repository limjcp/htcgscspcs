import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton.server";
import React from "react";

export default async function UserPage() {
  const session = await auth();

  return (
    <div>
      {session ? (
        <>
          <h1>Welcome, {session.user?.name || session.user?.username}!</h1>

          <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}

      <AuthButton />
    </div>
  );
}
