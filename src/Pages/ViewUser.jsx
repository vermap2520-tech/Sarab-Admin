import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewUser() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const getSingleUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/singleUser/${id}`,
      );
      console.log(res);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  if (!user) {
    return (
      <div className="user-loading">
        <div className="loader"></div>
        <h2>Loading User Details...</h2>
      </div>
    );
  }

  return (
    <div className="view-user">
      <div className="view-card">
        <h2>User Details</h2>

        <div className="info">
          <div className="info-icon">👤</div>
          <div className="info-content">
            <label>Full Name</label>
            <p>{user.fullname}</p>
          </div>
        </div>

        <div className="info">
          <div className="info-icon">✉️</div>
          <div className="info-content">
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="info">
          <div className="info-icon">🔒</div>
          <div className="info-content">
            <label>Password</label>
            <p>{user.password}</p>
          </div>
        </div>

        <button className="back-user-btn" onClick={() => navigate("/users")}>
          ← Back to Users
        </button>
      </div>
    </div>
  );
}
