import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  const getAdmin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/singleAdmin/${id}`,
      );
      console.log(res.data);
      setAdmin(res.data.data);
    } catch (error) {
      console.log(error.res?.data || error.message);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  if (!admin) {
    return (
      <div className="admin-loading">
        <div className="loader"></div>
        <p>Loading Admin Details...</p>
      </div>
    )
  }

  return (
    <div className="view-admin-page">
      <div className="view-admin-container">
        {/* Header */}
        <div className="view-admin-header">
          <div>
            <h2>Admin Details</h2>
            <p>View complete information about this administrator.</p>
          </div>
          <button className="header-back-btn" onClick={() => navigate("/admins")}>
            ← Back </button>
        </div>

        {/* Admin Card */}
        <div className="admin-profile-card">
          {/* Profile Section */}
          <div className="admin-profile-section">
            <div className="view-admin-image">
              {admin.image ? (
                <img
                  src={`http://localhost:5000/image-uploads/${admin.image}`}
                  alt={admin.fullname}
                />
              ) : (
                <div className="no-admin-image">
                  {admin.fullname?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3>{admin.fullname}</h3>
            <p className="admin-email"> {admin.email} </p>
            <span className="admin-status"> Active Admin </span>
          </div>

          {/* Details */}

          <div className="admin-details-section">
            <h3 className="details-title"> Personal Information </h3>
            <div className="details-grid">
              <div className="detail"> <span>Admin ID</span> <p>{admin._id}</p> </div>
              <div className="detail"> <span>Full Name</span> <p>{admin.fullname}</p> </div>
              <div className="detail"> <span>Email Address</span> <p>{admin.email}</p> </div>
              <div className="detail"> <span>Role</span> <p>{admin.role || "Administrator"}</p> </div>
            </div>

            {/* Buttons */}
            <div className="admin-actions">
              <button className="back-admin-btn" onClick={() => navigate("/admins")}>
                ← Back to Admins </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
