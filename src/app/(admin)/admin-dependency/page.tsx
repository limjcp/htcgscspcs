// /admin-dependency/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getOfficesWithDependencies } from "@/pages/api/officeService";
import EditDependenciesModal from "./EditDependenciesModal";

interface Office {
  id: string;
  name: string;
  dependencies: {
    required: {
      id: string;
      name: string;
    };
  }[];
  dependentOn: {
    required: {
      id: string;
      name: string;
    };
  }[];
}

const AdminDependencyPage: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [editingOfficeId, setEditingOfficeId] = useState<string | null>(null);

  const fetchOffices = async () => {
    try {
      const data = await getOfficesWithDependencies();
      console.log("Fetched offices with dependencies:", data);
      setOffices(data);
    } catch (error) {
      console.error("Failed to fetch offices", error);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleEditDependencies = (officeId: string) => {
    setEditingOfficeId(officeId);
  };

  const handleCloseModal = () => {
    setEditingOfficeId(null);
  };

  const handleSave = () => {
    fetchOffices();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Office Dependencies</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Office</th>
            <th className="py-2 px-4 border-b">Dependent On</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office) => (
            <tr key={office.id}>
              <td className="py-2 px-4 border-b">{office.name}</td>
              <td className="py-2 px-4 border-b">
                {office.dependentOn.length > 0
                  ? office.dependentOn
                      .map((dep) => dep.required.name)
                      .join(", ")
                  : "None"}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEditDependencies(office.id)}
                >
                  Edit Dependencies
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingOfficeId && (
        <EditDependenciesModal
          officeId={editingOfficeId}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminDependencyPage;
