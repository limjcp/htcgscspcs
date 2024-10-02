import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterStaffSignatory from "./RegisterStaffSignatory";
import Modal from "./Modal"; // Import the Modal component

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
      fetchPersonnel(); // Refresh the data after deletion
    } catch (error) {
      setMessage("Error deleting personnel.");
    }
  };

  const handleRegisterSuccess = () => {
    fetchPersonnel(); // Refresh the data after successful registration
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Personnel List</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register Personnel
        </button>
      </div>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">Name</th>
                <th className="py-2 px-4 border-b text-center">Email</th>
                <th className="py-2 px-4 border-b text-center">Username</th>
                <th className="py-2 px-4 border-b text-center">Role</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {personnel.map((person) => (
                <tr key={person.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {person.firstName} {person.lastName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {person.email}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {person.username}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {person.role}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
          onSuccess={handleRegisterSuccess} // Pass the success callback
        />
      </Modal>
    </div>
  );
};

export default PersonnelList;
