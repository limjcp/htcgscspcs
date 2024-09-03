"use client";
import React, { useEffect, useState } from "react";

const StudentRequirements = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch("/api/requirements");
        const data = await response.json();
        setRequirements(data);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      }
    };

    fetchRequirements();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Requirements</h1>
      {requirements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requirements.map(
            ({ description, id, name, office: { name: name1 } }) => (
              <div key={id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">{name1}</h2>
                <p className="text-gray-700">
                  <strong>{name}</strong> - {description}
                </p>
              </div>
            ),
          )}
        </div>
      ) : (
        <p>No requirements found.</p>
      )}
    </div>
  );
};

export default StudentRequirements;
