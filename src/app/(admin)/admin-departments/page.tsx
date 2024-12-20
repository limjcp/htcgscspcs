"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/withAuth";

const DepartmentPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/departments");
      const data = await response.json();

      if (Array.isArray(data)) {
        setDepartments(data);
      } else {
        console.error("Data is not an array:", data);
        setDepartments([]);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/programs");
      const data = await response.json();

      if (Array.isArray(data)) {
        setPrograms(data);
      } else {
        console.error("Data is not an array:", data);
        setPrograms([]);
      }
    } catch (error) {
      console.error("Failed to fetch programs:", error);
      setPrograms([]);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchPrograms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, programIds: selectedPrograms }),
    });

    if (response.ok) {
      alert("Department created successfully!");
      setName("");
      setDescription("");
      setSelectedPrograms([]);
      fetchDepartments();
      setIsFormModalOpen(false);
    } else {
      alert("Failed to create department.");
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setName(department.name);
    setDescription(department.description);
    setSelectedPrograms(
      department.programs
        ? department.programs.map((program) => program.id)
        : []
    );
    setIsFormModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/departments/${editingDepartment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, programIds: selectedPrograms }),
    });

    if (response.ok) {
      alert("Department updated successfully!");
      setName("");
      setDescription("");
      setSelectedPrograms([]);
      setEditingDepartment(null);
      fetchDepartments();
      setIsFormModalOpen(false);
    } else {
      alert("Failed to update department.");
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/departments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Department deleted successfully!");
      fetchDepartments();
    } else {
      alert("Failed to delete department.");
    }
  };

  const handleProgramChange = (programId) => {
    setSelectedPrograms((prevSelected) =>
      prevSelected.includes(programId)
        ? prevSelected.filter((id) => id !== programId)
        : [...prevSelected, programId]
    );
  };

  const getAvailablePrograms = () => {
    const assignedProgramIds = departments
      .flatMap((department) => department.programs)
      .map((program) => program.id);

    return programs.filter(
      (program) =>
        !assignedProgramIds.includes(program.id) ||
        selectedPrograms.includes(program.id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Departments</h2>
        <div>
          <button
            onClick={() => router.push("/admin-offices")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Register Office
          </button>
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
          >
            + Add Department
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Programs</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(departments) ? (
              departments.map((department) => (
                <tr key={department.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {department.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {department.description}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {department.programs
                      ?.map((program) => program.name)
                      .join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEdit(department)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(department.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b">
                  No departments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isFormModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">
              {editingDepartment ? "Update Department" : "Create Department"}
            </h2>
            <form
              onSubmit={editingDepartment ? handleUpdate : handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.toUpperCase())}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Assign Programs
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  {getAvailablePrograms().map((program) => (
                    <div key={program.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`program-${program.id}`}
                        checked={selectedPrograms.includes(program.id)}
                        onChange={() => handleProgramChange(program.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`program-${program.id}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {program.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editingDepartment ? "Update Department" : "Create Department"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(DepartmentPage, ["admin"]);
