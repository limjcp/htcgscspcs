"use client";
import React, { useState, useEffect } from "react";

const Semester = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSemesters = async () => {
    try {
      const response = await fetch("/api/semesters");
      const data = await response.json();
      if (Array.isArray(data)) {
        setSemesters(data);
      } else {
        console.error("API response is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleAction = async (id, action) => {
    const response = await fetch(`/api/semesters/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    if (response.ok) {
      alert(`Semester ${action} successfully!`);
      fetchSemesters();
    } else {
      alert(`Failed to ${action} semester.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Semesters</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {semesters.map((semester) => (
                <tr key={semester.id}>
                  <td className="py-2 px-4 border-b">{semester.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(semester.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(semester.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{semester.status}</td>
                  <td className="py-2 px-4 border-b">
                    {semester.status === "NULL" && (
                      <button
                        onClick={() => handleAction(semester.id, "start")}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Start
                      </button>
                    )}
                    {semester.status === "ONGOING" && (
                      <button
                        onClick={() => handleAction(semester.id, "end")}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        End
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Semester;
