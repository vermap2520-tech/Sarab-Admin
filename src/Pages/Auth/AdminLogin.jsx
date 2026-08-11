import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAdmin({
      ...admin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/adminLogin",
        {
          email: admin.email,
          password: admin.password,
        }
      );

      console.log(res.data);
      alert("Admin Logged in Successfully!");
      navigate("/admins");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error in logging in admin");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Welcome Back! Login to continue.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={admin.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="remember-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={admin.remember}
                onChange={handleChange}
              />
              Remember Me
            </label>

            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="signup-text">
          Don't have an account?
          <span onClick={() => navigate("/registerAdmin")}>
            {" "}
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}