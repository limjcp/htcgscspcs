"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import AssignModal from "./AssignModal"; // Adjust the import path as needed

interface Staff {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface Signatory {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface Office {
  id: string;
  name: string;
  staff: { user: Staff }[];
  signatory: { user: Signatory }[];
}

interface Department {
  id: string;
  name: string;
  staff: { user: Staff }[];
  signatory: { user: Signatory }[];
}

const OfficesDepartmentsPage = () => {
  const [data, setData] = useState<{
    offices: Office[];
    departments: Department[];
  } | null>(null);
  const [selection, setSelection] = useState<"offices" | "departments" | "">(
    ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfficeOrDepartmentId, setSelectedOfficeOrDepartmentId] =
    useState<string>("");
  const [type, setType] = useState<"office" | "department">("office");
  const [currentStaff, setCurrentStaff] = useState<string | null>(null);
  const [currentSignatory, setCurrentSignatory] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/offices-departments")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleReset = async (officeId: string, entityType: string) => {
    try {
      const response = await axios.delete("/api/assign-officers", {
        data: {
          entityId: officeId,
          entityType: entityType,
        },
      });

      if (response.status === 200) {
        alert("Officers reset successfully");
        fetchData(); // Refresh the data to reflect changes
      }
    } catch (error) {
      console.error("Error resetting officers:", error);
      alert("Failed to reset officers");
    }
  };

  const handleAssignClick = (
    id: string,
    entityType: "office" | "department"
  ) => {
    setSelectedOfficeOrDepartmentId(id);
    setType(entityType);

    const entity = data[
      entityType === "office" ? "offices" : "departments"
    ].find((item) => item.id === id);

    if (entity) {
      setCurrentStaff(entity.staff.length > 0 ? entity.staff[0].user.id : null);
      setCurrentSignatory(
        entity.signatory.length > 0 ? entity.signatory[0].user.id : null
      );
    }

    setIsModalOpen(true);
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Offices and Departments</h1>

      <div className="mb-6">
        <label className="mr-4">Select:</label>
        <select
          value={selection}
          onChange={(e) =>
            setSelection(e.target.value as "offices" | "departments" | "")
          }
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Please select</option>
          <option value="offices">Offices</option>
          <option value="departments">Departments</option>
        </select>
      </div>

      {selection === "" && <div>Please select an option to view the data.</div>}

      <div className="min-h-[400px]">
        {" "}
        {/* Set a minimum height for the table container */}
        {selection === "offices" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Offices</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                      Office Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                      Staff
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                      Signatories
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.offices.map((office) => (
                    <tr key={office.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                        {office.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                        {office.staff.map(({ user }) => (
                          <div key={user.id}>
                            {user.firstName} {user.middleName} {user.lastName}
                          </div>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                        {office.signatory.map(({ user }) => (
                          <div key={user.id}>
                            {user.firstName} {user.middleName} {user.lastName}
                          </div>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-left">
                        <button
                          onClick={() => handleAssignClick(office.id, "office")}
                          className={`px-4 py-2 rounded ${
                            office.staff.length > 0 &&
                            office.signatory.length > 0
                              ? "bg-gray-500 text-white cursor-not-allowed"
                              : "bg-blue-500 text-white"
                          }`}
                          disabled={
                            office.staff.length > 0 &&
                            office.signatory.length > 0
                          }
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => handleReset(office.id, "office")}
                          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                        >
                          Reset
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {selection === "departments" && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Departments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                      Department Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                      Staff
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left border-r">
                      Signatories
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.departments.map((department) => (
                    <tr key={department.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                        {department.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                        {department.staff.map(({ user }) => (
                          <div key={user.id}>
                            {user.firstName} {user.middleName} {user.lastName}
                          </div>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-left border-r">
                        {department.signatory.map(({ user }) => (
                          <div key={user.id}>
                            {user.firstName} {user.middleName} {user.lastName}
                          </div>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-left">
                        <button
                          onClick={() =>
                            handleAssignClick(department.id, "department")
                          }
                          className={`px-4 py-2 rounded ${
                            department.staff.length > 0 &&
                            department.signatory.length > 0
                              ? "bg-gray-500 text-white cursor-not-allowed"
                              : "bg-blue-500 text-white"
                          }`}
                          disabled={
                            department.staff.length > 0 &&
                            department.signatory.length > 0
                          }
                        >
                          Assign
                        </button>
                        <button
                          onClick={() =>
                            handleReset(department.id, "department")
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                        >
                          Reset
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

      <AssignModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchData(); // Refresh the data after closing the modal
        }}
        officeOrDepartmentId={selectedOfficeOrDepartmentId}
        type={type}
        currentStaff={currentStaff}
        currentSignatory={currentSignatory}
      />
    </div>
  );
};

export default OfficesDepartmentsPage;
