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
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (session && session.user && selectedSemester) {
      const { officeId, departmentId } = session.user;
      if (officeId) {
        fetchRequirements(officeId, "office", selectedSemester);
      } else if (departmentId) {
        fetchRequirements(departmentId, "department", selectedSemester);
      } else {
        console.log("Neither officeId nor departmentId available:", session);
      }
    } else {
      console.log(
        "Session not available or semester not selected:",
        session,
        selectedSemester
      );
    }
  }, [session, selectedSemester]);

  const fetchSemesters = async () => {
    try {
      const response = await fetch("/api/getSemesters");
      if (response.ok) {
        const data = await response.json();
        setSemesters(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch semesters.");
        console.error("Error fetching semesters:", errorData);
      }
    } catch (error) {
      setError("Failed to fetch semesters.");
      console.error("Error fetching semesters:", error);
    }
  };

  const fetchRequirements = async (id, type, semesterId) => {
    try {
      const response = await fetch(
        `/api/getRequirements?${type}Id=${id}&semesterId=${semesterId}`
      );
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

    if (!selectedSemester) {
      setError("You must select a semester to create a requirement.");
      return;
    }

    const selectedSemesterObj = semesters.find(
      (semester) => semester.id === selectedSemester
    );

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
        departmentId: session.user.departmentId,
        semesterId: selectedSemester,
        schoolYearId: selectedSemesterObj?.schoolYearId,
      }),
    });

    if (response.ok) {
      alert("Requirement created successfully");
      const { officeId, departmentId } = session.user;
      if (officeId) {
        fetchRequirements(officeId, "office", selectedSemester);
      } else if (departmentId) {
        fetchRequirements(departmentId, "department", selectedSemester);
      }
      setIsModalOpen(false);
      setName("");
      setDescription("");
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
        const { officeId, departmentId } = session.user;
        if (officeId) {
          fetchRequirements(officeId, "office", selectedSemester);
        } else if (departmentId) {
          fetchRequirements(departmentId, "department", selectedSemester);
        }
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
      <div className="mb-4">
        <label className="block text-gray-700">Semester</label>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select a semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
      </div>

      {selectedSemester && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Requirement
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">New Requirement</h2>
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
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                    <td className="border px-4 py-2">
                      {requirement.description}
                    </td>
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
        </>
      )}
    </div>
  );
};

export default CreateRequirementPage;
