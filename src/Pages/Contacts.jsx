import { useEffect, useState } from "react";
import axios from "axios";
import {
    Mail,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    X,
    User,
    Calendar,
} from "lucide-react";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Selected contact for popup
    const [selectedContact, setSelectedContact] = useState(null);

    // =========================
    // Get All Contacts
    // =========================
    const getContacts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/contact/all"
            );

            setContacts(res.data.data || []);
        } catch (error) {
            console.error(
                "Get Contacts Error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    // =========================
    // Open Details Popup
    // =========================
    const handleViewContact = async (contact) => {
        // First open popup
        setSelectedContact(contact);

        // If already read, no need to call API
        if (contact.status === "read") {
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/contact/status/${contact._id}`,
                {
                    status: "read",
                }
            );

            const updatedContact = res.data.data;

            // Update selected contact inside popup
            setSelectedContact(updatedContact);

            // Update contact in table
            setContacts((prevContacts) =>
                prevContacts.map((item) =>
                    item._id === contact._id
                        ? updatedContact
                        : item
                )
            );
        } catch (error) {
            console.error(
                "Status Update Error:",
                error.response?.data || error.message
            );
        }
    };

    // =========================
    // Delete Contact
    // =========================
    const deleteContact = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/contact/delete/${id}`
            );

            setContacts((prevContacts) =>
                prevContacts.filter(
                    (contact) => contact._id !== id
                )
            );

            // Close popup if deleted contact is open
            if (selectedContact?._id === id) {
                setSelectedContact(null);
            }
        } catch (error) {
            console.error(
                "Delete Error:",
                error.response?.data || error.message
            );
        }
    };

    // =========================
    // Close Popup
    // =========================
    const closePopup = () => {
        setSelectedContact(null);
    };

    // =========================
    // Loading
    // =========================
    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-lg font-semibold text-gray-500">
                    Loading messages...
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="p-6">

                {/* =========================
                    Header
                ========================== */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <h1 className="text-3xl font-black text-gray-800">
                            Contact Messages
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage messages received from customers
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-5 py-3">
                        <Mail className="text-orange-600" />

                        <span className="font-bold text-orange-700">
                            {contacts.length} Messages
                        </span>
                    </div>
                </div>

                {/* =========================
                    Empty State
                ========================== */}
                {contacts.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow">

                        <Mail
                            size={50}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-4 text-xl font-bold text-gray-800">
                            No Messages
                        </h2>

                        <p className="mt-2 text-gray-500">
                            You haven't received any contact messages yet.
                        </p>

                    </div>
                ) : (

                    /* =========================
                       Table
                    ========================== */
                    <div className="overflow-hidden bg-white shadow">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-50">
                                    <tr className="border-b">

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Subject
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Message
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-600">
                                            Action
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {contacts.map((contact) => (

                                        <tr
                                            key={contact._id}
                                            className="border-b transition hover:bg-orange-50/40"
                                        >

                                            {/* Customer */}
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="font-bold text-gray-800">
                                                        {contact.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {contact.email}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-6 py-5">
                                                <p className="font-semibold text-gray-700">
                                                    {contact.subject}
                                                </p>
                                            </td>

                                            {/* Message */}
                                            <td className="max-w-xs px-6 py-5">
                                                <p className="line-clamp-2 text-sm text-gray-500">
                                                    {contact.message}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">

                                                {contact.status === "read" ? (

                                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">

                                                        <CheckCircle
                                                            size={14}
                                                        />

                                                        Read

                                                    </span>

                                                ) : (

                                                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">

                                                        <Clock
                                                            size={14}
                                                        />

                                                        Unread

                                                    </span>
                                                )}

                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-sm text-gray-500">

                                                {contact.createdAt
                                                    ? new Date(
                                                        contact.createdAt
                                                    ).toLocaleDateString()
                                                    : "N/A"}

                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">

                                                <div className="flex justify-center gap-2">

                                                    {/* Eye Button */}
                                                    <button
                                                        onClick={() =>
                                                            handleViewContact(
                                                                contact
                                                            )
                                                        }
                                                        title="View Details"
                                                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                                                    >
                                                        <Eye size={18} />
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() =>
                                                            deleteContact(
                                                                contact._id
                                                            )
                                                        }
                                                        title="Delete"
                                                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                )}

            </div>

            {/* ==================================================
                CONTACT DETAILS POPUP
            ================================================== */}

            {selectedContact && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={closePopup}
                >

                    <div
                        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Popup Header */}
                        <div className="flex items-center justify-between border-b px-6 py-5">

                            <div>
                                <h2 className="text-2xl font-black text-gray-800">
                                    Contact Details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Customer message details
                                </p>
                            </div>

                            <button
                                onClick={closePopup}
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* Popup Body */}
                        <div className="space-y-6 p-6">

                            {/* Customer */}
                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-orange-100 p-3">
                                    <User
                                        size={22}
                                        className="text-orange-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">
                                        Customer
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-800">
                                        {selectedContact.name}
                                    </p>
                                </div>

                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-blue-100 p-3">
                                    <Mail
                                        size={22}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">
                                        Email
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {selectedContact.email}
                                    </p>
                                </div>

                            </div>

                            {/* Subject */}
                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Subject
                                </p>

                                <p className="mt-2 rounded-xl bg-gray-50 p-4 font-bold text-gray-800">
                                    {selectedContact.subject}
                                </p>
                            </div>

                            {/* Message */}
                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Message
                                </p>

                                <div className="mt-2 rounded-xl bg-gray-50 p-4">

                                    <p className="whitespace-pre-wrap leading-7 text-gray-700">
                                        {selectedContact.message}
                                    </p>

                                </div>
                            </div>

                            {/* Date + Status */}
                            <div className="flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">

                                {/* Date */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">

                                    <Calendar size={18} />

                                    <span>
                                        {selectedContact.createdAt
                                            ? new Date(
                                                selectedContact.createdAt
                                            ).toLocaleString()
                                            : "N/A"}
                                    </span>

                                </div>

                                {/* Status */}
                                {selectedContact.status === "read" ? (

                                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">

                                        <CheckCircle size={16} />

                                        Read

                                    </span>

                                ) : (

                                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">

                                        <Clock size={16} />

                                        Unread

                                    </span>

                                )}

                            </div>

                        </div>

                        {/* Popup Footer */}
                        <div className="flex justify-end border-t bg-gray-50 px-6 py-4">

                            <button
                                onClick={closePopup}
                                className="rounded-sm bg-black px-6 py-3 font-bold text-white transition hover:bg-gray-800"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}