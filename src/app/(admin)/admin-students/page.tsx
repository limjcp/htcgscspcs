"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  program: {
    name: string;
  };
  studentId: string;
  userCreated: boolean;
  archived: boolean;
};

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      const res = await axios.get("/api/getStudent");
      setStudents(res.data);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  const handleSyncData = async () => {
    setLoading(true);
    await axios.post("/api/syncStudents");
    const res = await axios.get("/api/getStudent");
    setStudents(res.data);
    setLoading(false);
  };

  const handleRegisterStudents = async () => {
    setLoading(true);
    await axios.post("/api/registerStudents");
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleSyncData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Sync Data
        </button>
        <button
          onClick={handleRegisterStudents}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Register Students
        </button>
      </div>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">ID</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Program</th>
              <th className="px-4 py-2 border-b text-left">User Created</th>
              <th className="px-4 py-2 border-b text-left">Archived</th>
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
                  {student.userCreated ? "yes" : "no"}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {student.archived ? "yes" : "no"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
