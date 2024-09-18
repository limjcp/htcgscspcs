"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterStaffSignatory = () => {
  const [offices, setOffices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: "staff", // default role
    officeId: "",
    password: "123", // default password
  });

  useEffect(() => {
    // Fetch offices from the database
    axios.get("/api/personneloffice").then((response) => {
      setOffices(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      username: name === "email" ? value.split("@")[0] : prevData.username,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.name || !formData.email || !formData.officeId) {
      alert("Please fill in all fields");
      return;
    }

    // Send request to backend to create user and assign to office
    axios
      .post("/api/registerpersonnel", formData)
      .then((response) => {
        alert("User registered successfully");
      })
      .catch((error) => {
        alert("Error registering user");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="staff">Staff</option>
          <option value="signatory">Signatory</option>
        </select>
      </div>
      <div>
        <label>Office:</label>
        <select
          name="officeId"
          value={formData.officeId}
          onChange={handleChange}
        >
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterStaffSignatory;
