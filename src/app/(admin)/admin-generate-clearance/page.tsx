"use client";
import { withAuth } from "@/withAuth";
import { useState, useEffect } from "react";
import React from "react";

function ClearanceGenerationPage() {
  const [schoolYearId, setSchoolYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    if (semesterId) {
      // Fetch the list of students for the selected school year and semester from the API
      const fetchStudents = async () => {
        try {
          const response = await fetch(
            `/api/getStudents?schoolYearId=${schoolYearId}&semesterId=${semesterId}`
          );
          if (response.ok) {
            const data = await response.json();
            setStudents(data);
          } else {
            setMessage("Failed to fetch students.");
          }
        } catch (error) {
          setMessage("Failed to fetch students.");
          console.error("Error fetching students:", error);
        }
      };
      fetchStudents();
    }
  }, [semesterId]);

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
    setStudents([]); // Reset students list when school year changes
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
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        setMessage("Failed to generate clearance.");
      }
    } catch (error) {
      setMessage("Failed to generate clearance.");
      console.error("Error generating clearance:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
        <div className="flex mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Clearance
          </button>
          {students.length > 0 && (
            <button
              type="button"
              onClick={handleOpenModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            >
              Student List
            </button>
          )}
        </div>
      </form>
      {message && <p className="text-red-500">{message}</p>}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Activity Log</h3>
        <ul className="list-disc pl-5">
          {activityLog.map((log, index) => (
            <li key={index} className="text-gray-700">
              Generated clearance for Academic Year {log.schoolYear},{" "}
              {log.semester}, at{" "}
              {new Date(log.generatedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4">
            <h3 className="text-xl font-bold mb-4">Student List</h3>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-4 p-2 border rounded w-full"
            />
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Student ID</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Program</th>
                  <th className="py-2 px-4 border-b">Department</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="py-2 px-4 border-b">{student.studentId}</td>
                    <td className="py-2 px-4 border-b">{student.firstName}</td>
                    <td className="py-2 px-4 border-b">{student.lastName}</td>
                    <td className="py-2 px-4 border-b">{student.email}</td>
                    <td className="py-2 px-4 border-b">
                      {student.program?.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {student.program?.department?.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(ClearanceGenerationPage, ["admin"]);
