import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/staffService";

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
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>Total Requests: {metrics.totalRequests}</p>
        <p>Successful Requests: {metrics.successfulRequests}</p>
        <p>Failed Requests: {metrics.failedRequests}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
