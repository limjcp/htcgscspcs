"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Search } from "lucide-react";

export default function Page() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [importProgress, setImportProgress] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/student-data/student")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (importProgress !== null && importProgress < 100) {
      const interval = setInterval(() => {
        fetch("/api/student-data/import-students")
          .then((res) => res.json())
          .then((data) => setImportProgress(data.progress))
          .catch((error) => console.error(error));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [importProgress]);

  const handleImport = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/student-data/import-students", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setImportProgress(0);
        fetch("/api/student-data/student")
          .then((res) => res.json())
          .then((data) => setStudents(data));
      } else {
        console.error("Failed to import data");
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Student Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <Input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-500" />}
              />
            </div>
            <div>
              <Button onClick={handleImport} className="w-full sm:w-auto">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
              <input
                type="file"
                id="fileInput"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {importProgress !== null && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${importProgress}%` }}
                ></div>
              </div>
              <p className="text-center mb-4">
                {importProgress < 100 ? "Importing..." : "Import done"}
              </p>
            </>
          )}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Enrollment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>
                      {`${student.firstName} ${student.middleName || ""} ${
                        student.lastName
                      }`.trim()}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{`${student.enrollmentYearYear} ${student.enrollmentSemesterSemester}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
