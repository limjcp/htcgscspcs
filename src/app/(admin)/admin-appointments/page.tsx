"use client";
import { withAuth } from "@/withAuth";
import { useState, useEffect } from "react";
import React from "react";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState({ users: [], offices: [], departments: [] });
  const [form, setForm] = useState({
    userId: "",
    officeId: "",
    departmentId: "",
    appointmentDate: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resignModalIsOpen, setResignModalIsOpen] = useState(false);
  const [resignForm, setResignForm] = useState({
    appointmentId: "",
    resignationDate: "",
  });
  const [error, setError] = useState("");
  const [appointTo, setAppointTo] = useState(""); // New state to track whether appointing to office or department
  const [filter, setFilter] = useState({
    officeId: "",
    startDate: "",
    endDate: "",
  });
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));

    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResignChange = (e) => {
    setResignForm({ ...resignForm, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (form.officeId && form.departmentId) ||
      (!form.officeId && !form.departmentId)
    ) {
      setError("Please select either an office or a department, but not both.");
      return;
    }
    setError("");

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const newAppointment = await res.json();
    setAppointments([...appointments, newAppointment]);
    setModalIsOpen(false);
  };

  const handleResignSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting resignation:", resignForm);
    const res = await fetch(`/api/appointments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: resignForm.appointmentId,
        resignationDate: resignForm.resignationDate,
      }),
    });

    const text = await res.text();
    console.log("Response text:", text);

    try {
      const updatedAppointment = JSON.parse(text);
      console.log("Updated appointment:", updatedAppointment);
      setAppointments(
        appointments.map((app) =>
          app.id === updatedAppointment.id ? updatedAppointment : app
        )
      );
      setResignModalIsOpen(false);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      setError("Failed to resign appointment. Please try again.");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesOffice = filter.officeId
      ? appointment.office?.id === filter.officeId
      : true;
    const matchesDateRange =
      filter.startDate && filter.endDate
        ? new Date(appointment.appointmentDate) >= new Date(filter.startDate) &&
          new Date(appointment.appointmentDate) <= new Date(filter.endDate)
        : true;

    return matchesOffice && matchesDateRange;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          setAppointTo(""); // Reset appointTo state
          setModalIsOpen(true);
        }}
      >
        Add Appointment
      </button>
      <button
        className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>
      {showFilter && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4">Filter Appointments</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Select Office</label>
            <select
              name="officeId"
              value={filter.officeId}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="">All Offices</option>
              {data.offices.map((office) => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Personnel</th>
            <th className="py-2 px-4 border-b">Appointed To</th>
            <th className="py-2 px-4 border-b">Appointment Date</th>
            <th className="py-2 px-4 border-b">Resignation Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">
                {appointment.user?.firstName} {appointment.user?.lastName}
              </td>
              <td className="py-2 px-4 border-b">
                {appointment.office
                  ? `${appointment.office.name} Office`
                  : appointment.department
                  ? `${appointment.department.name} Department`
                  : "No department assigned"}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {appointment.resignationDate
                  ? new Date(appointment.resignationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className={`px-4 py-2 rounded ${
                    appointment.resignationDate ? "bg-gray-500" : "bg-red-500"
                  } text-white`}
                  onClick={() => {
                    setResignForm({
                      appointmentId: appointment.id,
                      resignationDate: "",
                    });
                    setResignModalIsOpen(true);
                  }}
                  disabled={!!appointment.resignationDate} // Disable button if resignation date exists
                >
                  {appointment.resignationDate ? "Resigned" : "Resign"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create Appointment</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              {!appointTo ? (
                <div className="mb-4">
                  <label className="block text-gray-700">Appoint To</label>
                  <select
                    name="appointTo"
                    value={appointTo}
                    onChange={(e) => setAppointTo(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Office or Department</option>
                    <option value="office">Office</option>
                    <option value="department">Department</option>
                  </select>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">User</label>
                    <select
                      name="userId"
                      value={form.userId}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select User</option>
                      {data.users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      {appointTo === "office"
                        ? "Select Office"
                        : "Select Department"}
                    </label>
                    <select
                      name={
                        appointTo === "office" ? "officeId" : "departmentId"
                      }
                      value={
                        appointTo === "office"
                          ? form.officeId
                          : form.departmentId
                      }
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border border-gray-300 rounded"
                    >
                      <option value="">
                        {appointTo === "office"
                          ? "Select Office"
                          : "Select Department"}
                      </option>
                      {appointTo === "office"
                        ? data.offices.map((office) => (
                            <option key={office.id} value={office.id}>
                              {office.name}
                            </option>
                          ))
                        : data.departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={form.appointmentDate}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Create Appointment
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {resignModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Resign Appointment</h2>
            <form onSubmit={handleResignSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Resignation Date</label>
                <input
                  type="date"
                  name="resignationDate"
                  value={resignForm.resignationDate}
                  onChange={handleResignChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setResignModalIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Confirm Resignation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default withAuth(AppointmentsPage, ["admin"]);
