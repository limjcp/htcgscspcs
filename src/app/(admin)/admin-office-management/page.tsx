"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const OfficeManagementPage = () => {
  const [name, setName] = useState("");
  const [offices, setOffices] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [editingOffice, setEditingOffice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isAssignOfficersModalOpen, setIsAssignOfficersModalOpen] =
    useState(false);
  const [currentOffice, setCurrentOffice] = useState(null);
  const [staffId, setStaffId] = useState("");
  const [signatoryId, setSignatoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOffices();
    fetchPrograms();
    fetchUsers();
  }, []);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/offices-with-users");
      const data = await response.json();
      setOffices(data);
    } catch (error) {
      console.error("Failed to fetch offices:", error);
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

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users?role=personnel");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

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

  const openAssignProgramsModal = (office) => {
    setCurrentOffice(office);
    setSelectedPrograms(
      office.programs ? office.programs.map((program) => program.id) : []
    );
    setIsModalOpen(true);
  };

  const openAssignOfficersModal = (office) => {
    setSelectedOffice(office);
    setIsAssignOfficersModalOpen(true);
    setLoading(true);
    fetchCurrentAssignments(office.id);
  };

  const closeAssignOfficersModal = () => {
    setIsAssignOfficersModalOpen(false);
    setSelectedOffice(null);
    setStaffId("");
    setSignatoryId("");
    setLoading(false);
  };

  const fetchCurrentAssignments = async (officeId) => {
    try {
      const response = await fetch(`/api/get-assignments?officeId=${officeId}`);
      const data = await response.json();
      setStaffId(data.staffId || "");
      setSignatoryId(data.signatoryId || "");
    } catch (error) {
      console.error("Error fetching current assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignOfficers = async () => {
    try {
      const response = await fetch("/api/assign-officers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          officeId: selectedOffice.id,
          staffId,
          signatoryId,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Officers assigned successfully");
        fetchOffices();
        closeAssignOfficersModal();
      } else {
        console.error("Failed to assign officers:", result);
      }
    } catch (error) {
      console.error("Error assigning officers:", error);
    }
  };

  const handleResetOfficers = async () => {
    try {
      const response = await fetch("/api/assign-officers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          officeId: selectedOffice.id,
          staffId: staffId || undefined,
          signatoryId: signatoryId || undefined,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Officers reset successfully");
        fetchOffices();
        closeAssignOfficersModal();
      } else {
        console.error("Failed to reset officers:", result);
      }
    } catch (error) {
      console.error("Error resetting officers:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Offices/Departments</h2>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          + Add Office/Department
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Programs</th>
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
                    {office.programs && office.programs.length > 0
                      ? office.programs
                          .map((program) => program.name)
                          .join(", ")
                      : "No programs assigned"}
                  </td>
                  <td
                    className={`py-2 px-4 border-b text-center ${
                      !office.staff || office.staff.length === 0
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {office.staff && office.staff.length > 0
                      ? office.staff.map((staff) => staff.name).join(", ")
                      : "No staff assigned"}
                  </td>
                  <td
                    className={`py-2 px-4 border-b text-center ${
                      !office.signatories || office.signatories.length === 0
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {office.signatories && office.signatories.length > 0
                      ? office.signatories
                          .map((signatory) => signatory.name)
                          .join(", ")
                      : "No signatories assigned"}
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
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openAssignProgramsModal(office)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Assign Programs
                    </button>
                    <button
                      onClick={() => openAssignOfficersModal(office)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Assign Officers
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
            <h2 className="text-2xl font-bold mb-4">Assign Programs</h2>
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

      {isAssignOfficersModalOpen && (
        <Modal
          isOpen={isAssignOfficersModalOpen}
          onRequestClose={closeAssignOfficersModal}
          contentLabel="Assign Officers"
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Assign Officers to {selectedOffice.name}
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="staffId"
                  >
                    Staff
                  </label>
                  <select
                    id="staffId"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Staff</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="signatoryId"
                  >
                    Signatory
                  </label>
                  <select
                    id="signatoryId"
                    value={signatoryId}
                    onChange={(e) => setSignatoryId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Signatory</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAssignOfficers}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Assign
                  </button>
                  <button
                    onClick={handleResetOfficers}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={closeAssignOfficersModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OfficeManagementPage;
