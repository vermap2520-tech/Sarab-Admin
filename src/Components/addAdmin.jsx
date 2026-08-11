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
  });

  const [image, setImage] = useState();

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fdata = new FormData();
    fdata.append("fullname", admin.fullname);
    fdata.append("email", admin.email);
    fdata.append("password", admin.password);
    fdata.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        fdata,
      );
      console.log(res.data);
      alert("Admin Added Successfully!");
      setAdmin({
        fullname: "",
        email: "",
        password: "",
        image: "",
      });
      setImage(null);

      navigate("/admins");
    } catch (error) {
      console.log(error.res?.data || error.message);
      alert("Error in adding admin");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="add-admin">
        <h2>Add Admin</h2>
      </div>
      <div className="form-group">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={admin.fullname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={admin.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit">Add Admin</button>
    </form>
  );
}
