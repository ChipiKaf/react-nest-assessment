// ProtectedRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store/store"; // adjust the import path as needed

/**
 * Protected routes, can only be accessed by authenticated users
 */
const ProtectedRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isAuthenticated && user.status !== "pending") {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
