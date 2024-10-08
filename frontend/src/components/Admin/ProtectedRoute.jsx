import React from "react";
import { Navigate } from "react-router-dom";

// ===== Helper function to decode JWT =======
const decodeToken = (token) => {
  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = decodeToken(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
