"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [counts, setCounts] = useState({
    totalStudents: 0,
    clearedStudents: 0,
    notClearedStudents: 0,
    requirements: [],
  });

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get("/api/semesters");
        setSemesters(response.data);
        if (response.data.length > 0) {
          setSelectedSemester(response.data[0].id); // Set the first semester as default
        }
      } catch (error) {
        console.error("Failed to fetch semesters", error);
      }
    };

    fetchSemesters();
  }, []);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await axios.get(
          `/api/counts?semesterId=${selectedSemester}`
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Failed to fetch counts", error);
      }
    };

    if (selectedSemester) {
      getCounts();
    }
  }, [selectedSemester]);

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Student Clearance System Dashboard.
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
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Clearance Status
          </h2>
          <div className="flex justify-between">
            <div>
              <p className="text-md md:text-lg font-semibold text-green-600">
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
              <p className="text-md md:text-lg font-semibold text-red-600">
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
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Requirements by Office/Department
          </h2>
          {counts.requirements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {counts.requirements.map((requirement) => (
                <div
                  key={requirement.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-md md:text-lg font-semibold text-gray-800">
                    {requirement.office
                      ? requirement.office.name
                      : requirement.department
                      ? requirement.department.name
                      : "No Office/Department"}
                  </h3>
                  <p className="text-sm text-gray-600">{requirement.name}</p>
                  <p className="text-sm text-gray-500">
                    {requirement.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No requirements found for the selected semester.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
