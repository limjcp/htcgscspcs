"use client";
// File: src/pages/assign-officers.tsx
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "react-modal";

const AssignOfficersPage = () => {
  const { data: session } = useSession();
  const [offices, setOffices] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [signatoryId, setSignatoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOffices();
    fetchUsers();
  }, []);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/offices-with-users");
      if (response.ok) {
        const data = await response.json();
        setOffices(data);
      } else {
        console.error("Failed to fetch offices");
      }
    } catch (error) {
      console.error("Error fetching offices:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users?role=personnel");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openModal = (office) => {
    setSelectedOffice(office);
    setIsModalOpen(true);
    setLoading(true);
    fetchCurrentAssignments(office.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleAssign = async () => {
    console.log("Assigning officers:", {
      officeId: selectedOffice.id,
      staffId,
      signatoryId,
    });
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
      console.log("API response:", result);
      if (response.ok) {
        alert("Officers assigned successfully");
        fetchOffices();
        closeModal();
      } else {
        console.error("Failed to assign officers:", result);
      }
    } catch (error) {
      console.error("Error assigning officers:", error);
    }
  };

  const handleReset = async () => {
    console.log("Resetting officers:", {
      officeId: selectedOffice.id,
      staffId,
      signatoryId,
    });

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
      console.log("API response:", result);
      if (response.ok) {
        alert("Officers reset successfully");
        fetchOffices();
        closeModal();
      } else {
        console.error("Failed to reset officers:", result);
      }
    } catch (error) {
      console.error("Error resetting officers:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assign Officers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Office Name</th>
              <th className="py-2 px-4 border-b">Staff</th>
              <th className="py-2 px-4 border-b">Signatories</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.id}>
                <td className="py-2 px-4 border-b text-center">
                  {office.name}
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
                    onClick={() => openModal(office)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Assign Officers
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
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
                    onClick={handleAssign}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Assign
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={closeModal}
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

export default AssignOfficersPage;
