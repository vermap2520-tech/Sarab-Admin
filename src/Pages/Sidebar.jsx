import {
    FaHome,
    FaUsers,
    FaUserShield,
    FaBox,
    FaShoppingCart,
    FaCog,
    FaCalendarAlt,
    FaPhone,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../App.css";

const menu = [
    {
        name: "Dashboard",
        path: "/",
        icon: <FaHome />
    },
    {
        name: "Users",
        path: "/users",
        icon: <FaUsers />
    },
    {
        name: "Admins",
        path: "/admins",
        icon: <FaUserShield />
    },
    {
        name: "Products",
        path: "/product",
        icon: <FaBox />
    },
    {
        name: "Reservation",
        path: "/reservation",
        icon: <FaCalendarAlt />
    },
    {
        name: "Contact",
        path: "/contacts",
        icon: <FaPhone />
    },
    {
        name: "Orders",
        path: "/orders",
        icon: <FaShoppingCart />
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <FaCog />
    }
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo"> Admin Panel </div>
            <nav>
                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}