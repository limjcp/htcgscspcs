import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserPage() {
  const session = await auth();

  if (session) {
    redirect("/testpage");
  } else {
    redirect("/api/auth/signin");
  }

  return <p>Loading...</p>; // Optional: Display a loading message during redirection
}
