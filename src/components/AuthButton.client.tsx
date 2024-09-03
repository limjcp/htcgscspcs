"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/helpers";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      className="hover:bg-red-500"
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  );
}
