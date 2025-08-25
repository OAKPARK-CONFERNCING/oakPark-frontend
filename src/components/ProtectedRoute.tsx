import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!isAuthenticated || !authToken) {
      // Clear any invalid auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, authToken, navigate]);

  // Only render children if authenticated
  if (!isAuthenticated || !authToken) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
