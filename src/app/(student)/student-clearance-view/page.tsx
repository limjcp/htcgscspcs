"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import React from "react";
import { useSession } from "next-auth/react";
import { withAuth } from "@/withAuth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClearancePage = () => {
  const { data: session } = useSession();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.user && session.user.studentId) {
      setStudentId(session.user.studentId);
    }
  }, [session]);

  const { data: semesters, error: semestersError } = useSWR(
    "/api/semesters",
    fetcher
  );

  const { data: clearanceData, error: clearanceError } = useSWR(
    studentId && selectedSemester
      ? `/api/clearance/${studentId}?semesterId=${selectedSemester}`
      : null,
    fetcher
  );

  useEffect(() => {
    console.log("Semesters:", semesters);
    console.log("Clearance Data:", clearanceData);
    console.log("Selected Semester:", selectedSemester);
  }, [semesters, clearanceData, selectedSemester]);

  if (!studentId) return <div>Missing student ID</div>;
  if (semestersError) return <div>Failed to load semesters</div>;
  if (!semesters) return <div>Loading semesters...</div>;

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Clearance</h2>
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedSemester || ""}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="" disabled>
            Select a semester
          </option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
      </div>
      {!selectedSemester ? (
        <div className="text-center text-gray-500">
          Please select a semester to view clearance data.
        </div>
      ) : clearanceError ? (
        <div className="text-center text-red-500">
          Failed to load clearance data
        </div>
      ) : !clearanceData ? (
        <div className="text-center text-gray-500">
          Loading clearance data...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clearanceData
            .flatMap((clearance) => clearance.steps)
            .sort(
              (a, b) =>
                new Date(a.signedAt).getTime() - new Date(b.signedAt).getTime()
            )
            .map((step, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.office
                    ? step.office.name
                    : step.department?.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.signedBy} - {step.comments}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      step.status === "SIGNED"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {step.status === "SIGNED" ? "SIGNED" : "Not signed"}
                  </span>
                </div>
                <time className="block mt-2 text-sm font-normal leading-none text-gray-400">
                  {step.status === "SIGNED" && step.signedAt
                    ? new Date(step.signedAt).toLocaleString()
                    : "Not signed"}
                </time>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(ClearancePage, ["student"]);
