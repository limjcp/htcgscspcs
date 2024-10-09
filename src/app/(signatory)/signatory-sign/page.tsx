"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    if (
      session &&
      session.user &&
      (session.user.officeId || session.user.departmentId)
    ) {
      fetchSemesters();
    } else {
      console.log("Session or officeId/departmentId not available:", session);
    }
  }, [session]);

  const fetchSemesters = async () => {
    try {
      const response = await fetch("/api/getSemesters");
      if (response.ok) {
        const data = await response.json();
        setSemesters(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch semesters.");
        console.error("Error fetching semesters:", errorData);
      }
    } catch (error) {
      setError("Failed to fetch semesters.");
      console.error("Error fetching semesters:", error);
    }
  };

  const fetchStudents = async (semesterId) => {
    try {
      const response = await fetch(
        `/api/getStudents?officeId=${session.user.officeId}&departmentId=${session.user.departmentId}&semesterId=${semesterId}`
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

  const approveClearanceStep = async (studentId, stepId) => {
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
          departmentId: session.user.departmentId,
          staffName: session?.user?.firstName + " " + session?.user?.lastName,
        }),
      });

      if (response.ok) {
        alert("Clearance step approved successfully");
        fetchStudents(selectedSemester); // Refresh the student list
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

  const signClearanceStep = async (studentId, stepId) => {
    try {
      const response = await fetch("/api/signClearanceStep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          stepId,
          officeId: session.user.officeId,
          departmentId: session.user.departmentId,
          signatoryName:
            session?.user?.firstName + " " + session?.user?.lastName,
        }),
      });

      if (response.ok) {
        alert("Clearance step signed successfully");
        fetchStudents(selectedSemester); // Refresh the student list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to sign clearance step.");
        console.error("Error signing clearance step:", errorData);
      }
    } catch (error) {
      setError("Failed to sign clearance step.");
      console.error("Error signing clearance step:", error);
    }
  };

  const signAllClearanceSteps = async () => {
    try {
      const approvedSteps = students.flatMap((student) =>
        student.clearances.flatMap((clearance) =>
          clearance.steps.filter((step) => step.status === "APPROVED")
        )
      );

      const response = await fetch("/api/signAllClearanceSteps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steps: approvedSteps.map((step) => ({
            studentId: step.studentId,
            stepId: step.id,
            officeId: session.user.officeId,
            departmentId: session.user.departmentId,
          })),
        }),
      });

      if (response.ok) {
        alert("All approved clearance steps signed successfully");
        fetchStudents(selectedSemester); // Refresh the student list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to sign all clearance steps.");
        console.error("Error signing all clearance steps:", errorData);
      }
    } catch (error) {
      setError("Failed to sign all clearance steps.");
      console.error("Error signing all clearance steps:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Signatory Sign</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="semester"
          className="block text-sm font-medium text-gray-700"
        >
          Select Semester
        </label>
        <select
          id="semester"
          name="semester"
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            fetchStudents(e.target.value);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
      </div>
      {selectedSemester && (
        <>
          <button
            onClick={signAllClearanceSteps}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign All
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
                    <td className="border px-4 py-2">
                      {student.user.firstName} {student.user.middleName}{" "}
                      {student.user.lastName}
                    </td>
                    <td className="border px-4 py-2">
                      {student.clearances.map((clearance) =>
                        clearance.steps.map((step) => (
                          <div key={step.id} className="mb-2">
                            <span className="font-semibold">
                              {step.office
                                ? step.office.name
                                : step.department.name}
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
                            {step.status === "APPROVED" && (
                              <button
                                onClick={() =>
                                  signClearanceStep(student.id, step.id)
                                }
                                className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                Sign
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
        </>
      )}
    </div>
  );
}
