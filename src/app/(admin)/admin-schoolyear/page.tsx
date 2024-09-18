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

  useEffect(() => {
    if (schoolYear.startYear && schoolYear.endYear) {
      const year = `${schoolYear.startYear}-${schoolYear.endYear}`;
      setSchoolYear((prev) => ({
        ...prev,
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
  }, [schoolYear.startYear, schoolYear.endYear]);

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
      const response = await axios.post("/api/schoolyear", schoolYear);
      setSchoolYears((prev) => [...prev, response.data]);
      alert("School year registered successfully");
    } catch (error) {
      console.error("Error registering school year:", error);
      alert("Failed to register school year");
    }
  };

  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get("/api/schoolyear");
        setSchoolYears(response.data);
      } catch (error) {
        console.error("Error fetching school years:", error);
      }
    };

    fetchSchoolYears();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mb-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Register School Year</h2>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700">End Year:</label>
            <input
              type="number"
              name="endYear"
              value={schoolYear.endYear}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">School Years</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">1st Semester</th>
              <th className="py-2 px-4 border-b">2nd Semester</th>
            </tr>
          </thead>
          <tbody>
            {schoolYears.map((sy) => {
              const firstSemester = sy.semesters.find((sem) =>
                sem.name.startsWith("1st Semester")
              );
              const secondSemester = sy.semesters.find((sem) =>
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
                      ? new Date(secondSemester.startDate).toLocaleDateString()
                      : "N/A"}{" "}
                    -{" "}
                    {secondSemester?.endDate
                      ? new Date(secondSemester.endDate).toLocaleDateString()
                      : "N/A"}
                    )
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterSchoolYear;
