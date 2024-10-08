import React, { useEffect, useState } from "react";
import { getMetrics } from "../../services/adminService";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getMetrics();
        setMetrics(response);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
        setError("Failed to retrieve metrics.");
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="stats">
        <div className="stat-item">
          <h3>Total Requests</h3>
          <p>{metrics.totalRequests}</p>
        </div>
        <div className="stat-item">
          <h3>Successful Requests</h3>
          <p>{metrics.successfulRequests}</p>
        </div>
        <div className="stat-item">
          <h3>Failed Requests</h3>
          <p> {metrics.failedRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
