"use client";
import React from "react";
import PersonnelList from "./PersonnelList"; // Import the new component

const RegisterStaffSignatory: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <PersonnelList />
    </div>
  );
};

export default RegisterStaffSignatory;
