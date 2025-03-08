import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // When the component mounts, check if the user is authorized
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      // Attempt to refresh the access token by making an API request with the refresh token
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      // If the refresh is successful, store the new access token and set the user as authorized
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // Function to check the validity of the access token
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // Decode the token to extract its expiration and other details
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // JWT tokens use seconds, not milliseconds

    // If the token is expired, attempt to refresh it
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  // If authorization state is still null, it's checking tokens or refreshing
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // If authorized, render the protected route (children), otherwise redirect to login
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
