"use client";
import React, { useState, useEffect } from "react";

const Office = () => {
  const [name, setName] = useState("");
  const [offices, setOffices] = useState([]);
  const [editingOffice, setEditingOffice] = useState(null);

  const fetchOffices = async () => {
    try {
      const response = await fetch("/api/offices");
      const data = await response.json();

      if (Array.isArray(data)) {
        setOffices(data);
      } else {
        console.error("Data is not an array:", data);
        setOffices([]);
      }
    } catch (error) {
      console.error("Failed to fetch offices:", error);
      setOffices([]);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

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
    } else {
      alert("Failed to create office.");
    }
  };

  const handleEdit = (office) => {
    setEditingOffice(office);
    setName(office.name);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Create Office</h1>
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
            onChange={(e) => setName(e.target.value)}
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
      </form>

      <h2 className="text-2xl font-bold mb-4">Offices</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(offices) ? (
            offices.map((office) => (
              <tr key={office.id}>
                <td className="py-2 px-4 border-b">{office.name}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(office)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(office.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-2 px-4 border-b">
                No offices available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Office;
