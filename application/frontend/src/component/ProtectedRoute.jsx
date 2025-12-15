import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) return null;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
