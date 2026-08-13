import { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/adminLogin");
    };

    return (
        <header className="navbar">
            <h2>Dashboard</h2>

            <div className="navbar-right">

                {/* Search */}
                <div className="search-box">
                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                {/* Notification */}
                <FaBell className="bell" />

                {/* Admin Profile */}

                <div className="profile-wrapper">
                    <button className="admin-profile"
                        onClick={() => setOpenDropdown(!openDropdown)}>
                        <img src={
                            admin?.image
                                ? `http://localhost:5000/image-uploads/${admin.image}`
                                : "https://i.pravatar.cc/40"
                        }
                            alt={admin?.fullname || "admin"}
                        />
                    </button>
                    {/* Dropdown */}
                    {openDropdown && (
                        <div className="profile-dropdown">
                            <div className="profile-info">
                                <img src={admin?.image
                                    ? `http://localhost:5000/uploads/admins/${admin.image}`
                                    : "https://i.pravatar.cc/40"
                                }
                                    alt="admin"
                                />
                                <div>
                                    <h4>{admin?.fullname || "Admin"}</h4>
                                    <span>{admin?.role === "superadmin" ? "Super Admin" : "Admin"}</span>
                                    <small> {admin?.email} </small>
                                </div>
                            </div>
                            <hr />
                            <button onClick={() => navigate("adminProfile")}>
                                <FaUser />
                                Profile
                            </button>
                            <button
                                onClick={() => navigate("/settings")}
                            >
                                <FaCog />
                                Settings
                            </button>
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}