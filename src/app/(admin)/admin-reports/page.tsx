"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

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

  const fetchYears = async () => {
    try {
      const response = await fetch("/api/years");
      const data = await response.json();
      if (Array.isArray(data)) {
        setYears(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const fetchSemesters = async (year) => {
    try {
      const response = await fetch(`/api/studentsemesters?year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setSemesters(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchYears();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchSemesters(selectedYear);
    }
  }, [selectedYear]);

  const generateReport = (semesterId) => {
    const semester = semesters.find((s) => s.id === semesterId);
    const semesterName = semester ? semester.name : "Unknown Semester";

    const clearedStudentsList = students.filter(
      (student) => student.status === "cleared"
    );
    const notClearedStudentsList = students.filter(
      (student) => student.status !== "cleared"
    );

    const formatStudentName = (student) => {
      return `${student.firstName} ${
        student.middleName ? student.middleName : ""
      } ${student.lastName}`.trim();
    };

    const newReport = {
      id: Date.now(),
      semesterId,
      semesterName,
      totalStudents: students.length,
      clearedStudents: clearedStudentsList.length,
      notClearedStudents: notClearedStudentsList.length,
      clearedStudentsList: clearedStudentsList.map(formatStudentName),
      notClearedStudentsList: notClearedStudentsList.map(formatStudentName),
    };

    setReports([...reports, newReport]);
  };

  const handlePrint = (report) => {
    const doc = new jsPDF();
    doc.text(`Report for Semester: ${report.semesterName}`, 10, 10);
    doc.autoTable({
      head: [["Total Students", "Cleared Students", "Not Cleared Students"]],
      body: [
        [
          report.totalStudents,
          report.clearedStudents,
          report.notClearedStudents,
        ],
      ],
    });
    doc.autoTable({
      head: [["Cleared Students"]],
      body: report.clearedStudentsList.map((name) => [name]),
    });
    doc.autoTable({
      head: [["Not Cleared Students"]],
      body: report.notClearedStudentsList.map((name) => [name]),
    });
    doc.save(`report_${report.semesterId}.pdf`);
  };

  const filteredReports = reports.filter(
    (report) => report.semesterId === selectedSemester
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select onValueChange={setSelectedYear} value={selectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setSelectedSemester}
              value={selectedSemester}
              disabled={!selectedYear}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => generateReport(selectedSemester)}
              disabled={!selectedSemester}
            >
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="cleared">Cleared Students</TabsTrigger>
                <TabsTrigger value="notCleared">
                  Not Cleared Students
                </TabsTrigger>
              </TabsList>
              <TabsContent value="summary">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Cleared Students</TableHead>
                      <TableHead>Not Cleared Students</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.totalStudents}</TableCell>
                        <TableCell>{report.clearedStudents}</TableCell>
                        <TableCell>{report.notClearedStudents}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlePrint(report)}
                            variant="outline"
                          >
                            Print PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="cleared">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cleared Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports[0]?.clearedStudentsList.map(
                      (student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="notCleared">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Not Cleared Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports[0]?.notClearedStudentsList.map(
                      (student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
