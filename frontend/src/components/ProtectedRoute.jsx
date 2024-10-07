import React from "react";
import { Navigate } from "react-router-dom";

// Helper function to decode JWT without using a library
const decodeToken = (token) => {
  const payload = token.split(".")[1]; // Get the payload part of the JWT
  const decodedPayload = JSON.parse(atob(payload)); // Decode it from Base64
  return decodedPayload;
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = decodeToken(token); // Decode the token manually
    const currentTime = Date.now() / 1000; // Get current time in seconds

    // Check if the token is expired
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token"); // Remove expired token
      return false;
    }

    return true; // Token is valid
  } catch (error) {
    return false; // Token is invalid
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
