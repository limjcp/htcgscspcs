"use client";
import { withAuth } from "@/withAuth";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalSignatories: 0,
    totalStaff: 0,
    clearedStudents: 0,
    notClearedStudents: 0,
  });

  useEffect(() => {
    const getCounts = async () => {
      const response = await fetch("/api/userCounts");
      const data = await response.json();
      setCounts(data);
    };

    getCounts();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.totalUsers}
          </p>
        </div> */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Students</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.totalStudents}
          </p>
        </div>
        {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Admins</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.totalAdmins}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Signatories</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.totalSignatories}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Total Staff</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.totalStaff}
          </p>
        </div> */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Cleared Students</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.clearedStudents}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Not Cleared Students</h2>
          <p className="text-gray-700 text-3xl font-bold">
            {counts.notClearedStudents}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard, ["admin"]);
