import React, { useState } from "react";
import { registerStaff } from "../services/staffService";

const RegisterStaff = () => {
  const [staffData, setStaffData] = useState({
    surname: "",
    otherNames: "",
    dateOfBirth: "",
    idPhoto: "",
    authCode: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerStaff(staffData);
      setMessage(
        `Staff Registered! Employee Number: ${response.employeeNumber}`
      );
    } catch (error) {
      setMessage(error.message || "Failed to register staff");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="otherNames"
        placeholder="Other Names"
        onChange={handleChange}
        required
      />
      <input type="date" name="dateOfBirth" onChange={handleChange} required />
      <input
        type="text"
        name="idPhoto"
        placeholder="ID Photo (Base64)"
        onChange={handleChange}
      />
      <input
        type="text"
        name="authCode"
        placeholder="Auth Code"
        onChange={handleChange}
        required
      />
      <button type="submit">Register Staff</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterStaff;
