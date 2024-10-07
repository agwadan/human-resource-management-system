import React, { useState } from "react";
import { registerAdmin } from "../services/staffService"; // Import the updated registerAdmin function

const RegisterAdmin = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [message, setMessage] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await registerAdmin(employeeNumber);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      setMessage(response.message); // Success message
      setGeneratedPassword(response.admin.generatedPassword); // Display the generated password
      setError(""); // Clear any error messages
    } catch (err) {
      setMessage(""); // Clear any success messages
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
