import { FaSearch, FaBell } from "react-icons/fa";
// import "../App.css";

export default function Navbar() {
    return (
        <header className="navbar">
            <h2>Dashboard</h2>
            <div className="navbar-right">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <FaBell className="bell" />
                <img
                    src="https://i.pravatar.cc/40"
                    alt="admin"
                />
            </div>
        </header>
    );
}