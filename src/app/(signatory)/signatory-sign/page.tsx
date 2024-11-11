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
  const [searchCategory, setSearchCategory] = useState("student");

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

  const signClearanceStep = async (studentId, stepId) => {
    try {
      const signatoryPosition = session?.user?.position || "Signatory";
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
          signatoryName: `${session?.user?.firstName} ${session?.user?.lastName} - ${signatoryPosition}`,
        }),
      });

      if (response.ok) {
        alert("Clearance step signed successfully");
        fetchStudents(); // Refresh the student list
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
    const student = students.find((s) => s.id === studentId);
    if (
      student &&
      student.clearances.some((clearance) =>
        clearance.steps.some((step) => step.status === "PENDING")
      )
    ) {
      alert("Cannot select students with pending clearance steps.");
      return;
    }
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
      const allSelectableStudentIds = filteredStudents
        .filter(
          (student) =>
            !student.clearances.some((clearance) =>
              clearance.steps.some((step) => step.status === "PENDING")
            )
        )
        .map((student) => student.id);
      setSelectedStudents(allSelectableStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  const signSelectedClearanceSteps = async () => {
    try {
      // Iterate over selected students and sign their clearance steps
      for (const studentId of selectedStudents) {
        // Find the clearance steps for the student
        const student = students.find((s) => s.id === studentId);
        if (student && student.clearances) {
          for (const clearance of student.clearances) {
            for (const step of clearance.steps) {
              await signClearanceStep(studentId, step.id);
            }
          }
        }
      }
      alert("Selected clearance steps signed successfully");
      // Refresh the student list and reset selections
      fetchStudents();
      setSelectedStudents([]);
    } catch (error) {
      setError("Failed to sign selected clearance steps.");
      console.error("Error signing clearance steps:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.user?.firstName} ${student.user?.middleName} ${student.user?.lastName}`.toLowerCase();
    const programName = student.program?.name.toLowerCase() || "";
    const departmentName =
      student.program?.department?.name.toLowerCase() || "";

    if (searchCategory === "student") {
      return fullName.includes(searchTerm.toLowerCase());
    } else if (searchCategory === "program") {
      return programName.includes(searchTerm.toLowerCase());
    } else if (searchCategory === "department") {
      return departmentName.includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Signatory Sign</h1>
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
                  htmlFor="searchCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Search By
                </label>
                <select
                  id="searchCategory"
                  name="searchCategory"
                  value={searchCategory}
                  onChange={handleSearchCategoryChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="student">Student</option>
                  <option value="program">Program</option>
                  <option value="department">Department</option>
                </select>
              </div>
              <div className="w-full md:w-64 mb-2 md:mb-0 md:mr-4">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  placeholder={`Search by ${searchCategory}`}
                />
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
                onClick={signSelectedClearanceSteps}
                disabled={selectedStudents.length === 0}
              >
                Sign All Selected
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
                          disabled={student.clearances.some((clearance) =>
                            clearance.steps.some(
                              (step) => step.status === "PENDING"
                            )
                          )}
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
                                  signClearanceStep(student.id, step.id)
                                }
                                className={`ml-2 px-4 py-2 rounded ${
                                  step.status === "APPROVED"
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                                disabled={step.status !== "APPROVED"}
                              >
                                Sign
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
