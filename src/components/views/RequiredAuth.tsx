import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthState"; // Custom hook for authentication context
import React, { JSX } from "react";

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they sign in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
