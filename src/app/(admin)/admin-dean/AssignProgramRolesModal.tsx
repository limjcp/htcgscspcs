import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignProgramRolesModal = ({
  isOpen,
  onClose,
  departmentId,
  currentProgramHead,
  currentProgramPresident,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedProgramHead, setSelectedProgramHead] = useState(
    currentProgramHead || ""
  );
  const [selectedProgramPresident, setSelectedProgramPresident] = useState(
    currentProgramPresident || ""
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
    setSelectedProgramHead(currentProgramHead || "");
    setSelectedProgramPresident(currentProgramPresident || "");
  }, [currentProgramHead, currentProgramPresident]);

  const handleApply = async () => {
    try {
      const response = await axios.post("/api/assign-program-roles", {
        departmentId,
        programHeadId: selectedProgramHead || null,
        programPresidentId: selectedProgramPresident || null,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Assign Program Roles</h2>
        <div className="mb-4">
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
        <div className="mb-4">
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

export default AssignProgramRolesModal;
