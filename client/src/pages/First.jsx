import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Login from "../pages/Login";
import { Outlet } from "react-router-dom";

function First() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-white-100">
      <Dashboard />
      <main className="min-h-screen w-full bg-gray-300">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default First;
