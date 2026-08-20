import { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        const loadAdmin = () => {
            const storedAdmin = localStorage.getItem("admin");

            if (storedAdmin) {
                try {
                    setAdmin(JSON.parse(storedAdmin));
                } catch (error) {
                    console.error("Invalid admin data:", error);
                    localStorage.removeItem("admin");
                    setAdmin(null);
                }
            } else {
                setAdmin(null);
            }
        }
        loadAdmin();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin");

        setAdmin(null);
        setOpenDropdown(false);

        navigate("/adminLogin");
    };

    const adminImage = admin?.image
        ? `http://localhost:5000/image-uploads/${admin.image}`
        : "https://i.pravatar.cc/40";

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

                {/* Login Icons */}
                <FaSignInAlt className="login" onClick={() => navigate("/adminLogin")} />

                {/* Admin Profile */}
                <div className="profile-wrapper">
                    <button className="admin-profile"
                        onClick={() => setOpenDropdown(!openDropdown)}>
                        <img src={adminImage}
                            alt={admin?.fullname || "Admin"}
                        />
                    </button>
                    {/* Dropdown */}
                    {openDropdown && (
                        <div className="profile-dropdown">
                            {/* Logged-in Admin */}
                            <div className="profile-info">
                                <img src={adminImage}
                                    alt={admin?.fullname || "Admin"}
                                />
                                <div>
                                    <h4>{admin?.fullname || "Admin"}</h4>
                                    <span>{admin?.role === "superadmin" ? "Super Admin" : "Admin"}</span>
                                    {admin?.email && (
                                        <small> {admin?.email} </small>
                                    )}
                                </div>
                            </div>
                            <hr />
                            {/* Profile */}
                            <button onClick={() => navigate("/adminProfile")}>
                                <FaUser />
                                Profile
                            </button>
                            {/* Settings */}
                            <button
                                onClick={() => {
                                    setOpenDropdown(false);
                                    navigate("/settings");
                                }}
                            >
                                <FaCog />
                                Settings
                            </button>
                            {/* Logout */}
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