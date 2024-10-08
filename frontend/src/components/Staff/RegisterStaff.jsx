import React, { useState } from "react";
import { registerStaff } from "../../services/staffService";

const RegisterStaff = () => {
  const [staffData, setStaffData] = useState({
    surname: "",
    otherNames: "",
    dateOfBirth: "",
    idPhoto: null,
    authCode: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStaffData({ ...staffData, idPhoto: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("surname", staffData.surname);
    formData.append("otherNames", staffData.otherNames);
    formData.append("dateOfBirth", staffData.dateOfBirth);
    formData.append("authCode", staffData.authCode);

    if (staffData.idPhoto) {
      formData.append("idPhoto", staffData.idPhoto);
    }

    try {
      const response = await registerStaff(formData);
      setMessage(
        `${staffData.otherNames} ${staffData.surname} Registered Successfully ✅! ${staffData.otherNames}'s Employee Number: ${response.employeeNumber}`
      );
    } catch (error) {
      setError(error.message || "Failed to register staff");
    }
  };

  return (
    <div className="container">
      <h1>Register Staff</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-control">
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
        </div>
        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          required
        />

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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterStaff;
