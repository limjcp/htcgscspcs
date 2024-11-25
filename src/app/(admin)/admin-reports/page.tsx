"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { withAuth } from "@/withAuth";

function AdminReportsPage() {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [departmentId, setDepartmentId] = useState("all");
  const [clearanceStatus, setClearanceStatus] = useState("all");
  const [students, setStudents] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, departmentsRes] = await Promise.all([
          axios.get("/api/reports/years"),
          axios.get("/api/reports/departments"),
        ]);
        setYears(yearsRes.data);
        setDepartments(departmentsRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSemesters = async () => {
      if (year) {
        try {
          const response = await axios.get(
            `/api/reports/semesters?year=${year}`
          );
          setSemesters(response.data);
        } catch (error) {
          console.error("Failed to fetch semesters", error);
        }
      } else {
        setSemesters([]);
      }
    };
    fetchSemesters();
  }, [year]);

  const fetchStudents = async () => {
    try {
      const response = await axios.post("/api/reports", {
        year,
        semester,
        departmentId,
        clearanceStatus,
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/htc-new-seal.png";
    img.onload = () => {
      // Add logo
      doc.addImage(img, "PNG", 10, 10, 30, 30);

      // Add title and subtitle
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 128); // Dark blue color
      doc.text("Holy Trinity College of General Santos City", 50, 20);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0); // Black color
      doc.text(
        `Clearance Report for Year: ${year}, Semester: ${semester}`,
        50,
        30
      );

      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 40);

      const formatName = (student) => {
        const middleInitial = student.middleName
          ? ` ${student.middleName.charAt(0)}.`
          : "";
        return `${student.lastName}, ${student.firstName}${middleInitial}`;
      };

      const clearedStudents = students
        .filter((student) =>
          student.clearances.some((clearance) => clearance.status === "CLEARED")
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

      const notClearedStudents = students
        .filter(
          (student) =>
            !student.clearances.some(
              (clearance) => clearance.status === "CLEARED"
            )
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

      const createTable = (title, data, startY) => {
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128); // Dark blue color
        doc.text(title, 10, startY);
        doc.autoTable({
          startY: startY + 10,
          head: [["Name", "Program", "Department"]],
          body: data.map((student) => [
            formatName(student),
            student.program.name,
            student.program.department
              ? student.program.department.name
              : "N/A",
          ]),
          headStyles: { fillColor: [0, 0, 128], textColor: [255, 255, 255] },
          alternateRowStyles: { fillColor: [240, 240, 255] },
        });
      };

      if (clearanceStatus === "all" || clearanceStatus === "cleared") {
        createTable("Cleared Students", clearedStudents, 50);
      }

      if (clearanceStatus === "all" || clearanceStatus === "not_cleared") {
        const startY =
          clearanceStatus === "all" ? doc.autoTable.previous.finalY + 20 : 50;
        createTable("Not Cleared Students", notClearedStudents, startY);
      }

      // Add summary
      const totalStudents = students.length;
      const clearedCount = clearedStudents.length;
      const notClearedCount = notClearedStudents.length;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black color
      doc.text(
        `Total Students: ${totalStudents}`,
        10,
        doc.autoTable.previous.finalY + 20
      );
      doc.text(
        `Cleared Students: ${clearedCount}`,
        10,
        doc.autoTable.previous.finalY + 30
      );
      doc.text(
        `Not Cleared Students: ${notClearedCount}`,
        10,
        doc.autoTable.previous.finalY + 40
      );

      doc.save("clearance_report.pdf");
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          fetchStudents();
        }}
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Year:
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y.year} value={y.year}>
                  {y.year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Semester:
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              {semesters.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Department:
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Clearance Status:
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={clearanceStatus}
              onChange={(e) => setClearanceStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="cleared">Cleared</option>
              <option value="not_cleared">Not Cleared</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Fetch Students
        </button>
      </form>
      {students.length > 0 && (
        <>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Students</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Clearance Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {student.program.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {student.program.department
                          ? student.program.department.name
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        {student.clearances.some(
                          (clearance) => clearance.status === "CLEARED"
                        )
                          ? "Cleared"
                          : "Not Cleared"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate PDF
          </button>
        </>
      )}
    </div>
  );
}
export default withAuth(AdminReportsPage, ["admin"]);
