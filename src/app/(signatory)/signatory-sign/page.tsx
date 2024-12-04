"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withAuth } from "@/withAuth";

function StaffApprovalAndSigningPage() {
  const { data: session } = useSession();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("student");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);
  const [comment, setComment] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [hasSelectedApproved, setHasSelectedApproved] = useState(false);
  const [hasSelectedPending, setHasSelectedPending] = useState(false);

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

  const fetchRequirements = async (officeId, departmentId, semesterId) => {
    try {
      const response = await axios.get(
        `/api/personnel/requirements?officeId=${officeId || ""}&departmentId=${
          departmentId || ""
        }&semesterId=${semesterId}`
      );
      setRequirements(response.data);
    } catch (error) {
      setError("Failed to fetch requirements.");
      console.error("Error fetching requirements:", error);
    }
  };

  const approveClearanceStep = async (studentId, stepId) => {
    try {
      const staffPosition = session?.user?.position || "Staff";
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
        setIsModalOpen(false);
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
      const staffPosition = session?.user?.position || "Staff";
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
          staffName: `${session?.user?.firstName} ${session?.user?.lastName} - ${staffPosition}`,
          comments: comment,
        }),
      });

      if (response.ok) {
        alert("Clearance step rejected successfully");
        fetchStudents(); // Refresh the student list
        setIsModalOpen(false);
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

  const handleYearChange = (value) => {
    setSelectedYear(value);
    setSelectedSemester(""); // Reset semester when year changes
    setSemesters([]); // Clear semesters list
    setStudents([]); // Clear students list
    fetchSemesters(value);
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    // No need to fetch students here; useEffect will handle it
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCategoryChange = (value) => {
    setSearchCategory(value);
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

  const handleView = (student) => {
    setActiveStudent(student);
    setIsModalOpen(true);
    fetchRequirements(
      session.user.officeId,
      session.user.departmentId,
      selectedSemester
    );
  };

  const handleApprove = () => {
    if (activeStudent && activeStudent.clearances) {
      activeStudent.clearances.forEach((clearance) => {
        clearance.steps.forEach((step) => {
          approveClearanceStep(activeStudent.id, step.id);
        });
      });
    }
  };

  const handleRemarks = () => {
    if (activeStudent && activeStudent.clearances && comment) {
      activeStudent.clearances.forEach((clearance) => {
        clearance.steps.forEach((step) => {
          rejectClearanceStep(activeStudent.id, step.id, comment);
        });
      });
      setComment("");
    }
  };

  const handleCheckboxChange = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (
      student &&
      !canSign(student) &&
      !student.clearances.some((clearance) =>
        clearance.steps.some((step) => step.status === "PENDING")
      )
    ) {
      alert(
        "Cannot select students with no approved or pending clearance steps."
      );
      return;
    }
    setSelectedStudents((prevSelected) => {
      const newSelected = prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId];

      // Update hasSelectedApproved and hasSelectedPending
      const selectedStudents = students.filter((s) =>
        newSelected.includes(s.id)
      );
      setHasSelectedApproved(selectedStudents.some(canSign));
      setHasSelectedPending(
        selectedStudents.some((s) =>
          s.clearances.some((c) =>
            c.steps.some((step) => step.status === "PENDING")
          )
        )
      );

      return newSelected;
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allSelectableStudentIds = filteredStudents
        .filter(
          (student) =>
            canSign(student) ||
            student.clearances.some((clearance) =>
              clearance.steps.some((step) => step.status === "PENDING")
            )
        )
        .map((student) => student.id);
      setSelectedStudents(allSelectableStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  const approveSelectedClearanceSteps = async () => {
    try {
      for (const studentId of selectedStudents) {
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
      fetchStudents();
      setSelectedStudents([]);
    } catch (error) {
      setError("Failed to approve selected clearance steps.");
      console.error("Error approving clearance steps:", error);
    }
  };

  const signSelectedClearanceSteps = async () => {
    try {
      for (const studentId of selectedStudents) {
        const student = students.find((s) => s.id === studentId);
        if (student && student.clearances) {
          for (const clearance of student.clearances) {
            for (const step of clearance.steps) {
              if (step.status === "APPROVED") {
                await signClearanceStep(studentId, step.id);
              }
            }
          }
        }
      }
      alert("Selected clearance steps signed successfully");
      fetchStudents();
      setSelectedStudents([]);
    } catch (error) {
      setError("Failed to sign selected clearance steps.");
      console.error("Error signing clearance steps:", error);
    }
  };

  const isFullyApproved = (student) => {
    return student.clearances.every((clearance) =>
      clearance.steps.every(
        (step) => step.status === "APPROVED" || step.status === "SIGNED"
      )
    );
  };

  const canSign = (student) => {
    return student.clearances.some((clearance) =>
      clearance.steps.some((step) => step.status === "APPROVED")
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Staff Approve and Sign
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="year">Select Year</Label>
          <Select onValueChange={handleYearChange} value={selectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="semester">Select Semester</Label>
          <Select
            onValueChange={handleSemesterChange}
            value={selectedSemester}
            disabled={!selectedYear}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedSemester && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-2 md:mb-0">Students</h2>
            <div>
              <Button
                onClick={approveSelectedClearanceSteps}
                disabled={!hasSelectedPending}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Approve Selected
              </Button>
              <Button
                onClick={signSelectedClearanceSteps}
                disabled={!hasSelectedApproved}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Sign Selected
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
              <div className="w-full md:w-64 mb-2 md:mb-0 md:mr-4">
                <Label htmlFor="searchCategory">Search By</Label>
                <Select
                  onValueChange={handleSearchCategoryChange}
                  value={searchCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select search category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="program">Program</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-64 mb-2 md:mb-0 md:mr-4">
                <Label htmlFor="search">Search</Label>
                <Input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder={`Search by ${searchCategory}`}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 border-b">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        filteredStudents.length > 0 &&
                        selectedStudents.length ===
                          filteredStudents.filter(
                            (student) =>
                              canSign(student) || !isFullyApproved(student)
                          ).length
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
                {filteredStudents.map((student) =>
                  student.clearances.map((clearance) =>
                    clearance.steps.map((step) => (
                      <tr
                        key={`${student.id}-${step.id}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleCheckboxChange(student.id)}
                            disabled={
                              !canSign(student) && isFullyApproved(student)
                            }
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
                          <span className="font-semibold">
                            {step.office ? step.office.name : "Unknown Office"}
                          </span>{" "}
                          - {step.status}
                        </td>
                        <td className="border px-4 py-2">
                          {step.status === "COMPLETED" && (
                            <Button
                              onClick={() =>
                                signClearanceStep(student.id, step.id)
                              }
                              className="bg-blue-500 text-white mr-2"
                            >
                              Sign
                            </Button>
                          )}
                          <Button
                            onClick={() => handleView(student)}
                            disabled={isFullyApproved(student)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activeStudent?.user?.firstName} {activeStudent?.user?.lastName} -
              Clearance Requirements
            </DialogTitle>
            <DialogDescription>
              Review the requirements and approve or add remarks.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-semibold mb-2">Requirements:</h3>
            <ul className="list-disc pl-5">
              {requirements.map((requirement) => (
                <li key={requirement.id}>
                  <span className="font-semibold">{requirement.name}</span>
                  <p>{requirement.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter className="sm:justify-start">
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-between">
                <Button onClick={handleApprove} className="w-1/2 mr-2">
                  Approve
                </Button>
                <Button
                  onClick={handleRemarks}
                  className="w-1/2 ml-2"
                  variant="outline"
                >
                  Remarks
                </Button>
              </div>
              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your remarks here..."
                />
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default withAuth(StaffApprovalAndSigningPage, ["signatory"]);
