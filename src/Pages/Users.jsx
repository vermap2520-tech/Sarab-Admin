import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  console.log(users);

  const getuser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/getAllUser");
      console.log(res.data);
      setUsers(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/deleteUser/${id}`);
      alert("User deleted successfully");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
      alert("Users Deleteing Error");
    }
  };

  return (
    <div className="users-page">
      <div className="users-container">
        {/* user header */}
        <div className="user-header">
          <h2>Users List</h2>
          <button className="add-btn" onClick={() => navigate("/userRegister")}>
            Add User
          </button>
        </div>
        {/* table */}
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="user-name">{user.fullname}</td>
                  <td className="user-email">{user.email}</td>
                  <td className="user-pswd">{user.password}</td>
                  <td>
                    <button
                      className="view-btnn"
                      onClick={() => navigate(`/view/${user._id}`)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="update-btnn"
                      onClick={() => navigate(`/update/${user._id}`)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btnn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
