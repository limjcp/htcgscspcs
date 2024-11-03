"use client";
import { useState, useEffect } from "react";
import React from "react";

function ClearanceGenerationPage() {
  const [schoolYearId, setSchoolYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [message, setMessage] = useState("");
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Fetch the list of school years from the API
    const fetchSchoolYears = async () => {
      try {
        const response = await fetch("/api/getSchoolYears");
        if (response.ok) {
          const data = await response.json();
          setSchoolYears(data);
        } else {
          setMessage("Failed to fetch school years.");
        }
      } catch (error) {
        setMessage("Failed to fetch school years.");
        console.error("Error fetching school years:", error);
      }
    };

    fetchSchoolYears();
  }, []);

  useEffect(() => {
    if (schoolYearId) {
      // Fetch the list of semesters for the selected school year from the API
      const fetchSemesters = async () => {
        try {
          const response = await fetch(
            `/api/getSemesters?schoolYearId=${schoolYearId}`
          );
          if (response.ok) {
            const data = await response.json();
            setSemesters(data);
          } else {
            setMessage("Failed to fetch semesters.");
          }
        } catch (error) {
          setMessage("Failed to fetch semesters.");
          console.error("Error fetching semesters:", error);
        }
      };

      fetchSemesters();
    }
  }, [schoolYearId]);

  useEffect(() => {
    // Fetch the activity log from the API
    const fetchActivityLog = async () => {
      try {
        const response = await fetch("/api/getClearanceLogs");
        if (response.ok) {
          const data = await response.json();
          setActivityLog(data);
        } else {
          setMessage("Failed to fetch activity log.");
        }
      } catch (error) {
        setMessage("Failed to fetch activity log.");
        console.error("Error fetching activity log:", error);
      }
    };

    fetchActivityLog();
  }, []);

  const handleSchoolYearChange = (e) => {
    setSchoolYearId(e.target.value);
    setSemesterId(""); // Reset semester selection when school year changes
  };

  const handleSemesterChange = (e) => {
    setSemesterId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/generateClearance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ semesterId }),
      });

      if (response.ok) {
        const data = await response.json();
        const schoolYear = schoolYears.find((year) => year.id === schoolYearId);
        const semester = semesters.find((sem) => sem.id === semesterId);
        const logMessage = {
          schoolYear: schoolYear.year,
          semester: semester.name,
          generatedAt: new Date().toISOString(),
        };
        setActivityLog((prevLog) => [...prevLog, logMessage]);
        setMessage("Clearance generated successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to generate clearance.");
      }
    } catch (error) {
      setMessage("Failed to generate clearance.");
      console.error("Error generating clearance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Clearance</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="schoolYearId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              School Year:
            </label>
            <select
              id="schoolYearId"
              value={schoolYearId}
              onChange={handleSchoolYearChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a school year</option>
              {schoolYears.map((schoolYear) => (
                <option key={schoolYear.id} value={schoolYear.id}>
                  {schoolYear.year}
                </option>
              ))}
            </select>
          </div>
          {schoolYearId && (
            <div className="w-1/2 pl-2">
              <label
                htmlFor="semesterId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Semester:
              </label>
              <select
                id="semesterId"
                value={semesterId}
                onChange={handleSemesterChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a semester</option>
                {semesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Clearance
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Activity Log</h3>
        <ul className="list-disc pl-5">
          {activityLog.map((log, index) => (
            <li key={index} className="text-gray-700">
              Genarated clreance for Academic Year {log.schoolYear},{" "}
              {log.semester}, at{" "}
              {new Date(log.generatedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClearanceGenerationPage;
