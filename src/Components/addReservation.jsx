import axios from "axios";
import { useState } from "react";
import "tailwindcss";

export default function AddReservation() {
    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        email: "",
        guests: "",
        reservationDate: "",
        reservationTime: "",
        tableNumber: "",
        status: "Pending",
        specialRequest: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit reservation
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        // Basic validation
        if (
            !formData.fullname ||
            !formData.phone ||
            !formData.email ||
            !formData.guests ||
            !formData.reservationDate ||
            !formData.reservationTime ||
            !formData.tableNumber
        ) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/reservation/add",
                formData
            );

            if (res.data.success) {
                setMessage("Reservation booked successfully!");

                // Reset form
                setFormData({
                    fullname: "",
                    phone: "",
                    email: "",
                    guests: "",
                    reservationDate: "",
                    reservationTime: "",
                    tableNumber: "",
                    status: "",
                    specialRequest: "",
                });
            }
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-10">
                    <p className="text-orange-500 uppercase tracking-widest font-semibold">
                        Reservation
                    </p>

                    <h1 className="text-4xl font-bold text-gray-800 mt-2">
                        Book Your Table
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Reserve your table and enjoy a delicious meal with us.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    {/* Success Message */}
                    {message && (
                        <div className="mb-6 rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3">
                            {message}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>

                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number *
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            {/* Guests */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Number of Guests *
                                </label>

                                <input
                                    type="number"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="Number of guests"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Reservation Date *
                                </label>

                                <input
                                    type="date"
                                    name="reservationDate"
                                    value={formData.reservationDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Reservation Time *
                                </label>

                                <select
                                    name="reservationTime"
                                    value={formData.reservationTime}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value=""> 08:00 AM </option>
                                    <option> 10:00 AM </option>
                                    <option> 12:00 PM </option>
                                    <option> 02:00 PM </option>
                                    <option> 04:00 PM </option>
                                    <option> 06:00 PM </option>
                                    <option> 08:00 PM </option>
                                    <option> 10:00 PM </option>
                                    <option> 12:00 AM </option>
                                    <option> 02:00 AM </option>
                                    <option> 04:00 AM </option>
                                    <option> 06:00 AM </option>
                                </select>
                            </div>

                            {/* Table Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Table Number *
                                </label>

                                <select
                                    name="tableNumber"
                                    value={formData.tableNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value="">Select Table</option>
                                    <option value="1">Table 1</option>
                                    <option value="2">Table 2</option>
                                    <option value="3">Table 3</option>
                                    <option value="4">Table 4</option>
                                    <option value="5">Table 5</option>
                                    <option value="6">Table 6</option>
                                    <option value="7">Table 7</option>
                                    <option value="8">Table 8</option>
                                    <option value="9">Table 9</option>
                                    <option value="10">Table 10</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value="">Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Special Request */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Special Request
                                </label>

                                <textarea
                                    name="specialRequest"
                                    value={formData.specialRequest}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Any special request..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-orange-400"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold px-10 py-3 rounded-lg transition duration-300"
                            >
                                {loading ? "Booking..." : "Book Reservation"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
