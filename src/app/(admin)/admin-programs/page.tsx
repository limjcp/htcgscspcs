"use client";
import React from "react";
import RegisterProgram from "./register";
import { withAuth } from "@/withAuth";

function Page() {
  return <RegisterProgram />;
}
export default withAuth(Page, ["admin"]);
