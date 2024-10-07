import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterStaff from "./components/RegisterStaff";
import RetrieveStaff from "./components/RetrieveStaff";
import UpdateStaff from "./components/UpdateStaff";
import AdminDashboard from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterAdmin from "./components/RegisterAdmin";

function App() {
  return (
    <Router>
      <div>
        <h1>Staff Management</h1>
        <Routes>
          <Route path="/" element={<RegisterStaff />} />
          <Route path="/retrieve" element={<RetrieveStaff />} />
          <Route path="/update" element={<UpdateStaff />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />

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
