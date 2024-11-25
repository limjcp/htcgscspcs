"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/withAuth";

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

interface Office {
  id: string;
  name: string;
  departments: Department[];
  staff: { user: User }[];
  signatory: { user: User }[];
}

function Office() {
  const router = useRouter();
  const [offices, setOffices] = useState<Office[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [personnel, setPersonnel] = useState<User[]>([]);
  const [positions, setPositions] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [currentOffice, setCurrentOffice] = useState<Office | null>(null);
  const [name, setName] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [currentStaff, setCurrentStaff] = useState<string | null>(null);
  const [currentSignatory, setCurrentSignatory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepartmentBased, setIsDepartmentBased] = useState(false);
  const [staffPosition, setStaffPosition] = useState<string | null>(null);
  const [signatoryPosition, setSignatoryPosition] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchOffices();
    fetchDepartments();
    fetchPersonnel();
    fetchPositions(); // Fetch positions from the database
  }, []);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/offices");
      const data = await response.json();
      console.log("Fetched offices data:", data); // Debugging statement
      // Map the data to use 'departments' instead of 'Department'
      const mappedData = data.map((office: any) => ({
        ...office,
        departments: office.Department,
      }));
      setOffices(Array.isArray(mappedData) ? mappedData : []);
    } catch (error) {
      console.error("Failed to fetch offices:", error);
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/departments");
      const data = await response.json();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      setDepartments([]);
    }
  };

  const fetchPersonnel = async () => {
    try {
      const response = await fetch("/api/users?role=personnel");
      const data = await response.json();
      // Filter users to include only those with a single role of 'personnel'
      const filteredData = data.filter(
        (user: any) => user.role.length === 1 && user.role[0] === "personnel"
      );
      setPersonnel(Array.isArray(filteredData) ? filteredData : []);
    } catch (error) {
      console.error("Failed to fetch personnel:", error);
      setPersonnel([]);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await fetch("/api/admin/positions");
      const data = await response.json();
      setPositions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch positions:", error);
      setPositions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentOffice ? "PUT" : "POST";
    const url = currentOffice
      ? `/api/offices/${currentOffice.id}`
      : "/api/offices";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        departmentIds: isDepartmentBased ? selectedDepartments : [],
        isDepartmentBased,
      }),
    });

    if (response.ok) {
      alert(`Office ${currentOffice ? "updated" : "created"} successfully!`);
      setName("");
      setCurrentOffice(null);
      setSelectedDepartments([]);
      setIsDepartmentBased(false);
      fetchOffices();
      setIsModalOpen(false);
      if (!isDepartmentBased) {
        await handleAssignPersonnel(); // Call handleAssignPersonnel after office is created/updated
      }
      await handleSaveOffice(); // Call handleSaveOffice after office is created/updated
    } else {
      alert(`Failed to ${currentOffice ? "update" : "create"} office.`);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/offices/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("Office deleted successfully!");
      fetchOffices();
    } else {
      alert("Failed to delete office.");
    }
  };

  const handleEdit = (office: Office) => {
    setCurrentOffice(office);
    setName(office.name);
    setIsDepartmentBased(office.isDepartmentBased || false);
    setSelectedDepartments(
      office.departments
        ? office.departments.map((department) => department.id)
        : []
    );
    setCurrentStaff(
      office.staff && office.staff.length > 0 ? office.staff[0].user.id : null
    );
    setCurrentSignatory(
      office.signatory && office.signatory.length > 0
        ? office.signatory[0].user.id
        : null
    );
    setStaffPosition(null); // Reset staff position
    setSignatoryPosition(null); // Reset signatory position
    setIsModalOpen(true);
  };

  const handleAssignPersonnel = async () => {
    const assignOrUpdate = async (
      type: string,
      userId: string,
      position?: string
    ) => {
      const user = personnel.find((p) => p.id === userId);
      const response = await fetch(`/api/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          officeOrDepartmentId: currentOffice?.id,
          type: "office",
          role: type,
          position,
          firstName: user?.firstName,
          middleName: user?.middleName,
          lastName: user?.lastName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to assign ${type}`);
      }
    };

    try {
      if (currentStaff) {
        await assignOrUpdate("staff", currentStaff, staffPosition || undefined);
      }
      if (currentSignatory) {
        await assignOrUpdate(
          "signatory",
          currentSignatory,
          signatoryPosition || undefined
        );
      }
      alert("Personnel assigned successfully!");
      fetchOffices();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAssignDepartment = async () => {
    const assignOrUpdate = async (type: string, userId: string) => {
      const response = await fetch(`/api/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          officeOrDepartmentId: currentDepartment?.id,
          type: "department",
          role: type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to assign ${type}`);
      }
    };

    try {
      if (currentStaff) {
        await assignOrUpdate("staff", currentStaff);
      }
      if (currentSignatory) {
        await assignOrUpdate("signatory", currentSignatory);
      }
      alert("Personnel assigned successfully!");
      fetchDepartments();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSaveOffice = async () => {
    const assignDepartments = async (
      officeId: string,
      departmentIds: string[]
    ) => {
      const response = await fetch(`/api/assign-departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          officeId,
          departmentIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign departments");
      }
    };

    try {
      if (currentOffice) {
        await assignDepartments(currentOffice.id, selectedDepartments);
        alert("Departments assigned successfully!");
        fetchOffices();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPersonnel = async () => {
    const removePersonnel = async (type: string, userId: string) => {
      const response = await fetch(`/api/remove-personnel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          officeOrDepartmentId: currentOffice?.id,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove ${type}`);
      }
    };

    const updateUserRole = async (userId: string, role: string) => {
      const response = await fetch(`/api/update-user-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user role to ${role}`);
      }
    };

    try {
      if (currentStaff) {
        await removePersonnel("staff", currentStaff);
        await updateUserRole(currentStaff, "personnel");
        setCurrentStaff(null);
      }
      if (currentSignatory) {
        await removePersonnel("signatory", currentSignatory);
        await updateUserRole(currentSignatory, "personnel");
        setCurrentSignatory(null);
      }

      // Update the current office state to remove the staff and signatory
      if (currentOffice) {
        const updatedOffice = {
          ...currentOffice,
          staff: [],
          signatory: [],
        };
        setCurrentOffice(updatedOffice);
        setOffices((prevOffices) =>
          prevOffices.map((office) =>
            office.id === currentOffice.id ? updatedOffice : office
          )
        );
      }

      alert("Personnel roles reset successfully!");
      fetchOffices();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setName("");
    setCurrentOffice(null);
    setSelectedDepartments([]);
    setCurrentStaff(null);
    setCurrentSignatory(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen  mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Offices</h2>
        <div>
          <button
            onClick={() => router.push("/admin-personnel")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Register Personnel
          </button>
          <button
            onClick={() => {
              setCurrentOffice(null);
              setName("");
              setSelectedDepartments([]);
              setIsModalOpen(true);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            + Add Office
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Office
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Departments
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Staff
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Signatories
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.id}>
                <td className="px-6 py-4 border border-gray-300">
                  {office.name}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {office.departments
                    ?.map((department) => department.name)
                    .join(", ") || " "}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {office.staff
                    ?.map(({ user }) =>
                      user ? `${user.firstName} ${user.lastName}` : "No user"
                    )
                    .join(", ") || " "}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {office.signatory
                    ?.map(({ user }) =>
                      user ? `${user.firstName} ${user.lastName}` : "No user"
                    )
                    .join(", ") || " "}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  <button
                    onClick={() => handleEdit(office)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    aria-label={`Edit ${office.name}`}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(office.id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Delete ${office.name}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {currentOffice ? "Edit Office" : "Create New Office"}
              </h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Office Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="isDepartmentBased"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Is Department Based
                  </label>
                  <input
                    type="checkbox"
                    id="isDepartmentBased"
                    checked={isDepartmentBased}
                    onChange={(e) => setIsDepartmentBased(e.target.checked)}
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                {isDepartmentBased ? (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Assign Departments
                    </h4>
                    {departments.map((department) => (
                      <div
                        key={department.id}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="checkbox"
                          id={`department-${department.id}`}
                          checked={selectedDepartments.includes(department.id)}
                          onChange={(e) => {
                            setSelectedDepartments((prev) =>
                              e.target.checked
                                ? [...prev, department.id]
                                : prev.filter((id) => id !== department.id)
                            );
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`department-${department.id}`}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {department.name}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Assign Personnel
                      </h4>
                      <select
                        value={currentStaff || ""}
                        onChange={(e) =>
                          setCurrentStaff(
                            e.target.value ? e.target.value : null
                          )
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select staff (optional)</option>
                        {personnel.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.firstName} {p.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="staffPosition"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Staff Position
                      </label>
                      <select
                        id="staffPosition"
                        value={staffPosition || ""}
                        onChange={(e) => setStaffPosition(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select position</option>
                        {positions.map((position) => (
                          <option key={position.id} value={position.id}>
                            {position.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <select
                        value={currentSignatory || ""}
                        onChange={(e) =>
                          setCurrentSignatory(
                            e.target.value ? e.target.value : null
                          )
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select signatory</option>
                        {personnel.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.firstName} {p.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="signatoryPosition"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Signatory Position
                      </label>
                      <select
                        id="signatoryPosition"
                        value={signatoryPosition || ""}
                        onChange={(e) => setSignatoryPosition(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select position</option>
                        {positions.map((position) => (
                          <option key={position.id} value={position.id}>
                            {position.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {currentOffice ? "Save Changes" : "Create Office"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPersonnel}
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Reset Personnel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(Office, ["admin"]);
