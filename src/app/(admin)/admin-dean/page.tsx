"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import AssignProgramRolesModal from "./AssignProgramRolesModal"; // Adjust the import path as needed

interface Staff {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface Signatory {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface Department {
  id: string;
  name: string;
  programHead?: Signatory;
  programPresident?: Staff;
}

const AssignProgramRolesPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [currentProgramHead, setCurrentProgramHead] = useState<string | null>(
    null
  );
  const [currentProgramPresident, setCurrentProgramPresident] = useState<
    string | null
  >(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    fetch("/api/departments")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  };

  const handleAssignClick = (id: string) => {
    setSelectedDepartmentId(id);

    const department = departments.find((dept) => dept.id === id);

    if (department) {
      setCurrentProgramHead(department.programHead?.id || null);
      setCurrentProgramPresident(department.programPresident?.id || null);
    }

    setIsModalOpen(true);
  };

  if (!departments.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Assign Program Roles</h1>

      <div className="min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Departments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                  Department Name
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                  Program Head
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                  Program President
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                    {department.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                    {department.programHead
                      ? `${department.programHead.firstName} ${
                          department.programHead.middleName || ""
                        } ${department.programHead.lastName}`
                      : "Not Assigned"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                    {department.programPresident
                      ? `${department.programPresident.firstName} ${
                          department.programPresident.middleName || ""
                        } ${department.programPresident.lastName}`
                      : "Not Assigned"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-left">
                    <button
                      onClick={() => handleAssignClick(department.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      {department.programHead || department.programPresident
                        ? "Reassign"
                        : "Assign"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AssignProgramRolesModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchDepartments(); // Refresh the data after closing the modal
        }}
        departmentId={selectedDepartmentId}
        currentProgramHead={currentProgramHead}
        currentProgramPresident={currentProgramPresident}
      />
    </div>
  );
};

export default AssignProgramRolesPage;
