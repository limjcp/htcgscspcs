"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const StudentDashboard = () => {
  const { data: session } = useSession();
  const [signedCount, setSignedCount] = useState(0);
  const [notSignedCount, setNotSignedCount] = useState(0);

  useEffect(() => {
    const fetchClearanceData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/clearance?userId=${session.user.id}`,
          );
          const data = await response.json();

          if (response.ok) {
            setSignedCount(data.signedSteps);
            setNotSignedCount(data.notSignedSteps);
          } else {
            console.error("Error fetching clearance data:", data.error);
          }
        } catch (error) {
          console.error("Error fetching clearance data:", error);
        }
      }
    };

    fetchClearanceData();
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-700 shadow-md rounded-lg p-6">
          <h2 className="text-xl text-white font-semibold mb-2">Signed</h2>
          <p className="text-3xl text-white font-bold">{signedCount}</p>
        </div>
        <div className="bg-red-700 shadow-md rounded-lg p-6">
          <h2 className="text-xl text-white font-semibold mb-2">Not Signed</h2>
          <p className="text-3xl text-white font-bold">{notSignedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
