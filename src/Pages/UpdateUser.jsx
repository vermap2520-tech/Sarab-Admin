import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getSingleUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/singleUser/${id}`,
      );

      console.log(res.data);

      setForm({
        fullname: res.data.data?.fullname || "",
        email: res.data.data?.email || "",
        password: res.data.data?.password || "",
      });
    } catch (error) {
      console.log(error);
      alert("Unable to load user details");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);

      const res = await axios.put(
        `http://localhost:5000/api/users/updateUser/${id}`,
        form,
      );

      console.log(res.data);

      alert("User Updated Successfully");
      navigate("/users");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "User updating failed");
    }
  };

  return (
    <div className="update-user">
      <form className="update-card" onSubmit={handleUpdate}>
        <h2>Update User</h2>

        <input
          type="text"
          name="fullname"
          placeholder="Enter full name"
          value={form.fullname}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="button-group">
          <button type="button" className="cancel-user-btn" onClick={() => navigate("/users")}>
            Cancel
          </button>

          <button type="submit" className="save-user-btn" disabled={updating}>
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
