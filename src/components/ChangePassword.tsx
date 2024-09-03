"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChangePassword() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to change your password.");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      alert("Password changed successfully");
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } else {
      alert("Error changing password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <label
          htmlFor="oldPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Old Password:
        </label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <br />
        <br />

        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <br />
        <br />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
