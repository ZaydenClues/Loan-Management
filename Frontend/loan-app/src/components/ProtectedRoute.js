import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData, setUserData } = useUserContext();
  console.log("ProtectedRoute", userData);
  return userData.exists ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
