import React, { useState } from "react";
import { registerAdmin } from "../../services/adminService";

const RegisterAdmin = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [message, setMessage] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerAdmin(employeeNumber);
      setMessage(response.message);
      setGeneratedPassword(response.admin.generatedPassword);
      setError("");
    } catch (err) {
      setMessage("");
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Admin Registration</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={employeeNumber}
          placeholder="Employee Number"
          onChange={(e) => setEmployeeNumber(e.target.value)}
          required
        />
        <button type="submit">Register Admin</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {generatedPassword && (
        <p>
          <strong>Generated Password:</strong> {generatedPassword}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterAdmin;
