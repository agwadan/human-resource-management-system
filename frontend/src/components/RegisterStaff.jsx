import React, { useState } from "react";
import { registerStaff } from "../services/staffService";

const RegisterStaff = () => {
  const [staffData, setStaffData] = useState({
    surname: "",
    otherNames: "",
    dateOfBirth: "",
    idPhoto: null, // This will hold the file directly
    authCode: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStaffData({ ...staffData, idPhoto: file }); // Assign the file directly
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("surname", staffData.surname);
    formData.append("otherNames", staffData.otherNames);
    formData.append("dateOfBirth", staffData.dateOfBirth);
    formData.append("authCode", staffData.authCode);

    // Append the file (image) if present
    if (staffData.idPhoto) {
      formData.append("idPhoto", staffData.idPhoto);
    }

    try {
      // Submit the formData to the backend using the registerStaff function
      const response = await registerStaff(formData);
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

      {/* File input for image upload */}
      <input
        type="file"
        name="idPhoto"
        accept="image/*"
        onChange={handleImageChange}
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
