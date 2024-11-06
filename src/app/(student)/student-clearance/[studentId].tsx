"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import React from "react";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClearancePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.user && session.user.studentId) {
      setStudentId(session.user.studentId);
      router.push(`/student-clearance?studentId=${session.user.studentId}`);
    }
  }, [session, router]);

  useEffect(() => {
    if (router.isReady && router.query.studentId) {
      setStudentId(router.query.studentId as string);
    }
  }, [router.isReady, router.query]);

  const { data: years, error: yearsError } = useSWR("/api/years", fetcher);

  const { data: semesters, error: semestersError } = useSWR(
    selectedYear ? `/api/studentsemesters?year=${selectedYear}` : null,
    fetcher
  );

  const { data: clearanceData, error: clearanceError } = useSWR(
    studentId && selectedYear && selectedSemester
      ? `/api/clearance/${studentId}?year=${selectedYear}&semesterId=${selectedSemester}`
      : null,
    fetcher
  );

  useEffect(() => {
    console.log("Years:", years);
    console.log("Semesters:", semesters);
    console.log("Clearance Data:", clearanceData);
    console.log("Selected Year:", selectedYear);
    console.log("Selected Semester:", selectedSemester);
  }, [years, semesters, clearanceData, selectedYear, selectedSemester]);

  if (!studentId) return <div>Missing student ID</div>;
  if (yearsError) return <div>Failed to load years</div>;
  if (!years) return <div>Loading years...</div>;

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Clearance Status</h2>
      <div className="mb-4">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Select Year
        </label>
        <select
          id="year"
          name="year"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>
            Select a year
          </option>
          {years.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
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
            {semesters?.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {!selectedYear || !selectedSemester ? (
        <div className="text-center text-gray-500">
          Please select a year and semester to view clearance data.
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
        <div className="relative border-l border-gray-200">
          {clearanceData.length > 0 ? (
            clearanceData
              .flatMap((clearance) => clearance.steps)
              .sort(
                (a, b) =>
                  new Date(a.signedAt).getTime() -
                  new Date(b.signedAt).getTime()
              )
              .map((step, index) => (
                <div key={index} className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white">
                    <svg
                      className="w-3 h-3 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.office
                          ? step.office.name
                          : step.department?.name || "Unknown"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {step.signedBy} - {step.comments}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        step.status === "SIGNED"
                          ? "bg-green-200 text-green-800"
                          : step.status === "APPROVED"
                          ? "bg-blue-200 text-blue-800"
                          : step.status === "PENDING"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <time className="block mt-2 text-sm font-normal leading-none text-gray-400">
                    {step.signedAt
                      ? new Date(step.signedAt).toLocaleString()
                      : "Not signed yet"}
                  </time>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500">
              No clearance steps available for the selected year and semester.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClearancePage;
