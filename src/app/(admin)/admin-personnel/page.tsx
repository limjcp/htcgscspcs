"use client";
import React from "react";
import PersonnelList from "./PersonnelList"; // Import the new component
import { withAuth } from "@/withAuth";

const RegisterStaffSignatory: React.FC = () => {
  return (
    <div className="min-h-screen mx-auto p-4">
      <PersonnelList />
    </div>
  );
};

export default withAuth(RegisterStaffSignatory, ["admin"]);
