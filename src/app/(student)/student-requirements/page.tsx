"use client";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const StudentRequirements = () => {
  const [requirements, setRequirements] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch("/api/student/years");
        const data = await response.json();
        setYears(data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const fetchSemesters = async () => {
        try {
          const response = await fetch(
            `/api/student/semesters?year=${selectedYear}`
          );
          const data = await response.json();
          setSemesters(data);
        } catch (error) {
          console.error("Error fetching semesters:", error);
        }
      };

      fetchSemesters();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedSemester) {
      const fetchRequirements = async () => {
        try {
          const response = await fetch(
            `/api/student/requirements?year=${selectedYear}&semesterId=${selectedSemester}`
          );
          const data = await response.json();
          setRequirements(data);
        } catch (error) {
          console.error("Error fetching requirements:", error);
        }
      };

      fetchRequirements();
    }
  }, [selectedYear, selectedSemester]);

  const groupedRequirements = requirements.reduce((acc, requirement) => {
    const key =
      requirement.office?.name || requirement.department?.name || "Others";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(requirement);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          className="p-2 border rounded"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedSemester(e.target.value)}
          value={selectedSemester}
          disabled={!selectedYear}
          className="p-2 border rounded ml-2"
        >
          <option value="">Select Semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(groupedRequirements).map((key) => (
        <div key={key} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{key}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedRequirements[key].map((requirement) => (
              <div key={requirement.id} className="p-4 border rounded shadow">
                <h3 className="text-lg font-semibold">{requirement.name}</h3>
                <p className="text-sm">{requirement.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRequirements;
