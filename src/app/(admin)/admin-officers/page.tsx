"use client";
import prisma from "@/lib/prisma";
import { useState } from "react";
import React from "react";

export default async function OfficeTable() {
  const [editingOffice, setEditingOffice] = useState(null);

  // Fetch offices, staff, and signatories
  const offices = await prisma.office.findMany({
    include: {
      staff: {
        include: {
          user: true,
        },
      },
      signatory: {
        include: {
          user: true,
        },
      },
    },
  });

  // Handle edit button click
  const handleEditClick = (office) => {
    console.log("Edit button clicked for office:", office.name);
    setEditingOffice(office);
  };

  // Form submission handler
  const handleFormSubmit = async (e, officeId, roleType) => {
    e.preventDefault();
    const newUserId = e.target.newUserId.value;

    await fetch("/api/assign-user", {
      method: "POST",
      body: JSON.stringify({
        officeId,
        newUserId,
        roleType, // Either 'staff' or 'signatory'
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // After submitting the form, reset editing state
    setEditingOffice(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Offices, Staff, and Signatories
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Office Name</th>
              <th className="border border-gray-300 px-4 py-2">Staff Names</th>
              <th className="border border-gray-300 px-4 py-2">
                Signatory Names
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {office.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {office.staff.map((staff) => staff.user.name).join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {office.signatory
                    .map((signatory) => signatory.user.name)
                    .join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditClick(office)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditional Form for Editing */}
      {editingOffice && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">
            Edit Office: {editingOffice.name}
          </h2>
          <form
            onSubmit={(e) => handleFormSubmit(e, editingOffice.id, "staff")}
            className="mt-4"
          >
            <label className="block text-gray-700 font-bold mb-2">
              New Staff Member ID:
            </label>
            <input
              name="newUserId"
              className="border border-gray-300 px-4 py-2 w-full mb-4"
              type="text"
              placeholder="Enter user ID"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Assign Staff
            </button>
          </form>

          <form
            onSubmit={(e) => handleFormSubmit(e, editingOffice.id, "signatory")}
            className="mt-4"
          >
            <label className="block text-gray-700 font-bold mb-2">
              New Signatory Member ID:
            </label>
            <input
              name="newUserId"
              className="border border-gray-300 px-4 py-2 w-full mb-4"
              type="text"
              placeholder="Enter user ID"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Assign Signatory
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
