import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return null; // Or a loading spinner

  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            isAdmin && user.role !== "admin" ? (
              <Navigate to="/login" />
            ) : (
              <Component />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default ProtectedRoute;