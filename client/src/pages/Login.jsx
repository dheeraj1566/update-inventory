import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Instance from "../AxiosConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Instance.post("/auth/login", { email, password },{withCredentials: true});

      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/inventory-table");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-blue-900 text-center my-10">Login</h1>
      <div className="bg-blue-100 shadow-2xl rounded-2xl text-center w-full max-w-md mx-auto px-10 py-8">
        <div className="text-4xl bg-blue-300 m-auto my-3 rounded-full w-20 h-20 flex justify-center items-center">
          <FaUser />
        </div>

        <h1 className="text-2xl text-blue-950 py-3">Inventory Management System</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-blue-950 font-bold">Email ID</label>
            <input
              type="email"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-blue-200 px-4 w-full py-3 text-black rounded-lg focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div className="text-left">
            <label className="block text-blue-950 font-bold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-blue-200 px-4 w-full py-3 rounded-lg focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white w-full rounded-3xl py-3 hover:bg-blue-500 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-blue-900 my-3">Don't have an account?</p>
        <Link to="/signUp">
          <button
            className="bg-blue-900 text-white w-full rounded-3xl py-3 hover:bg-blue-950 transition"
            disabled={loading}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </>
  );
}

export default Login;
