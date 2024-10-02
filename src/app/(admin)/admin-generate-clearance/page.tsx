"use client";
import { useState, useEffect } from "react";
import React from "react";

function ClearanceGenerationPage() {
  const [semesterId, setSemesterId] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the list of semesters from the API
    const fetchSemesters = async () => {
      try {
        const response = await fetch("/api/getSemesters");
        if (response.ok) {
          const data = await response.json();
          setSemesters(data);
        } else {
          setMessage("Failed to fetch semesters.");
        }
      } catch (error) {
        setMessage("Failed to fetch semesters.");
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, []);

  const handleSemesterChange = (e) => {
    setSemesterId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/generateClearance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ semesterId }),
      });

      if (response.ok) {
        setMessage("Clearance generated successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to generate clearance.");
      }
    } catch (error) {
      setMessage("Failed to generate clearance.");
      console.error("Error generating clearance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Clearance</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="semesterId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Semester:
          </label>
          <select
            id="semesterId"
            value={semesterId}
            onChange={handleSemesterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Clearance
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}

export default ClearanceGenerationPage;
