"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterStaffSignatory from "./RegisterStaffSignatory";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const PersonnelList = () => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/personnel");
      setPersonnel(response.data);
      setLoading(false);
    } catch (error) {
      setMessage("Error fetching personnel data.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/personnel/${id}`);
      fetchPersonnel();
    } catch (error) {
      setMessage("Error deleting personnel.");
    }
  };

  const handleRegisterSuccess = () => {
    fetchPersonnel();
  };

  const router = useRouter();
  const program = () => {
    router.push("/admin-programs");
  };

  return (
    <div className=" mx-auto p-4 sm:p-6 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center text-gray-800">
        Personnel List
      </h1>

      <div className="flex flex-col sm:flex-row justify-end mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={program}
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow-md transition duration-300"
        >
          Register Program
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow-md transition duration-300"
        >
          + Add Personnel
        </button>
      </div>

      {message && (
        <p className="text-center text-red-600 mb-4 sm:mb-6">{message}</p>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-700">
                  Name
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-700">
                  Email
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-700">
                  Username
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-700">
                  Role
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {personnel.map((person) => (
                <tr
                  key={person.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-800">
                    {person.firstName} {person.lastName}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-800">
                    {person.email}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-800">
                    {person.username}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center text-gray-800">
                    {person.role}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border-b text-center">
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="bg-red-600 hover:bg-red-800 text-white font-semibold py-1 px-2 sm:px-3 rounded-lg shadow-md transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RegisterStaffSignatory
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleRegisterSuccess}
        />
      </Modal>
    </div>
  );
};

export default PersonnelList;
