import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import RegisterStaffSignatory from "./RegisterStaffSignatory";

interface Personnel {
  id: string;
  name: string;
  email: string;
  username: string;
}

const PersonnelList: React.FC = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const response = await axios.get("/api/personnel");
      setPersonnel(response.data);
    } catch (error) {
      setMessage("Error fetching personnel list.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/personnel/${id}`);
      setMessage("Personnel deleted successfully.");
      fetchPersonnel(); // Refresh the list
    } catch (error) {
      setMessage("Error deleting personnel.");
    }
  };

  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Personnel List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Personnel
        </button>
      </div>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Username</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((person) => (
              <tr key={person.id}>
                <td className="py-2 px-4 border-b text-center">
                  {person.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {person.email}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {person.username}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RegisterStaffSignatory onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default PersonnelList;
