// pages/admin/positions.tsx
"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "@/withAuth";

interface Signatory {
  id: string;
  firstName: string;
  lastName: string;
}

interface Position {
  id: string;
  name: string;
  signatory: Signatory[];
}

function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPositionName, setNewPositionName] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get("/api/admin/positions");
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const handleCreatePosition = async () => {
    try {
      await axios.post("/api/admin/positions", { name: newPositionName });
      setNewPositionName("");
      setIsModalOpen(false);
      fetchPositions();
    } catch (error) {
      console.error("Error creating position:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Positions</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Create Position
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Signatory</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td className="py-2 px-4 border-b">{position.name}</td>
              <td className="py-2 px-4 border-b">
                {position.signatory.length > 0
                  ? position.signatory
                      .map(
                        (signatory) =>
                          `${signatory.firstName} ${signatory.lastName}`
                      )
                      .join(", ")
                  : "No signatory assigned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Position</h2>
            <input
              type="text"
              className="border p-2 mb-4 w-full"
              placeholder="Position Name"
              value={newPositionName}
              onChange={(e) => setNewPositionName(e.target.value.toUpperCase())}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleCreatePosition}
            >
              Create
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(PositionsPage, ["admin"]);
