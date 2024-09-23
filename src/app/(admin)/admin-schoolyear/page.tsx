"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

interface Semester {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface SchoolYear {
  id: number;
  startYear: string;
  endYear: string;
  year: string;
  semesters: Semester[];
}

const RegisterSchoolYear: React.FC = () => {
  const [schoolYear, setSchoolYear] = useState<SchoolYear>({
    id: 0,
    startYear: "",
    endYear: "",
    year: "",
    semesters: [],
  });

  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add state for loading

  useEffect(() => {
    if (schoolYear.startYear) {
      const endYear = (parseInt(schoolYear.startYear) + 1).toString();
      const year = `${schoolYear.startYear}-${endYear}`;
      setSchoolYear((prev) => ({
        ...prev,
        endYear,
        year,
        semesters: [
          {
            ...prev.semesters[0],
            name: `1st Semester ${year}`,
          },
          {
            ...prev.semesters[1],
            name: `2nd Semester ${year}`,
          },
        ],
      }));
    }
  }, [schoolYear.startYear]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchoolYear((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSemesterChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedSemesters = [...schoolYear.semesters];
    updatedSemesters[index] = {
      ...updatedSemesters[index],
      [name]: value,
    };
    setSchoolYear((prev) => ({
      ...prev,
      semesters: updatedSemesters,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting school year:", schoolYear); // Log the request payload
      const response = await axios.post("/api/schoolyear", schoolYear);
      setSchoolYears((prev) => [...prev, response.data]);
      setIsModalOpen(false);
      alert("School year registered successfully");
    } catch (error) {
      console.error("Error registering school year:", error);
      alert("Failed to register school year");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/schoolyear`, { data: { id: id.toString() } });
      setSchoolYears((prev) => prev.filter((sy) => sy.id !== id));
      alert("School year deleted successfully");
    } catch (error) {
      console.error("Error deleting school year:", error);
      alert("Failed to delete school year");
    }
  };

  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get("/api/schoolyear");
        setSchoolYears(response.data);
      } catch (error) {
        console.error("Error fetching school years:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    fetchSchoolYears();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">School Years</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Add School Year
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Year</th>
                <th className="py-2 px-4 border-b">1st Semester</th>
                <th className="py-2 px-4 border-b">2nd Semester</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schoolYears.map((sy) => {
                const firstSemester = sy.semesters?.find((sem) =>
                  sem.name.startsWith("1st Semester")
                );
                const secondSemester = sy.semesters?.find((sem) =>
                  sem.name.startsWith("2nd Semester")
                );
                return (
                  <tr key={sy.id}>
                    <td className="py-2 px-4 border-b">{sy.year}</td>
                    <td className="py-2 px-4 border-b">
                      {firstSemester?.name} (
                      {firstSemester?.startDate
                        ? new Date(firstSemester.startDate).toLocaleDateString()
                        : "N/A"}{" "}
                      -{" "}
                      {firstSemester?.endDate
                        ? new Date(firstSemester.endDate).toLocaleDateString()
                        : "N/A"}
                      )
                    </td>
                    <td className="py-2 px-4 border-b">
                      {secondSemester?.name} (
                      {secondSemester?.startDate
                        ? new Date(
                            secondSemester.startDate
                          ).toLocaleDateString()
                        : "N/A"}{" "}
                      -{" "}
                      {secondSemester?.endDate
                        ? new Date(secondSemester.endDate).toLocaleDateString()
                        : "N/A"}
                      )
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(sy.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Register School Year</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Start Year:</label>
                  <input
                    type="number"
                    name="startYear"
                    value={schoolYear.startYear}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">End Year:</label>
                  <input
                    type="text"
                    name="endYear"
                    value={schoolYear.endYear}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Year:</label>
                <input
                  type="text"
                  name="year"
                  value={schoolYear.year}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {schoolYear.semesters[0]?.name}
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={schoolYear.semesters[0]?.startDate || ""}
                  onChange={(e) => handleSemesterChange(e, 0)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={schoolYear.semesters[0]?.endDate || ""}
                  onChange={(e) => handleSemesterChange(e, 0)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {schoolYear.semesters[1]?.name}
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={schoolYear.semesters[1]?.startDate || ""}
                  onChange={(e) => handleSemesterChange(e, 1)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={schoolYear.semesters[1]?.endDate || ""}
                  onChange={(e) => handleSemesterChange(e, 1)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterSchoolYear;
