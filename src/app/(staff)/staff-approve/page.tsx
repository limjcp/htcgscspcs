"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear && selectedSemester) {
      fetchStudents();
    }
  }, [selectedYear, selectedSemester]);

  const fetchYears = async () => {
    try {
      const response = await fetch("/api/personnel/years");
      if (response.ok) {
        const data = await response.json();
        setYears(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch years.");
        console.error("Error fetching years:", errorData);
      }
    } catch (error) {
      setError("Failed to fetch years.");
      console.error("Error fetching years:", error);
    }
  };

  const fetchSemesters = async (yearId) => {
    try {
      const response = await fetch(
        `/api/personnel/semesters?schoolYearId=${yearId}`
      );
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

  const fetchStudents = async () => {
    if (!selectedYear || !selectedSemester) return;

    try {
      const response = await fetch(
        `/api/getStudents?officeId=${session.user.officeId}&departmentId=${session.user.departmentId}&schoolYearId=${selectedYear}&semesterId=${selectedSemester}`
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
      const staffPosition = session?.user?.position || "Unknown Position";
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
          staffName: `${session?.user?.firstName} ${session?.user?.lastName} - ${staffPosition}`,
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

  const rejectClearanceStep = async (studentId, stepId, comment) => {
    try {
      const response = await fetch("/api/rejectClearanceStep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          stepId,
          officeId: session.user.officeId,
          departmentId: session.user.departmentId,
          staffName: `${session?.user?.firstName} ${session?.user?.lastName}`,
          comments: comment,
        }),
      });

      if (response.ok) {
        alert("Clearance step rejected successfully");
        fetchStudents(); // Refresh the student list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to reject clearance step.");
        console.error("Error rejecting clearance step:", errorData);
      }
    } catch (error) {
      setError("Failed to reject clearance step.");
      console.error("Error rejecting clearance step:", error);
    }
  };

  const approveSelectedClearanceSteps = async () => {
    try {
      // Iterate over selected students and approve their clearance steps
      for (const studentId of selectedStudents) {
        // Find the clearance steps for the student
        const student = students.find((s) => s.id === studentId);
        if (student && student.clearances) {
          for (const clearance of student.clearances) {
            for (const step of clearance.steps) {
              await approveClearanceStep(studentId, step.id);
            }
          }
        }
      }
      alert("Selected clearance steps approved successfully");
      // Refresh the student list and reset selections
      fetchStudents();
      setSelectedStudents([]);
    } catch (error) {
      setError("Failed to approve selected clearance steps.");
      console.error("Error approving clearance steps:", error);
    }
  };

  const handleYearChange = (event) => {
    const yearId = event.target.value;
    setSelectedYear(yearId);
    setSelectedSemester(""); // Reset semester when year changes
    setSemesters([]); // Clear semesters list
    setStudents([]); // Clear students list
    fetchSemesters(yearId);
  };

  const handleSemesterChange = (event) => {
    const semesterId = event.target.value;
    setSelectedSemester(semesterId);
    // No need to fetch students here; useEffect will handle it
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allSelectableStudentIds = students.map((student) => student.id);
      setSelectedStudents(allSelectableStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.user?.firstName} ${student.user?.middleName} ${student.user?.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleRejectClick = (studentId, stepId) => {
    const comment = prompt("Please enter the reason for rejection:");
    if (comment) {
      rejectClearanceStep(studentId, stepId, comment);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Staff Approve</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Select Year
          </label>
          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year.id} value={year.id}>
                {year.year}
              </option>
            ))}
          </select>
        </div>
        <div>
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
            onChange={handleSemesterChange}
            disabled={!selectedYear}
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
      </div>
      {selectedSemester && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-2 md:mb-0">Students</h2>
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
              <div className="w-full md:w-64 mb-2 md:mb-0 md:mr-4">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700"
                >
                  Search Student
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  placeholder="Search by student name"
                />
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
                onClick={approveSelectedClearanceSteps}
                disabled={selectedStudents.length === 0}
              >
                Approve All Selected
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <div className="max-h-80 overflow-y-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 border-b">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          students.length > 0 &&
                          selectedStudents.length === students.length
                        }
                      />
                    </th>
                    <th className="py-3 px-4 border-b">Student Name</th>
                    <th className="py-3 px-4 border-b">Program</th>
                    <th className="py-3 px-4 border-b">Department</th>
                    <th className="py-3 px-4 border-b">Clearance Steps</th>
                    <th className="py-3 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleCheckboxChange(student.id)}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        {student.user ? (
                          <>
                            {student.user.firstName} {student.user.middleName}{" "}
                            {student.user.lastName}
                          </>
                        ) : (
                          "Unknown User"
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {student.program
                          ? student.program.name
                          : "Unknown Program"}
                      </td>
                      <td className="border px-4 py-2">
                        {student.program && student.program.department
                          ? student.program.department.name
                          : "Unknown Department"}
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
                              <button
                                onClick={() =>
                                  approveClearanceStep(student.id, step.id)
                                }
                                className={`ml-2 px-4 py-2 rounded ${
                                  step.status === "APPROVED"
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                                disabled={step.status === "APPROVED"}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleRejectClick(student.id, step.id)
                                }
                                className="ml-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                              >
                                Reject
                              </button>
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
        </>
      )}
    </div>
  );
}
