"use client";
import React, { useState, useEffect } from "react";
import AssignModal from "../admin-officers/AssignModal";
// Adjust the import path as needed

const Office = () => {
  const [name, setName] = useState("");
  const [offices, setOffices] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [editingOffice, setEditingOffice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentOffice, setCurrentOffice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState("");
  const [currentStaff, setCurrentStaff] = useState<string | null>(null);
  const [currentSignatory, setCurrentSignatory] = useState<string | null>(null);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/offices");
      const data = await response.json();

      if (Array.isArray(data)) {
        setOffices(data);
      } else {
        console.error("Data is not an array:", data);
        setOffices([]);
      }
    } catch (error) {
      console.error("Failed to fetch offices:", error);
      setOffices([]);
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
    fetchOffices();
    fetchPrograms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/offices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert("Office created successfully!");
      setName("");
      fetchOffices();
      setIsFormModalOpen(false);
    } else {
      alert("Failed to create office.");
    }
  };

  const handleEdit = (office) => {
    setEditingOffice(office);
    setName(office.name);
    setIsFormModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/offices/${editingOffice.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert("Office updated successfully!");
      setName("");
      setEditingOffice(null);
      fetchOffices();
      setIsFormModalOpen(false);
    } else {
      alert("Failed to update office.");
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/offices/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Office deleted successfully!");
      fetchOffices();
    } else {
      alert("Failed to delete office.");
    }
  };

  const handleAssignPrograms = async () => {
    const response = await fetch(`/api/assign-programs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        officeId: currentOffice.id,
        programIds: selectedPrograms,
      }),
    });

    if (response.ok) {
      alert("Programs assigned successfully!");
      setIsModalOpen(false);
      fetchOffices();
    } else {
      alert("Failed to assign programs.");
    }
  };

  const handleProgramChange = (programId) => {
    setSelectedPrograms((prevSelected) =>
      prevSelected.includes(programId)
        ? prevSelected.filter((id) => id !== programId)
        : [...prevSelected, programId]
    );
  };

  const openModal = (office) => {
    setCurrentOffice(office);
    setSelectedPrograms(
      office.programs ? office.programs.map((program) => program.id) : []
    );
    setIsModalOpen(true);
  };

  const handleAssignClick = (office) => {
    setSelectedOfficeId(office.id);
    setCurrentStaff(
      office.staff && office.staff.length > 0 ? office.staff[0].user.id : null
    );
    setCurrentSignatory(
      office.signatory && office.signatory.length > 0
        ? office.signatory[0].user.id
        : null
    );
    setIsAssignModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Offices</h2>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          + Add Office
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Office</th>
              <th className="py-2 px-4 border-b">Departments</th>
              <th className="py-2 px-4 border-b">Staff</th>
              <th className="py-2 px-4 border-b">Signatories</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(offices) ? (
              offices.map((office) => (
                <tr key={office.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {office.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {office.programs?.map((program) => program.name).join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {office.staff
                      ?.map(({ user }) => `${user.firstName} ${user.lastName}`)
                      .join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {office.signatory
                      ?.map(({ user }) => `${user.firstName} ${user.lastName}`)
                      .join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEdit(office)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(office.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openModal(office)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Assign Programs
                    </button>
                    <button
                      onClick={() => handleAssignClick(office)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Assign Personnel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 border-b">
                  No offices available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Assign Departments</h2>
            <div className="mb-4">
              {programs.map((program) => (
                <div key={program.id} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedPrograms.includes(program.id)}
                      onChange={() => handleProgramChange(program.id)}
                    />
                    <span className="ml-2">{program.name}</span>
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={handleAssignPrograms}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Assign
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isFormModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">
              {editingOffice ? "Update Office" : "Create Office"}
            </h2>
            <form
              onSubmit={editingOffice ? handleUpdate : handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Office Name
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editingOffice ? "Update Office" : "Create Office"}
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

      <AssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        officeOrDepartmentId={selectedOfficeId}
        type="office"
        currentStaff={currentStaff}
        currentSignatory={currentSignatory}
      />
    </div>
  );
};

export default Office;
