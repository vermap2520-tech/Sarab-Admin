import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Reservation() {
    const navigate = useNavigate();

    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Get all reservations
    const getReservations = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/reservation/all"
            );

            setReservations(res.data.data || []);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReservations();
    }, []);

    // Delete reservation
    const deleteReservation = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/reservation/delete/${id}`
            );

            alert("Reservation deleted successfully");

            getReservations();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete reservation");
        }
    };

    // Search
    const filteredReservations = reservations.filter((reservation) => {
        const searchText = search.toLowerCase();

        return (
            reservation.fullname?.toLowerCase().includes(searchText) ||
            reservation.name?.toLowerCase().includes(searchText) ||
            reservation.email?.toLowerCase().includes(searchText) ||
            reservation.phone?.toLowerCase().includes(searchText) ||
            reservation.tableNumber?.toString().includes(searchText)
        );
    });

    return (
        <div className="reservation-page">

            {/* Header */}
            <div className="reservation-header">
                <div>
                    <h1>Reservations</h1>
                    <p>Manage all restaurant reservations</p>
                </div>

                <button
                    className="add-reservation-btn"
                    onClick={() => navigate("/reservation/add")}
                >
                    + Add Reservation
                </button>
            </div>

            {/* Search */}
            <div className="reservation-toolbar">
                <div className="search-box">
                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search reservation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="reservation-count">
                    Total Reservations: <strong>{filteredReservations.length}</strong>
                </div>
            </div>

            {/* Table */}
            <div className="reservation-table-container">
                {loading ? (
                    <div className="loading">
                        Loading reservations...
                    </div>
                ) : filteredReservations.length === 0 ? (
                    <div className="no-data">
                        No reservations found.
                    </div>
                ) : (
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Guests</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Table</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredReservations.map((reservation, index) => (
                                <tr key={reservation._id}>

                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="customer-name">
                                            {reservation.fullname || reservation.name || "N/A"}
                                        </div>
                                    </td>

                                    <td>{reservation.phone || "N/A"}</td>

                                    <td>{reservation.email || "N/A"}</td>

                                    <td>
                                        {reservation.guests || 0}
                                    </td>

                                    <td>
                                        {reservation.reservationDate
                                            ? new Date(
                                                reservation.reservationDate
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {reservation.reservationTime || "N/A"}
                                    </td>

                                    <td>
                                        <span className="table-number">
                                            {reservation.tableNumber || "N/A"}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`status ${reservation.status?.toLowerCase() || "pending"
                                                }`}
                                        >
                                            {reservation.status || "Pending"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="action-buttons">

                                            <button
                                                className="view-btn"
                                                title="View"
                                                onClick={() =>
                                                    navigate(
                                                        `/reservations/view/${reservation._id}`
                                                    )
                                                }
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="edit-btn"
                                                title="Edit"
                                                onClick={() =>
                                                    navigate(
                                                        `/reservations/update/${reservation._id}`
                                                    )
                                                }
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="delete-btn"
                                                title="Delete"
                                                onClick={() =>
                                                    deleteReservation(reservation._id)
                                                }
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}
