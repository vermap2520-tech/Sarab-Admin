import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAdmin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/singleAdmin/${id}`,
      );
      console.log(res.data);

      const adminData = res.data.data;

      setAdmin({
        fullname: adminData.fullname || "",
        email: adminData.email || "",
        password: adminData.password || "",
      });

      setOldImage(adminData.image || "");
    } catch (error) {
      console.log(error.res?.data || error.message);
      alert("Admin data not found");
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", admin.fullname);
      formData.append("email", admin.email);
      formData.append("password", admin.password);
      formData.append("image", image);

      const res = await axios.post(
        `http://localhost:5000/api/admin/updateAdmin/${id}`,
        formData,
      );
      console.log(res.data);
      alert("Admin Updated Successfully");
      navigate("/admins");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Admin update failed");
    }
  };

  return (
    <div className="update-admin-page">
      <div className="update-admin-container" onSubmit={handleUpdate}>
        {/* Header */}
        <div className="update-admin-header">
          <div>
            <h2>Update Admin</h2>
            <p>Update administrator account details</p>
          </div>
          <button type="button" className="back-btnn" onClick={() => navigate("/admins")} >
            ← Back
          </button>
        </div>

        <form className="update-admin-card" onSubmit={handleUpdate}>
          {/* Profile Image */}
          <div className="profile-section">
            <div className="image-wrapper">
              {image ? (<img src={URL.createObjectURL(image)} alt="Preview" className="admin-image" />)
                : oldImage ? (<img src={`http://localhost:5000/image-uploads/${oldImage}`}
                  alt="Admin" className="admin-image" />)
                  : (<div className="image-placeholder"> 👤 </div>)}
            </div>
            <div className="image-content">
              <h3>Profile Image</h3>
              <p>Upload a new profile image</p>
              <label className="upload-btn"> Choose Image
                <input type="file"
                  accept="upload/"
                  onChange={handleImageChange} />
              </label>
            </div>
          </div>
          {/* Divider */}
          <div className="form-divider"></div>
          {/* Form */}
          <div className="form-grid">
            <div className="form-group">
              <label> Full Name </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter Full Name"
                value={admin.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email"
                name="email"
                placeholder="Enter email address"
                value={admin.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Password</label>
              <input type="password"
                name="password"
                placeholder="Enter password"
                value={admin.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-admin-btn" onClick={() => navigate("/admins")}>
              Cancel
            </button>
            <button type="submit" className="update-admin-btn" disabled={loading}>
              {loading ? "Updating..." : "Update Admin"}
            </button>
          </div>
        </form>

        {/* old image */}
        {/* {oldImage && !image && (
          <img
            src={`http://localhost:5000/image-uploads/${oldImage}`}
            alt="Admin"
            classname="update-image-preview"
            width={"120px"}
          />
        )} */}
        {/* New Image */}
        {/* {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="update-image-preview"
            width={"100px"}
          />
        )} */}
      </div>
    </div>
  );
}
