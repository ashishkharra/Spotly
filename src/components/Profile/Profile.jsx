import React, { useState } from "react";
import { motion } from "framer-motion";
import { profileData } from "../../constants/constans";

const Profile = () => {
    const [user, setUser] = useState(profileData.user);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [formData, setFormData] = useState({ ...user, currentPassword: "", newPassword: "" });

    const stats = [
        { label: "Total Bookings", value: profileData.bookings.length },
        { label: "Total Spent", value: `$${profileData.bookings.reduce((sum, b) => sum + b.price, 0)}` },
        { label: "Favorite Location", value: "Downtown Garage" },
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setUser(formData);
        setShowUpdateModal(false);
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        setShowForgotPasswordModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 p-4 sm:p-6 lg:p-8">
            {/* Update Profile Modal */}
            {showUpdateModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
                >
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Update Profile</h2>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
                >
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                            <button
                                onClick={() => setShowForgotPasswordModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handlePasswordReset} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
                                >
                                    Reset Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPasswordModal(false)}
                                    className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Profile Header */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{user.full_name}</h1>
                            <div className="mt-3 space-y-1">
                                <p className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                    {user.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                    {user.phone}
                                </p>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowUpdateModal(true)}
                                    className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => setShowForgotPasswordModal(true)}
                                    className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                    Change Password
                                </button>
                            </div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm w-full md:w-auto">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Vehicle Details
                            </h3>
                            <div className="space-y-1">
                                <p className="font-mono">{user.vehicle_details.plate_number}</p>
                                <p className="text-sm text-white/80">{user.vehicle_details.vehicle_type}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 sm:p-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 p-5 rounded-xl border border-gray-100"
                        >
                            <div className="text-2xl font-bold text-indigo-900 mb-2">{stat.value}</div>
                            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Booking History */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking History</h2>
                    <div className="space-y-4">
                        {profileData.bookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group border-l-4 border-indigo-900 bg-gray-50 p-4 rounded-r-xl hover:bg-white transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{booking.place_name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{booking.address}</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            <span className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-sm">
                                                {new Date(booking.start_time).toLocaleDateString()}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-sm text-gray-600">
                                                {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {' '}
                                                {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="sm:text-right">
                                        <div className="text-xl font-bold text-gray-900 mb-2">${booking.price.toFixed(2)}</div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                            booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                                {booking.payment_method && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                        </svg>
                                        Paid via {booking.payment_method.replace('_', ' ')}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;