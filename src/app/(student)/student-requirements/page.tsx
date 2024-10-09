"use client";
import React, { useEffect, useState } from "react";

const StudentRequirements = () => {
  const [requirements, setRequirements] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch("/api/getSemesters");
        const data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      const fetchRequirements = async () => {
        try {
          const response = await fetch(
            `/api/requirements?semesterId=${selectedSemester}`
          );
          const data = await response.json();
          setRequirements(data);
        } catch (error) {
          console.error("Error fetching requirements:", error);
        }
      };

      fetchRequirements();
    }
  }, [selectedSemester]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Requirements</h1>
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
          onChange={(e) => setSelectedSemester(e.target.value)}
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
      {requirements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requirements.map(({ description, id, name, office, department }) => (
            <div key={id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">
                {office ? office.name : department ? department.name : ""}
              </h2>
              <p className="text-gray-700">
                <strong>{name}</strong> - {description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No requirements found.</p>
      )}
    </div>
  );
};

export default StudentRequirements;
