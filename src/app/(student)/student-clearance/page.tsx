"use client";
import React from "react";
import ClearancePage from "./[studentId]";
import { withAuth } from "@/withAuth";

const Clearance = () => {
  return <ClearancePage />;
};

export default withAuth(Clearance, ["student"]);
