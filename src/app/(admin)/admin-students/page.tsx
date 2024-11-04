"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

type Department = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  program: {
    name: string;
    department?: Department;
  };

  studentId: string;
  userCreated: boolean;
  archived: boolean;
};

type Year = {
  year: string;
};

type Semester = {
  id: string;
  semester: string;
  schoolYearId: string;
};

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [years, setYears] = useState<Year[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      const res = await axios.get("/api/getStudent");
      setStudents(res.data);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchYears() {
      const res = await axios.get("/api/getYears");
      setYears(res.data);
    }
    fetchYears();
  }, []);

  useEffect(() => {
    async function fetchSemesters(year: string) {
      const res = await axios.get(`/api/getSemestersMysql?year=${year}`);
      setSemesters(res.data);
    }

    if (selectedYear) {
      fetchSemesters(selectedYear);
    }
  }, [selectedYear]);

  const handleSyncData = async () => {
    if (!selectedYear || !selectedSemester) {
      alert("Please select both a year and a semester to sync.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `/api/syncStudents?year=${selectedYear}&semester=${selectedSemester}`
      );
      const res = await axios.get("/api/getStudent");
      setStudents(res.data);
    } catch (error) {
      console.error("Error syncing students:", error);
      alert(
        "Failed to sync students. Please check the console for more details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccounts = async () => {
    setLoading(true);
    await axios.post("/api/registerStudents", { studentIds: selectedStudents });
    setLoading(false);
    setShowModal(false);
  };

  const handleCheckboxChange = (studentId: number) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allStudentIds = filteredStudents.map((student) => student.id);
      setSelectedStudents(allStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      !student.userCreated &&
      (student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.program.department &&
          student.program.department.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year.year} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.semester}>
              {semester.semester}
            </option>
          ))}
        </select>
        <button
          onClick={handleSyncData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Sync Data
        </button>
        <button
          onClick={() => setShowModal(true)}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Create Account
        </button>
      </div>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Student ID</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Program</th>
              <th className="px-4 py-2 border-b text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-left">
                  {student.studentId}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {student.email}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {student.program.name}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {student.program.department
                    ? student.program.department.name
                    : "No department"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-3/4">
            <h2 className="text-xl font-bold mb-4">
              Select Students to Create Account
            </h2>
            <input
              type="text"
              placeholder="Search by name or department"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedStudents.length === filteredStudents.length
                        }
                      />
                    </th>
                    <th className="px-4 py-2 border-b text-left">Student ID</th>
                    <th className="px-4 py-2 border-b text-left">Name</th>
                    <th className="px-4 py-2 border-b text-left">Email</th>
                    <th className="px-4 py-2 border-b text-left">Program</th>
                    <th className="px-4 py-2 border-b text-left">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b text-left">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleCheckboxChange(student.id)}
                        />
                      </td>
                      <td className="px-4 py-2 border-b text-left">
                        {student.studentId}
                      </td>
                      <td className="px-4 py-2 border-b text-left">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-4 py-2 border-b text-left">
                        {student.email}
                      </td>
                      <td className="px-4 py-2 border-b text-left">
                        {student.program.name}
                      </td>
                      <td className="px-4 py-2 border-b text-left">
                        {student.program.department
                          ? student.program.department.name
                          : "No department"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCreateAccounts}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
