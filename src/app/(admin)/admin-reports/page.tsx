"use client";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handlePrint = (report) => {
    const doc = new jsPDF();
    doc.text(`Report for Semester: ${report.semesterId}`, 10, 10);
    doc.autoTable({
      head: [
        [
          "Total Students",
          "Cleared Students",
          "Pending Students",
          "Rejected Students",
        ],
      ],
      body: [
        [
          report.totalStudents,
          report.clearedStudents,
          report.pendingStudents,
          report.rejectedStudents,
        ],
      ],
    });
    doc.save(`report_${report.semesterId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Semester ID</th>
              <th className="py-2 px-4 border-b">Total Students</th>
              <th className="py-2 px-4 border-b">Cleared Students</th>
              <th className="py-2 px-4 border-b">Pending Students</th>
              <th className="py-2 px-4 border-b">Rejected Students</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="py-2 px-4 border-b">{report.semesterId}</td>
                <td className="py-2 px-4 border-b">{report.totalStudents}</td>
                <td className="py-2 px-4 border-b">{report.clearedStudents}</td>
                <td className="py-2 px-4 border-b">{report.pendingStudents}</td>
                <td className="py-2 px-4 border-b">
                  {report.rejectedStudents}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handlePrint(report)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Print PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
