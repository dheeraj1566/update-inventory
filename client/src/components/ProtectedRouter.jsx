import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Instance from "../AxiosConfig";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log(isAuthenticated);
  useEffect(() => {
    checkForToken();
  }, []);

  async function checkForToken() {
    try {
      setLoading(true);
      const response = await Instance.get("/auth/checkToken", { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <div id="">LOADING...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
