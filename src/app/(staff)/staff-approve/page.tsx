"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session && session.user && session.user.officeId) {
      fetchStudents();
    } else {
      console.log("Session or officeId not available:", session);
    }
  }, [session]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `/api/getStudents?officeId=${session.user.officeId}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch students.");
        console.error("Error fetching students:", errorData);
      }
    } catch (error) {
      setError("Failed to fetch students.");
      console.error("Error fetching students:", error);
    }
  };

  const approveClearanceStep = async (studentId, stepId, staffName) => {
    try {
      const response = await fetch("/api/approveClearanceStep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          stepId,
          officeId: session.user.officeId,
          staffName: session?.user?.name,
        }),
      });

      if (response.ok) {
        alert("Clearance step approved successfully");
        fetchStudents(); // Refresh the student list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to approve clearance step.");
        console.error("Error approving clearance step:", errorData);
      }
    } catch (error) {
      setError("Failed to approve clearance step.");
      console.error("Error approving clearance step:", error);
    }
  };

  const approveAllClearanceSteps = async () => {
    try {
      const pendingSteps = students.flatMap((student) =>
        student.clearances.flatMap((clearance) =>
          clearance.steps.filter((step) => step.status === "PENDING")
        )
      );

      const response = await fetch("/api/approveAllClearanceSteps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steps: pendingSteps.map((step) => ({
            studentId: step.studentId,
            stepId: step.id,
            officeId: session.user.officeId,
          })),
        }),
      });

      if (response.ok) {
        alert("All pending clearance steps approved successfully");
        fetchStudents(); // Refresh the student list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to approve all clearance steps.");
        console.error("Error approving all clearance steps:", errorData);
      }
    } catch (error) {
      setError("Failed to approve all clearance steps.");
      console.error("Error approving all clearance steps:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Staff Approve</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={approveAllClearanceSteps}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Approve All
      </button>
      <h2 className="text-xl font-bold mt-8">Students</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Student Name</th>
              <th className="py-2 px-4 border-b">Clearance Steps</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.user.name}</td>
                <td className="border px-4 py-2">
                  {student.clearances.map((clearance) =>
                    clearance.steps.map((step) => (
                      <div key={step.id} className="mb-2">
                        <span className="font-semibold">
                          {step.office.name}
                        </span>{" "}
                        - {step.status}
                      </div>
                    ))
                  )}
                </td>
                <td className="border px-4 py-2">
                  {student.clearances.map((clearance) =>
                    clearance.steps.map((step) => (
                      <div key={step.id} className="mb-2">
                        {step.status === "PENDING" && (
                          <button
                            onClick={() =>
                              approveClearanceStep(student.id, step.id)
                            }
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
