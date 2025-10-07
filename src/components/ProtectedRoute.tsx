import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication status
  const checkAuthentication = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const authToken = localStorage.getItem("authToken");
    
    // Debug logs to see what's in localStorage
    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoute - authToken:", authToken ? "exists" : "missing");
    
    return isAuthenticated === "true" && authToken && authToken.trim() !== "";
  };
  
  const [isAuth, setIsAuth] = useState(checkAuthentication());

  useEffect(() => {
    const authStatus = checkAuthentication();
    setIsAuth(authStatus);
    
    if (!authStatus) {
      console.log("ProtectedRoute - User not authenticated, redirecting to home");
      // Clear any invalid auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      navigate("/", { replace: true });
    } else {
      console.log("ProtectedRoute - User authenticated, allowing access");
      
      // Load user data into Redux if available
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          console.log("ProtectedRoute - Loading user data into Redux:", userData);
          dispatch(updateUser(userData));
        } catch (error) {
          console.error("ProtectedRoute - Error parsing stored user data:", error);
        }
      }
    }
    
    setIsLoading(false);
  }, [navigate, dispatch]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medium-green"></div>
      </div>
    );
  }

  // Only render children if authenticated
  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
