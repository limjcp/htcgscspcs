"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignModal = ({
  isOpen,
  onClose,
  officeOrDepartmentId,
  type,
  currentStaff,
  currentSignatory,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(currentStaff || "");
  const [selectedSignatory, setSelectedSignatory] = useState(
    currentSignatory || ""
  );

  useEffect(() => {
    if (isOpen) {
      axios
        .get("/api/users?role=personnel")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedStaff(currentStaff || "");
    setSelectedSignatory(currentSignatory || "");
  }, [currentStaff, currentSignatory]);

  const handleApply = async () => {
    try {
      const response = await axios.post("/api/assign-officers", {
        entityId: officeOrDepartmentId,
        entityType: type,
        staffId: selectedStaff,
        signatoryId: selectedSignatory,
      });

      if (response.status === 200) {
        alert("Officers assigned successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error assigning officers:", error);
      alert("Failed to assign officers");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Assign Officers</h2>
        <div className="mb-4">
          <label className="block mb-2">Select Staff:</label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.middleName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Signatory:</label>
          <select
            value={selectedSignatory}
            onChange={(e) => setSelectedSignatory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.middleName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
