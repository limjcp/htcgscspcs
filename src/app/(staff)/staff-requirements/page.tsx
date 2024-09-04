"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";

const CreateRequirementPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    if (session && session.user && session.user.officeId) {
      fetchRequirements(session.user.officeId);
    } else {
      console.log("Session or officeId not available:", session);
    }
  }, [session]);

  const fetchRequirements = async (officeId) => {
    try {
      const response = await fetch(`/api/getRequirements?officeId=${officeId}`);
      if (response.ok) {
        const data = await response.json();
        setRequirements(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch requirements.");
        console.error("Error fetching requirements:", errorData);
      }
    } catch (error) {
      setError("Failed to fetch requirements.");
      console.error("Error fetching requirements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user || !session.user.staffId) {
      setError("You must be logged in as staff to create a requirement.");
      return;
    }

    const response = await fetch("/api/requirementscreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        staffId: session.user.staffId,
        officeId: session.user.officeId,
      }),
    });

    if (response.ok) {
      alert("Requirement created successfully");
      fetchRequirements(session.user.officeId); // Refresh the requirements list
    } else {
      const data = await response.json();
      setError(data.message || "Failed to create requirement.");
    }
  };

  const handleDelete = async (requirementId) => {
    try {
      const response = await fetch(`/api/deleteRequirement`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirementId }),
      });

      if (response.ok) {
        alert("Requirement deleted successfully");
        fetchRequirements(session.user.officeId); // Refresh the requirements list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete requirement.");
        console.error("Error deleting requirement:", errorData);
      }
    } catch (error) {
      setError("Failed to delete requirement.");
      console.error("Error deleting requirement:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Requirement</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Requirements</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((requirement) => (
              <tr key={requirement.id}>
                <td className="border px-4 py-2">{requirement.name}</td>
                <td className="border px-4 py-2">{requirement.description}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(requirement.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateRequirementPage;
