"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Office {
  id: string;
  name: string;
  departments: Department[];
  staff: { user: User }[];
  signatory: { user: User }[];
}

export default function Office() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [personnel, setPersonnel] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentOffice, setCurrentOffice] = useState<Office | null>(null);
  const [name, setName] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [currentStaff, setCurrentStaff] = useState<string | null>(null);
  const [currentSignatory, setCurrentSignatory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOffices();
    fetchDepartments();
    fetchPersonnel();
  }, []);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/offices");
      const data = await response.json();
      setOffices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch offices:", error);
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments");
      const data = await response.json();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setDepartments([]);
    }
  };

  const fetchPersonnel = async () => {
    try {
      const response = await fetch("/api/users?role=personnel");
      const data = await response.json();
      setPersonnel(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch personnel:", error);
      setPersonnel([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentOffice ? "PUT" : "POST";
    const url = currentOffice
      ? `/api/offices/${currentOffice.id}`
      : "/api/offices";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, departmentIds: selectedDepartments }),
    });

    if (response.ok) {
      alert(`Office ${currentOffice ? "updated" : "created"} successfully!`);
      setName("");
      setCurrentOffice(null);
      setSelectedDepartments([]);
      fetchOffices();
      setIsModalOpen(false);
      await handleAssignPersonnel(); // Call handleAssignPersonnel after office is created/updated
    } else {
      alert(`Failed to ${currentOffice ? "update" : "create"} office.`);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/offices/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("Office deleted successfully!");
      fetchOffices();
    } else {
      alert("Failed to delete office.");
    }
  };

  const handleEdit = (office: Office) => {
    setCurrentOffice(office);
    setName(office.name);
    setSelectedDepartments(
      office.departments
        ? office.departments.map((department) => department.id)
        : []
    );
    setCurrentStaff(
      office.staff && office.staff.length > 0 ? office.staff[0].user.id : null
    );
    setCurrentSignatory(
      office.signatory && office.signatory.length > 0
        ? office.signatory[0].user.id
        : null
    );
    setIsModalOpen(true);
  };

  const handleAssignPersonnel = async () => {
    const assignOrUpdate = async (type: string, userId: string) => {
      const response = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          officeId: currentOffice?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to assign ${type}`);
      }
    };

    try {
      if (currentStaff) {
        await assignOrUpdate("staff", currentStaff);
      }
      if (currentSignatory) {
        await assignOrUpdate("signatories", currentSignatory);
      }
      alert("Personnel assigned successfully!");
      fetchOffices();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPersonnel = async () => {
    const removePersonnel = async (type: string, userId: string) => {
      const response = await fetch(`/api/remove-personnel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          officeId: currentOffice?.id,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove ${type}`);
      }
    };

    try {
      if (currentStaff) {
        await removePersonnel("staff", currentStaff);
        setCurrentStaff(null);
      }
      if (currentSignatory) {
        await removePersonnel("signatory", currentSignatory);
        setCurrentSignatory(null);
      }

      // Update the current office state to remove the staff and signatory
      if (currentOffice) {
        const updatedOffice = {
          ...currentOffice,
          staff: [],
          signatory: [],
        };
        setCurrentOffice(updatedOffice);
        setOffices((prevOffices) =>
          prevOffices.map((office) =>
            office.id === currentOffice.id ? updatedOffice : office
          )
        );
      }

      alert("Personnel roles reset successfully!");
      fetchOffices();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setName("");
    setCurrentOffice(null);
    setSelectedDepartments([]);
    setCurrentStaff(null);
    setCurrentSignatory(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Offices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Office
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Departments
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Staff
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Signatories
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {office.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {office.departments
                    ?.map((department) => department.name)
                    .join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {office.staff
                    ?.map(({ user }) =>
                      user ? `${user.firstName} ${user.lastName}` : "No user"
                    )
                    .join(", ") || "No staff assigned"}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {office.signatory
                    ?.map(({ user }) =>
                      user ? `${user.firstName} ${user.lastName}` : "No user"
                    )
                    .join(", ") || "No signatories assigned"}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  <button
                    onClick={() => handleEdit(office)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    aria-label={`Edit ${office.name}`}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(office.id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Delete ${office.name}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => {
          setCurrentOffice(null);
          setName("");
          setSelectedDepartments([]);
          setIsModalOpen(true);
        }}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Office
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {currentOffice ? "Edit Office" : "Create New Office"}
              </h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Office Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Assign Departments
                  </h4>
                  {departments.map((department) => (
                    <div key={department.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`department-${department.id}`}
                        checked={selectedDepartments.includes(department.id)}
                        onChange={(e) => {
                          setSelectedDepartments((prev) =>
                            e.target.checked
                              ? [...prev, department.id]
                              : prev.filter((id) => id !== department.id)
                          );
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`department-${department.id}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {department.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Assign Personnel
                  </h4>
                  <select
                    value={currentStaff || ""}
                    onChange={(e) =>
                      setCurrentStaff(e.target.value ? e.target.value : null)
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select staff</option>
                    {personnel.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    value={currentSignatory || ""}
                    onChange={(e) =>
                      setCurrentSignatory(
                        e.target.value ? e.target.value : null
                      )
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select signatory</option>
                    {personnel.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {currentOffice ? "Save Changes" : "Create Office"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPersonnel}
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Reset Personnel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
