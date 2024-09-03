// File: `src/app/(admin)/assign-officers/page.tsx`
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignOfficers() {
  const [offices, setOffices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [signatories, setSignatories] = useState([]);
  const [usersWithRoles, setUsersWithRoles] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedSignatory, setSelectedSignatory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const staffResponse = await axios.get("/api/staff");
      const signatoriesResponse = await axios.get("/api/signatories");
      const usersWithRolesResponse = await axios.get("/api/users-with-roles");
      const registeredUsersResponse = await axios.get("/api/users");
      const response = await axios.get("/api/offices-with-users");
      console.log("Fetched data:", response.data);

      setOffices(response.data);
      setStaff(staffResponse.data);
      setSignatories(signatoriesResponse.data);
      setUsersWithRoles(usersWithRolesResponse.data);
      setRegisteredUsers(registeredUsersResponse.data);
    };

    fetchData();
  }, []);

  const handleAssignUser = async () => {
    try {
      await axios.post("/api/assign-user", {
        userId: selectedUser,
        role: selectedRole,
        officeId: selectedOffice,
      });
      alert("User assigned successfully");
      const usersWithRolesResponse = await axios.get("/api/users-with-roles");
      setUsersWithRoles(usersWithRolesResponse.data);
    } catch (error) {
      console.error("Error assigning user:", error);
      alert("Failed to assign user");
    }
  };

  const handleEditClick = (office) => {
    setSelectedOffice(office);
    setSelectedStaff(office.staff.length > 0 ? office.staff[0].id : "");
    setSelectedSignatory(
      office.signatories.length > 0 ? office.signatories[0].id : "",
    );
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post("/api/update-office", {
        officeId: selectedOffice.id,
        staffId: selectedStaff,
        signatoryId: selectedSignatory,
      });
      alert("Office updated successfully");
      setSelectedOffice(null);
      const response = await axios.get("/api/offices-with-users");
      setOffices(response.data);
    } catch (error) {
      console.error("Error updating office:", error);
      alert("Failed to update office");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mt-8 mb-4">Assign Registered User</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Select User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Select a user</option>
            {registeredUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Select Role:
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Select a role</option>
            <option value="staff">Staff</option>
            <option value="signatory">Signatory</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Select Office:
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Select an office</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={handleAssignUser}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Assign User
      </button>
      <h2 className="text-xl font-bold mt-8 mb-4">
        Offices with Assigned Staff and Signatories
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Office</th>
            <th className="py-2 px-4 border-b">Staff</th>
            <th className="py-2 px-4 border-b">Signatories</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office) => (
            <tr key={office.id}>
              <td className="py-2 px-4 border-b">{office.name}</td>
              <td className="py-2 px-4 border-b">
                {office.staff && office.staff.length > 0
                  ? office.staff.map((staff) => (
                      <div key={staff.id}>{staff.name}</div>
                    ))
                  : "No staff assigned"}
              </td>
              <td className="py-2 px-4 border-b">
                {office.signatories && office.signatories.length > 0
                  ? office.signatories.map((signatory) => (
                      <div key={signatory.id}>{signatory.name}</div>
                    ))
                  : "No signatories assigned"}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditClick(office)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOffice && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-4">Edit Office</h2>
            <div className="mb-4">
              <label className="block mb-2">Select Staff:</label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="">Select a staff</option>
                {staff.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Select Signatory:</label>
              <select
                value={selectedSignatory}
                onChange={(e) => setSelectedSignatory(e.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="">Select a signatory</option>
                {signatories.map((signatory) => (
                  <option key={signatory.id} value={signatory.id}>
                    {signatory.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setSelectedOffice(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
