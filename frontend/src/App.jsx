import React from "react";
import RegisterStaff from "./components/RegisterStaff";
import RetrieveStaff from "./components/RetrieveStaff";
import UpdateStaff from "./components/UpdateStaff";
import AdminDashboard from "./components/Admin";

function App() {
  return (
    <div>
      <h1>Staff Management</h1>
      <RegisterStaff />
      <RetrieveStaff />
      <UpdateStaff />
      <AdminDashboard />
    </div>
  );
}

export default App;
