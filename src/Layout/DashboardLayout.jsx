import Sidebar from "../Pages/Sidebar";
import Navbar from "../Pages/Navbar";
import { Outlet } from "react-router-dom";
import "../App.css";

export default function DashboardLayout() {
    return (
        <div className="dashboard">
            <div className="dashboard-side">
                <Sidebar />
            </div>


            <div className="dashboard-content">
                <Navbar />

                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}