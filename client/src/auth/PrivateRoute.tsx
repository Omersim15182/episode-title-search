import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userVerify } from "../api/authLogin/verifyLogin.api.ts";

export const PrivateRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthentication = async () => {
    try {
      const isVerified = await userVerify();
      setIsAuthenticated(isVerified);
    } catch (error) {
      console.error("Error verifying user", error);
      setIsAuthenticated(false);
      localStorage.setItem("userId", "");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
