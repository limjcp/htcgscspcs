"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [isDeanAssigned, setIsDeanAssigned] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
  }, []);

  const fetchDepartments = async () => {
    const res = await axios.get("/api/departments");
    const departmentsWithDeanId = res.data.map((department) => {
      console.log("Department data:", department); // Add logging to inspect the department data
      return {
        ...department,
        deanId: department.deanId, // Ensure deanId is set
      };
    });
    console.log("Fetched departments with deanId:", departmentsWithDeanId); // Add logging
    setDepartments(departmentsWithDeanId);
  };

  const fetchUsers = async () => {
    const res = await axios.get("/api/users-dean");
    setUsers(res.data);
  };

  const showModal = (department) => {
    setSelectedDepartment(department);
    setIsDeanAssigned(department.deanId ? true : false);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      console.log("Assigning dean with parameters:", {
        departmentId: selectedDepartment.id,
        userId: selectedUser,
      });

      await axios.post("/api/assign-dean", {
        departmentId: selectedDepartment.id,
        userId: selectedUser,
      });

      console.log("Updating roles with parameters:", {
        userId: selectedUser,
        newRoles: ["dean", "signatory"],
      });

      await axios.post("/api/update-role", {
        userId: selectedUser,
        newRoles: ["dean", "signatory"], // Ensure the parameter name matches the backend
      });

      setIsModalVisible(false);
      fetchDepartments(); // Refresh the departments list
    } catch (error) {
      console.error("Error assigning dean or updating roles:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleReset = async (departmentId) => {
    try {
      const department = departments.find((dept) => dept.id === departmentId);
      console.log("Department found for reset:", department); // Add logging

      if (department && department.deanId) {
        console.log("Removing dean with parameters:", {
          departmentId,
          deanId: department.deanId,
        });

        await axios.post("/api/remove-dean", {
          departmentId,
        });

        console.log("Reverting roles with parameters:", {
          userId: department.deanId,
          newRoles: ["personnel"],
        });

        await axios.post("/api/update-role", {
          userId: department.deanId,
          newRoles: ["personnel"], // Revert the role to only "personnel"
        });

        fetchDepartments(); // Refresh the departments list
      } else {
        console.error("No dean found for department:", departmentId);
      }
    } catch (error) {
      console.error("Error resetting dean:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Department</th>
            <th className="px-4 py-2 border-b text-left">Dean</th>
            <th className="px-4 py-2 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-left">
                {department.name}
              </td>
              <td className="px-4 py-2 border-b text-left">
                {department.dean ? department.dean : "No Dean Assigned"}
              </td>
              <td className="px-4 py-2 border-b text-left">
                <button
                  onClick={() => showModal(department)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  disabled={department.deanId ? true : false}
                >
                  Assign Dean
                </button>
                <button
                  onClick={() => handleReset(department.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reset Dean
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Select a Dean</h2>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mb-4 p-2 border rounded"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={handleOk}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                disabled={!selectedUser}
              >
                Assign
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
