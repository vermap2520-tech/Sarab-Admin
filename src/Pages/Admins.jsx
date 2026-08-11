import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admins() {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  // console.log(admins);

  const getAdmins = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/getAllAdmins",
      );
      console.log(res.data);
      setAdmins(res.data.data);
    } catch (error) {
      console.log(error.res?.data || error.message);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteAdmin/${id}`);
      alert("Admin deleted successfully");
      getAdmins();
      // setAdmins(admins.filter((admin) => admin._id !== id));
    } catch (error) {
      console.log(error.res?.data || error.message);
      alert("Error in deleting admin");
    }
  };

  return (
    <div className="admins">
      <div className="admins-header">
        <h2>Admins Lists</h2>
        <button className="add-btn" onClick={() => navigate("/registerAdmin")}>
          Add Admin
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>
                {admin.image ? (
                  <img
                    src={`http://localhost:5000/image-uploads/${admin.image}`}
                    alt={admin.fullname}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{admin.fullname}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>

              <td>
                <button
                  className="view-bttn"
                  onClick={() => navigate(`/viewAdmin/${admin._id}`)}
                >
                  View
                </button>
              </td>

              <td>
                <button
                  className="update-bttn"
                  onClick={() => navigate(`/updateAdmin/${admin._id}`)}
                >
                  Update
                </button>
              </td>

              <td>
                <button
                  className="delete-bttn"
                  onClick={() => handleDelete(admin._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
