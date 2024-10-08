import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterStaff from "./components/Staff/RegisterStaff";
import RetrieveStaff from "./components/Staff/RetrieveStaff";
import UpdateStaff from "./components/Staff/UpdateStaff";
import AdminDashboard from "./components/Admin/Admin";
import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import RegisterAdmin from "./components/Admin/RegisterAdmin";
import Logo from "/dfcu_logo.png";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div id="app">
        <Navbar />
        <div className="image-container">
          <img src={Logo} />
        </div>
        <Routes>
          <Route path="/" element={<RegisterStaff />} />
          <Route path="/retrieve" element={<RetrieveStaff />} />
          <Route path="/update" element={<UpdateStaff />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login-admin" element={<AdminLogin />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
