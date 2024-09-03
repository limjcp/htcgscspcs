"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({
    allStudents: 0,
    approvedStudents: 0,
    signedStudents: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (session && session.user && session.user.officeId) {
      fetchCounts(session.user.officeId);
    } else {
      console.log("Session or officeId not available:", session);
    }
  }, [session]);

  const fetchCounts = async (officeId) => {
    try {
      const response = await fetch(
        `/api/getStudentCounts?officeId=${officeId}`
      );
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
      <h1>Signatory</h1>
      <p>
        This is the home page. You can access the{" "}
        <Link href="/admin-dashboard">Admin Dashboard</Link> or the{" "}
        <Link href="/student-dashboard">Student Dashboard</Link>.
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">All Students</h2>
          <p className="text-2xl">{counts.allStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">Approved Students</h2>
          <p className="text-2xl">{counts.approvedStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">Signed Students</h2>
          <p className="text-2xl">{counts.signedStudents}</p>
        </div>
      </div>
    </div>
  );
}
