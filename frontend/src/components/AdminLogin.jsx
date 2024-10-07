import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/staffService"; // Import the loginAdmin function

const AdminLogin = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(employeeNumber, password);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      const { token } = response; // Get the token from the response
      localStorage.setItem("token", token); // Save the token in localStorage
      navigate("/admin"); // Redirect to the protected admin route
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={employeeNumber}
          placeholder="Employee Number"
          onChange={(e) => setEmployeeNumber(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
