import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAdmin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullname: "",
    email: "",
    password: "",
    image: "",
    role: "admin",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin.fullname || !admin.email || !admin.password) {
      alert("Please fill all required fields");
      return;
    }

    const fdata = new FormData();
    fdata.append("fullname", admin.fullname);
    fdata.append("email", admin.email);
    fdata.append("password", admin.password);
    fdata.append("role", admin.role);

    if (image) { fdata.append("image", image); }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/addAdmin",
        fdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Admin response:", res.data);
      alert("Admin Added Successfully!");
      setAdmin({
        image: "",
        fullname: "",
        email: "",
        password: "",
        role: "admin",
      });
      setImage(null);

      // Reset file input
      e.target.reset();

      navigate("/admins");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error in adding admin");
    }
  };

  return (
    <div className="add-admin-page">
      <div className="add-admin-container">
        {/* Header */}
        <div className="add-admin-header">
          <div>
            <h2>Add Admin</h2>
            <p>Create a new administrator account</p>
          </div>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/admins")}
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-admin-form">

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullname">
              Full Name <span>*</span>
            </label>

            <input
              type="text"
              id="fullname"
              name="fullname"
              value={admin.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span>*</span>
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password <span>*</span>
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              placeholder="Enter password"
              minLength={6}
              required
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label htmlFor="role">
              Admin Role
            </label>

            <select
              id="role"
              name="role"
              value={admin.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* Image */}
          <div className="form-group">
            <label htmlFor="image"> Profile Image </label>

            <div className="file-input-wrapper">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {image && (
              <div className="selected-file">
                <span>Selected:</span> {image.name}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="cancel-btn"
              onClick={() => navigate("/admins")}
            >
              Cancel

            </button>

            <button
              type="submit"
              className="submit-bttn"
              disabled={loading}
            >
              {loading ? "Adding Admin..." : "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
