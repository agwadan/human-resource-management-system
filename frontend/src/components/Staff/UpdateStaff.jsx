import React, { useState } from "react";
import { updateStaff } from "../../services/staffService";

const UpdateStaff = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staffData, setStaffData] = useState({
    dateOfBirth: "",
    idPhoto: null,
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    /* =======FormData Object to handle upload=========== */
    const formData = new FormData();
    formData.append("dateOfBirth", staffData.dateOfBirth);

    /* =======Appending the image if it exists=========== */
    if (staffData.idPhoto) {
      formData.append("idPhoto", staffData.idPhoto);
    }

    try {
      const response = await updateStaff(employeeNumber.trim(), formData);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      setMessage(response.message);
    } catch (error) {
      setError("Failed to update staff.");
    }
  };

  return (
    <div className="container">
      <h1>Update Staff</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Employee Number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={staffData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="idPhoto"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleUpdate}>Update Staff</button>
        {message && <p>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default UpdateStaff;
