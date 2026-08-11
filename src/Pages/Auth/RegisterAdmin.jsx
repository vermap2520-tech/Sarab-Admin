import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterAdmin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/registerAdmin",
        {
          fullname: admin.fullname,
          email: admin.email,
          password: admin.password,
        }
      );

      localStorage.setItem("admin", JSON.stringify(res.data.data));

      alert("Admin Registered Successfully!");

      setAdmin({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/adminLogin");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error in registering admin");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register Admin</h2>
        <p>Create your admin account</p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={admin.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={admin.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={admin.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="register-btn" type="submit">
            Register Admin
          </button>

          <p className="login-text">
            Already have an account?
            <span onClick={() => navigate("/adminLogin")}> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}