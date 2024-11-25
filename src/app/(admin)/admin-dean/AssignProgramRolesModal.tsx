"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignProgramRolesModal = ({
  isOpen,
  onClose,
  departmentId,
  currentProgramHead,
  currentProgramPresident,
  currentProgramHeadPosition,
  currentProgramPresidentPosition,
}) => {
  const [users, setUsers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedProgramHead, setSelectedProgramHead] = useState("");
  const [selectedProgramPresident, setSelectedProgramPresident] = useState("");
  const [selectedProgramHeadPosition, setSelectedProgramHeadPosition] =
    useState("");
  const [
    selectedProgramPresidentPosition,
    setSelectedProgramPresidentPosition,
  ] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios
        .get("/api/users?role=personnel")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));

      axios
        .get("/api/admin/positions")
        .then((response) => setPositions(response.data))
        .catch((error) => console.error("Error fetching positions:", error));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedProgramHead(currentProgramHead || "");
      setSelectedProgramPresident(currentProgramPresident || "");
      setSelectedProgramHeadPosition(currentProgramHeadPosition || "");
      setSelectedProgramPresidentPosition(
        currentProgramPresidentPosition || ""
      );
    }
  }, [
    isOpen,
    currentProgramHead,
    currentProgramPresident,
    currentProgramHeadPosition,
    currentProgramPresidentPosition,
  ]);

  const handleApply = async () => {
    try {
      const response = await axios.post("/api/assign-program-roles", {
        departmentId,
        programHeadId: selectedProgramHead || null,
        programPresidentId: selectedProgramPresident || null,
        programHeadPositionId: selectedProgramHeadPosition || null,
        programPresidentPositionId: selectedProgramPresidentPosition || null,
      });

      if (response.status === 200) {
        alert("Program roles assigned successfully");
        onClose();
      }
    } catch (error) {
      console.error(
        "Error assigning program roles:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to assign program roles");
    }
  };

  const handleClear = async () => {
    try {
      const response = await axios.post("/api/assign-program-roles", {
        departmentId,
        programHeadId: null,
        programPresidentId: null,
        programHeadPositionId: null,
        programPresidentPositionId: null,
      });

      if (response.status === 200) {
        alert("Program roles cleared successfully");
        onClose();
      }
    } catch (error) {
      console.error(
        "Error clearing program roles:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to clear program roles");
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
        <h2 className="text-xl font-bold mb-4">Assign Program Roles</h2>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-2">Select Program Head:</label>
            <select
              value={selectedProgramHead}
              onChange={(e) => setSelectedProgramHead(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            >
              <option value="">None</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.middleName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2">Select Position:</label>
            <select
              value={selectedProgramHeadPosition}
              onChange={(e) => setSelectedProgramHeadPosition(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            >
              <option value="">None</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-2">Select Program President:</label>
            <select
              value={selectedProgramPresident}
              onChange={(e) => setSelectedProgramPresident(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            >
              <option value="">None</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.middleName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2">Select Position:</label>
            <select
              value={selectedProgramPresidentPosition}
              onChange={(e) =>
                setSelectedProgramPresidentPosition(e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-full mb-4"
            >
              <option value="">None</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear
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

export default AssignProgramRolesModal;
