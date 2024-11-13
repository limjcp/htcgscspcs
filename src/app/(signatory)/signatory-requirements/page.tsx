"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import axios from "axios";

const CreateRequirementPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchSemesters(selectedYear);
    }
  }, [selectedYear]);

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

  const fetchYears = async () => {
    try {
      const response = await axios.get("/api/personnel/years");
      setYears(response.data);
    } catch (error) {
      setError("Failed to fetch years.");
      console.error("Error fetching years:", error);
    }
  };

  const fetchSemesters = async (yearId) => {
    try {
      const response = await axios.get(
        `/api/personnel/semesters?schoolYearId=${yearId}`
      );
      setSemesters(response.data);
    } catch (error) {
      setError("Failed to fetch semesters.");
      console.error("Error fetching semesters:", error);
    }
  };

  const fetchRequirements = async (id, type, semesterId) => {
    try {
      const response = await axios.get(
        `/api/personnel/requirements?${type}Id=${id}&semesterId=${semesterId}`
      );
      setRequirements(response.data);
    } catch (error) {
      setError("Failed to fetch requirements.");
      console.error("Error fetching requirements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      setError("You must be logged in to create a requirement.");
      return;
    }

    if (!selectedYear || !selectedSemester) {
      setError(
        "You must select a year and a semester to create a requirement."
      );
      return;
    }

    const selectedSemesterObj = semesters.find(
      (semester) => semester.id === selectedSemester
    );

    try {
      const response = await axios.post("/api/personnel/requirements", {
        name,
        description,
        officeId: session.user.officeId,
        departmentId: session.user.departmentId,
        semesterId: selectedSemester,
        schoolYearId: selectedSemesterObj?.schoolYearId,
      });

      if (response.status === 200) {
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
        setError("Failed to create requirement.");
      }
    } catch (error) {
      setError("Failed to create requirement.");
      console.error("Error creating requirement:", error);
    }
  };

  const handleDelete = async (requirementId) => {
    try {
      const response = await axios.delete(
        `/api/personnel/requirements?id=${requirementId}`
      );

      if (response.status === 204) {
        alert("Requirement deleted successfully");
        const { officeId, departmentId } = session.user;
        if (officeId) {
          fetchRequirements(officeId, "office", selectedSemester);
        } else if (departmentId) {
          fetchRequirements(departmentId, "department", selectedSemester);
        }
      } else {
        setError("Failed to delete requirement.");
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
        <label className="block text-gray-700">Year</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Semester</label>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
          disabled={!selectedYear}
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
