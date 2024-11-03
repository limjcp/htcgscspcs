"use client";
import { useState, useEffect } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState({ users: [], offices: [], departments: [] });
  const [form, setForm] = useState({
    userId: "",
    officeId: "",
    departmentId: "",
    appointmentDate: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Appointed To</th>
            <th className="py-2 px-4 border-b">Appointment Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">
                {appointment.user?.firstName} {appointment.user?.lastName}
              </td>
              <td className="py-2 px-4 border-b">
                {appointment.office
                  ? `${appointment.office.name} Office`
                  : `${appointment.department.name} Department`}
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
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setModalIsOpen(true)}
      >
        Add Appointment
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create Appointment</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <label className="block text-gray-700">Office</label>
                <select
                  name="officeId"
                  value={form.officeId}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Office</option>
                  {data.offices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Department</label>
                <select
                  name="departmentId"
                  value={form.departmentId}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Department</option>
                  {data.departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Appointment Date</label>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
