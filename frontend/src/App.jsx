import React from "react";
import RegisterStaff from "./components/RegisterStaff";
import RetrieveStaff from "./components/RetrieveStaff";
import UpdateStaff from "./components/UpdateStaff";

function App() {
  return (
    <div>
      <h1>Staff Management</h1>
      <RegisterStaff />
      <RetrieveStaff />
      <UpdateStaff />
    </div>
  );
}

export default App;
