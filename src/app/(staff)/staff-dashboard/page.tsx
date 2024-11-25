"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { withAuth } from "@/withAuth";

function Home() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({
    allStudents: 0,
    pendingStudents: 0,
    approvedStudents: 0,
    signedStudents: 0,
    approvedsignedStudents: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (session && session.user) {
      const { officeId, departmentId } = session.user;
      if (officeId) {
        fetchCounts(officeId, "office");
      } else if (departmentId) {
        fetchCounts(departmentId, "department");
      } else {
        console.log("Neither officeId nor departmentId available:", session);
      }
    } else {
      console.log("Session not available:", session);
    }
  }, [session]);

  const fetchCounts = async (id, type) => {
    try {
      const response = await fetch(`/api/getStudentCounts?${type}Id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setCounts(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch student counts.");
        console.error("Error fetching student counts:", errorData);
      }
    } catch (error) {
      setError("Failed to fetch student counts.");
      console.error("Error fetching student counts:", error);
    }
  };

  return (
    <div>
      <h1>Staff</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">All Students</h2>
          <p className="text-2xl">{counts.allStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl text-red-700 font-bold">Pending Students</h2>
          <p className="text-2xl text-red-700">{counts.pendingStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl text-green-700 font-bold">
            Approved Students
          </h2>
          <p className="text-2xl text-green-700">
            {counts.approvedsignedStudents}
          </p>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Home, ["staff"]);
