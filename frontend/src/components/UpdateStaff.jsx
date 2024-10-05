import React, { useState } from "react";
import { updateStaff } from "../services/staffService";

const UpdateStaff = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staffData, setStaffData] = useState({ dateOfBirth: "", idPhoto: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateStaff(employeeNumber.trim(), staffData);
      setMessage("Staff updated successfully");
    } catch (error) {
      setMessage("Failed to update staff");
    }
  };

  return (
    <div>
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
      />
      <input
        type="text"
        name="idPhoto"
        placeholder="ID Photo (Base64)"
        value={staffData.idPhoto}
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update Staff</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateStaff;
