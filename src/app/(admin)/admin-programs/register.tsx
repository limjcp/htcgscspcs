"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function RegisterProgram() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [programs, setPrograms] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProgramId, setEditProgramId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(""); // Add state for message

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/getPrograms");
      const data = await response.json();
      setPrograms(data.programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        editMode
          ? `/api/updateProgram/${editProgramId}`
          : "/api/registerProgram",
        {
          method: editMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        fetchPrograms();
        setName("");
        setDescription("");
        setEditMode(false);
        setEditProgramId(null);
        setIsModalOpen(false); // Close the modal on successful registration
        setMessage("Program saved successfully."); // Set success message
      } else {
        console.error("Error:", data.message);
        setMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form."); // Set error message
    }
  };

  const handleEdit = (program) => {
    setName(program.name);
    setDescription(program.description);
    setEditMode(true);
    setEditProgramId(program.id);
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/deleteProgram/${id}`, { method: "DELETE" });
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Programs</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Program
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 mt-4">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="py-3 px-6 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                Description
              </th>
              <th className="py-3 px-6 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-gray-100">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  {program.name}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 text-center">
                  {program.description}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-center">
                  <button
                    onClick={() => handleEdit(program)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            {editMode ? "Edit Program" : "Register Program"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Program Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Program Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Program Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Program Description"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editMode ? "Update" : "Register"}
              </button>
            </div>
            {message && (
              <p className="text-center text-red-500 mt-4">{message}</p>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}
