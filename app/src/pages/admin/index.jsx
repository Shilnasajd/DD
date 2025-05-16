import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editStatus, setEditStatus] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
            fetchBookings();
        }
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/bookings/');
            setBookings(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchBookingDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/bookings/${id}`);
            setSelectedBooking(response.data);
            setEditStatus(response.data.status || 'Pending');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (formData.username === 'ddcameras12@gmail.com' && formData.password === '@Cheilmea@18') {
                localStorage.setItem('adminToken', 'sample_token');
                setIsLoggedIn(true);
                fetchBookings();
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleStatusUpdate = async () => {
        try {
            await axios.patch(`http://localhost:8000/api/bookings/${selectedBooking.id}/update-status/`, {
                status: editStatus
            });
            // Update the local bookings state
            setBookings(bookings.map(booking => 
                booking.id === selectedBooking.id ? {...booking, status: editStatus} : booking
            ));
            setSelectedBooking({...selectedBooking, status: editStatus});
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            case 'Completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-amber-100 text-amber-800';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getSlotName = (slotNumber) => {
        const slots = {
            1: 'Morning',
            2: 'Afternoon',
            3: 'Evening'
        };
        return slots[slotNumber] || `Slot ${slotNumber}`;
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-amber-100">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-6 px-8 text-center">
                        <h1 className="text-2xl font-bold text-white">DD CAMERAS Admin</h1>
                        <p className="text-amber-100 mt-1">Equipment Rental Management</p>
                    </div>
                    <form onSubmit={handleLogin} className="p-8">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                                id="username"
                                type="email"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-300 bg-gray-50"
                                required
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-300 bg-gray-50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-amber-500"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">DD CAMERAS Dashboard</h1>
                        <p className="text-amber-100">Equipment Rental Management System</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Recent Bookings</h2>
                    <p className="text-gray-600">Manage all equipment rental bookings</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading bookings</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : selectedBooking ? (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-6">
                        <button 
                            onClick={() => setSelectedBooking(null)}
                            className="mb-4 flex items-center text-amber-600 hover:text-amber-800"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to all bookings
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{selectedBooking.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{selectedBooking.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{selectedBooking.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Comments</p>
                                        <p className="font-medium">{selectedBooking.comment || 'No comments'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{formatDate(selectedBooking.date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Time Slot</p>
                                        <p className="font-medium">{getSlotName(selectedBooking.slot)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Product ID</p>
                                        <p className="font-medium">{selectedBooking.product}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="font-medium">{selectedBooking.price ? `₹${selectedBooking.price}` : 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        {isEditing ? (
                                            <div className="flex items-center space-x-2">
                                                <select
                                                    value={editStatus}
                                                    onChange={(e) => setEditStatus(e.target.value)}
                                                    className="border rounded px-3 py-1"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                <button
                                                    onClick={handleStatusUpdate}
                                                    className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                                                    {selectedBooking.status || 'Pending'}
                                                </span>
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="ml-2 text-amber-600 hover:text-amber-800 text-sm"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div 
                                key={booking.id} 
                                onClick={() => fetchBookingDetails(booking.id)}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-800">Booking #{booking.id}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">Customer: {booking.name}</p>
                                    <p className="text-gray-600 text-sm mb-3">Product ID: {booking.product}</p>
                                    
                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Date</p>
                                            <p className="text-sm font-medium">
                                                {formatDate(booking.date)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Slot</p>
                                            <p className="text-sm font-semibold">{getSlotName(booking.slot)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} DD CAMERAS. All rights reserved.
                        </div>
                        <div className="mt-4 md:mt-0">
                            <p className="text-gray-500 text-sm">
                                Admin Panel v1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Admin;