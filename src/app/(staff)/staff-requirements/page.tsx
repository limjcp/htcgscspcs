"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";

const CreateRequirementPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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
      }),
    });

    if (response.ok) {
      alert("Requirement created successfully");
    } else {
      const data = await response.json();
      setError(data.message || "Failed to create requirement.");
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
    </div>
  );
};

export default CreateRequirementPage;
