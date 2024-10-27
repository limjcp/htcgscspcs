// /admin-dependency/EditDependenciesModal.tsx
import React, { useState, useEffect } from "react";
import {
  getOffices,
  getOfficesWithDependencies,
  saveOfficeDependencies,
} from "@/pages/api/officeService";

interface EditDependenciesModalProps {
  officeId: string;
  onClose: () => void;
  onSave: () => void;
}

interface Office {
  id: string;
  name: string;
  dependentOn: {
    required: {
      id: string;
      name: string;
    };
  }[];
}

const EditDependenciesModal: React.FC<EditDependenciesModalProps> = ({
  officeId,
  onClose,
  onSave,
}) => {
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(
    []
  );
  const [allOffices, setAllOffices] = useState<Office[]>([]);

  useEffect(() => {
    const fetchOffices = async () => {
      const data = await getOffices();
      setAllOffices(data);
    };

    const fetchOfficeDependencies = async () => {
      const data = await getOfficesWithDependencies();
      const office = data.find((office: Office) => office.id === officeId);
      if (office) {
        setSelectedDependencies(
          office.dependentOn.map((dep) => dep.required.id)
        );
      }
    };

    fetchOffices();
    fetchOfficeDependencies();
  }, [officeId]);

  const handleSave = async () => {
    try {
      await saveOfficeDependencies(officeId, selectedDependencies);
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save dependencies", error);
    }
  };

  const handleCheckboxChange = (dependencyId: string) => {
    setSelectedDependencies((prev) =>
      prev.includes(dependencyId)
        ? prev.filter((id) => id !== dependencyId)
        : [...prev, dependencyId]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Dependencies</h2>
        <div className="mb-4">
          {allOffices.map((office) => (
            <div key={office.id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedDependencies.includes(office.id)}
                  onChange={() => handleCheckboxChange(office.id)}
                />
                {office.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDependenciesModal;
