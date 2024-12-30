import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "../api/AuthLogin/verifyLogin.api";

export const PrivateRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthentication = async () => {
    try {
      const isVerified = await verifyUser();
      setIsAuthenticated(isVerified);
    } catch (error) {
      console.error("Error verifying user", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
