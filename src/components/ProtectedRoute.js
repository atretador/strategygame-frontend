import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom"; // use Navigate instead of Redirect

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Element /> // If authenticated, render the component
        ) : (
          <Navigate to="/login" /> // If not authenticated, redirect to login
        )
      }
    />
  );
};

export default ProtectedRoute;