import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const isLoggedin = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  // If not logged in or not admin, redirect to home or login
  if (!isLoggedin || !isAdmin) {
    return <Navigate to="/" />; // Redirect to the home page
  }

  return children; // If the user is logged in and is an admin, render the children
};

export default PrivateRoute;
