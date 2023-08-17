import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

const ProtectedAdminRoute = ({ children }) => {
  const { userData, setUserData } = useUserContext();
  console.log(userData);
  return userData.exists === true && userData.user.id === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedAdminRoute;
