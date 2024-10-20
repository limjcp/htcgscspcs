"use client";

import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [selectedSemester, setSelectedSemester] = useState("Fall 2023");
  const [counts, setCounts] = useState({
    totalStudents: 0,
    clearedStudents: 0,
    notClearedStudents: 0,
    totalRequirements: 0,
    completedRequirements: 0,
    pendingRequirements: 0,
    totalClearances: 0,
    approvedClearances: 0,
    pendingClearances: 0,
    rejectedClearances: 0,
  });

  useEffect(() => {
    const getCounts = async () => {
      // In a real application, you would pass the selectedSemester to your API
      const response = await fetch(
        `/api/userCounts?semester=${selectedSemester}`
      );
      const data = await response.json();
      setCounts(data);
    };

    getCounts();
  }, [selectedSemester]);

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Student Clearance System Dashboard
        </h1>
        <div className="flex items-center">
          <label htmlFor="semester-select" className="mr-2 text-gray-700">
            Select Semester:
          </label>
          <select
            id="semester-select"
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Fall 2023">Fall 2023</option>
            <option value="Spring 2024">Spring 2024</option>
            <option value="Fall 2024">Fall 2024</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Total Students
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {counts.totalStudents}
          </p>
          <p className="text-sm text-gray-500">Enrolled this semester</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Cleared Students
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {counts.clearedStudents}
          </p>
          <p className="text-sm text-gray-500">
            {counts.totalStudents > 0
              ? `${(
                  (counts.clearedStudents / counts.totalStudents) *
                  100
                ).toFixed(1)}% of total students`
              : "No students enrolled"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Total Requirements
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {counts.totalRequirements}
          </p>
          <p className="text-sm text-gray-500">Across all departments</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Pending Clearances
          </h2>
          <p className="text-3xl font-bold text-yellow-600">
            {counts.pendingClearances}
          </p>
          <p className="text-sm text-gray-500">
            {counts.totalClearances > 0
              ? `${(
                  (counts.pendingClearances / counts.totalClearances) *
                  100
                ).toFixed(1)}% of total clearances`
              : "No clearances initiated"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Clearance Status
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-green-600">
                Cleared: {counts.clearedStudents}
              </p>
              <p className="text-sm text-gray-500">
                {counts.totalStudents > 0
                  ? `${(
                      (counts.clearedStudents / counts.totalStudents) *
                      100
                    ).toFixed(1)}%`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-red-600">
                Not Cleared: {counts.notClearedStudents}
              </p>
              <p className="text-sm text-gray-500">
                {counts.totalStudents > 0
                  ? `${(
                      (counts.notClearedStudents / counts.totalStudents) *
                      100
                    ).toFixed(1)}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Requirements Status
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-blue-600">
                Completed: {counts.completedRequirements}
              </p>
              <p className="text-sm text-gray-500">
                {counts.totalRequirements > 0
                  ? `${(
                      (counts.completedRequirements /
                        counts.totalRequirements) *
                      100
                    ).toFixed(1)}%`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-orange-600">
                Pending: {counts.pendingRequirements}
              </p>
              <p className="text-sm text-gray-500">
                {counts.totalRequirements > 0
                  ? `${(
                      (counts.pendingRequirements / counts.totalRequirements) *
                      100
                    ).toFixed(1)}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
