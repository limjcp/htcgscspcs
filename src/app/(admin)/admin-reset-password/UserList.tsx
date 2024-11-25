"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string | null;
  role: string[];
  username: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users-reset");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleResetPassword = async (userId: string) => {
    const response = await fetch(`/api/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      alert("Password reset to '123' successfully.");
    } else {
      alert("Failed to reset password.");
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole =
      selectedRole === "all" || user.role.includes(selectedRole);
    const matchesSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4 flex items-center">
        <label htmlFor="role" className="mr-2">
          Filter by Role:
        </label>
        <select
          id="role"
          value={selectedRole}
          onChange={handleRoleChange}
          className="border px-2 py-1 mr-4"
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="signatory">Signatory</option>
          <option value="staff">Staff</option>
          <option value="personnel">Personnel</option>
          <option value="admin">Admin</option>
          <option value="dean">Dean</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border px-2 py-1"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">First Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Last Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300">Username</th>
            <th className="py-2 px-4 border-b border-gray-300">Last Login</th>
            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300">
                {user.firstName}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.lastName}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.username}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {formatDate(user.lastLogin)}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button
                  onClick={() => handleResetPassword(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reset Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
