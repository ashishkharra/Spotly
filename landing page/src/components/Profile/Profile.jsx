import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profileData } from "../../constants/constans";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import { userAuth } from "../Store";
import Toast from '../Toast.jsx'
import { getProfile, getVehicles } from "../../APIs/getApis.js";
import { signOut } from "../../APIs/getApis.js";

const Profile = () => {
    const navigate = useNavigate();
    const userId = userAuth(state => state.user);
    const [user, setUser] = useState(null);
    const fromGoogle = userAuth(state => state.user?.fromGoogle || false);
    const [loading, setLoading] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [uploadVehicalModel, setUploadVehicalModel] = useState(false);
    const [formData, setFormData] = useState({ currentPassword: "", newPassword: "" });
    const [vehical, setVehical] = useState({
        plate_number: '',
        type: '',
        color: '',
        model: '',
    })

    const [yourVehicles, setYourVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const location = useLocation();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    useEffect(() => {
        if (location.state?.showToast) {
            setShowToast(true);
            setToastMessage(location.state.message);
            setToastType(location.state.type);
        }
    }, [location.state]);

    const stats = [
        { label: "Total Bookings", value: profileData.bookings.length },
        { label: "Total Spent", value: `$${profileData.bookings.reduce((sum, b) => sum + b.price, 0)}` },
        { label: "Favorite Location", value: "Downtown Garage" },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getProfile(userId);
                setUser(response.user);
                setLoading(false)
                setFormData({ ...response, currentPassword: "", newPassword: "" });
            } catch (err) {
                if (!axios.isCancel(err)) {
                    navigate('*', {
                        state: {
                            showToast: true,
                            message: 'Failed to load profile',
                            type: 'error'
                        }
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        const fetchVehicle = async () => {
            try {
                setLoading(true);
                const response = await getVehicles(userId)
                setYourVehicles(response.vehicles);
                setSelectedVehicle(response.vehicles[0]);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    navigate('/profile', {
                        state: {
                            showToast: true,
                            message: 'No vehicles found',
                            type: 'error',
                        },
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        fetchVehicle();
    }, []);

    useEffect(() => {
        if (location.state?.showToast) {
            setShowToast(true);
            setToastMessage(location.state.message);
            setToastType(location.state.type);

            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleUploadVehical = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/upload-vehical', {
                plate_number: vehical.plate_number,
                type: vehical.type,
            }, { withCredentials: true });

            if (res.data.success) {
                setYourVehicles(prev => [...prev, { plate_number: vehical.plate_number, type: vehical.type }]);
                setVehical({ plate_number: '', type: '' });
                setUploadVehicalModel(false);

                setShowToast(true);
                setToastMessage('Vehicle successfully saved!');
                setToastType('success');
            }

        } catch (error) {
            console.error(error);
            setShowToast(true);
            setToastMessage('Vehicle not saved!');
            setToastType('error');
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "type" || name === "plate_number") {
            setVehical((prevVehical) => ({
                ...prevVehical,
                [name]: value
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/update-profile', {
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone
            }, {
                withCredentials: true
            });
            if (res.data.success) {
                setUser(res.data?.user);
                navigate('/', {
                    replace: true,
                    state: {
                        showToast: true,
                        message: 'Profile updated successfully!',
                        type: 'success'
                    }
                });
            }
        } catch (error) {
            navigate('/register', {
                replace: true,
                state: {
                    showToast: true,
                    message: 'Something is wrong!',
                    type: 'success'
                }
            });
        } finally {
            setUploadVehicalModel(false)
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/reset-password', {
                password: formData.currentPassword,
                newPassword: formData.newPassword,
            }, {
                withCredentials: true
            });
            if (res.data.success) {
                userAuth.getState.clearUser();
                userAuth.getState.fetchUser();
                setUser(null);
                navigate('/', {
                    replace: true,
                    state: {
                        showToast: true,
                        message: 'Password changed successfully!',
                        type: 'success'
                    }
                });
            }
        } catch (error) {
            navigate('/register', {
                replace: true,
                state: {
                    showToast: true,
                    message: 'Something is wrong!',
                    type: 'success'
                }
            });
        }
    };

    const handleVehicleRemove = async () => {
        if (!selectedVehicle?.plate_number) return;

        try {
            setLoading(true);
            const response = await axios.post(
                '/api/remove-vehicle',
                { plate_number: selectedVehicle.plate_number },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const updatedVehicles = response.data.vehicles;
                setYourVehicles(updatedVehicles);

                if (updatedVehicles.length > 0) {
                    setSelectedVehicle(updatedVehicles[0]);
                    navigate('/profile', {
                        state: {
                            showToast: true,
                            message: `Vehicle ${selectedVehicle.plate_number} removed`,
                            type: 'info',
                        },
                    });
                } else {
                    setSelectedVehicle(null);
                    navigate('/profile', {
                        state: {
                            showToast: true,
                            message: 'All vehicles removed',
                            type: 'info',
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Error removing vehicle:', error);
            navigate('/profile', {
                state: {
                    showToast: true,
                    message: 'Failed to remove vehicle',
                    type: 'error',
                },
            });
        } finally {
            setLoading(false);
        }
    };



    const handleLogout = async () => {
        const res = await signOut()        
        if (res.status === 200) {
           
            userAuth.getState().clearUser()
            userAuth.getState().clearStorage();
            navigate('/register', {
                replace: true,
                state: {
                    showToast: true,
                    message: 'Signed in successfully!',
                    type: 'success'
                }
            });
        } else {
            
            navigate('/profile', {
                replace: true,
                state: {
                    showToast: true,
                    message: 'Something Went Wrong!',
                    type: 'error'
                }
            });
        }
    };

    return (
        <div className="bg-gradient-to-r p-4 from-gray-900 lg:p-8 min-h-screen sm:p-6 to-gray-700">
            {showUpdateModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex bg-black/50 justify-center backdrop-blur-sm fixed inset-0 items-center z-50"
                >
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl text-gray-800 font-bold">Update Profile</h2>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="space-y-5">
                            <div>
                                <label className="text-gray-700 text-sm block font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm block font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm block font-medium mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                />
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <button
                                    type="submit"
                                    className="bg-indigo-900 rounded-lg text-white w-full font-medium hover:bg-indigo-800 px-6 py-3 sm:w-auto transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="bg-gray-100 rounded-lg text-gray-700 w-full font-medium hover:bg-gray-200 px-6 py-3 sm:w-auto transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}

            {uploadVehicalModel && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex bg-black/50 justify-center backdrop-blur-sm fixed inset-0 items-center z-50"
                >
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl text-gray-800 font-bold">Update Profile</h2>
                            <button
                                onClick={() => setUploadVehicalModel(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleUploadVehical}>
                            <div>
                                <label className="text-gray-700 text-sm block font-medium mb-2">Plate number</label>
                                <input
                                    type="text"
                                    name="plate_number"
                                    value={vehical.plate_number}
                                    onChange={handleInputChange}
                                    required
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="text-gray-700 text-sm block font-medium mb-2">Vehicle Type</label>
                                <select
                                    name="type"
                                    value={vehical.type}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                >
                                    <option value="">Select Vehicle Type</option>
                                    <option value="sedan">Sedan</option>
                                    <option value="bike">Bike</option>
                                    <option value="suv">SUV</option>
                                    <option value="truck">Truck</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-900 rounded-lg text-white w-full font-medium hover:bg-indigo-800 px-6 py-3 sm:w-auto transition-colors mt-3"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}

            {showForgotPasswordModal && fromGoogle && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex bg-black/50 justify-center backdrop-blur-sm fixed inset-0 items-center z-50"
                >
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl text-gray-800 font-bold">Reset Password</h2>
                            <button
                                onClick={() => setShowForgotPasswordModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        {!fromGoogle ? <form onSubmit={handlePasswordReset} className="space-y-5">
                            <div>
                                <label className="text-gray-700 text-sm block font-medium mb-2">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm block font-medium mb-2">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                                />
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <button
                                    type="submit"
                                    className="bg-indigo-900 rounded-lg text-white w-full font-medium hover:bg-indigo-800 px-6 py-3 sm:w-auto transition-colors"
                                >
                                    Reset Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPasswordModal(false)}
                                    className="bg-gray-100 rounded-lg text-gray-700 w-full font-medium hover:bg-gray-200 px-6 py-3 sm:w-auto transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form> : ''}
                    </div>
                </motion.div>
            )}
            {loading && <Loading />}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto overflow-hidden"
            >
                <div className="">{showToast && <Toast message={toastMessage} type={toastType} />}</div>

                {user &&
                    <div className="bg-gradient-to-r p-6 text-white from-orange-600 sm:p-8 to-orange-800">
                        <div className="flex flex-col justify-between gap-6 items-start md:flex-row">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold sm:text-3xl tracking-tight">{user.full_name}</h1>
                                <div className="mt-3 space-y-1">
                                    <p className="flex gap-2 items-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                        {user.email}
                                    </p>
                                    <p className="flex gap-2 items-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                        {user.phone}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    <button
                                        onClick={() => setShowUpdateModal(true)}
                                        className="flex bg-white/10 rounded-lg backdrop-blur-sm gap-2 hover:bg-white/20 items-center px-4 py-2 transition-all"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit Profile
                                    </button>
                                    {!fromGoogle && (
                                        <button
                                            onClick={() => setShowForgotPasswordModal(true)}
                                            className="flex bg-white/10 rounded-lg backdrop-blur-sm gap-2 hover:bg-white/20 items-center px-4 py-2 transition-all"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                            Change Password
                                        </button>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="flex bg-white/10 rounded-lg backdrop-blur-sm gap-2 hover:bg-white/20 items-center px-4 py-2 transition-all"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H9m4-7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-2" />
                                        </svg>

                                        Logout
                                    </button>
                                    <button
                                        onClick={() => setUploadVehicalModel(true)}
                                        className="flex bg-white/10 rounded-lg backdrop-blur-sm gap-2 hover:bg-white/20 items-center px-4 py-2 transition-all"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v-6a3 3 0 013-3h10a3 3 0 013 3v6m-4 4H8a2 2 0 01-2-2m10 2a2 2 0 002-2M3 9h18m-6 6v4m-4-4v4m4-4h-4" />
                                        </svg>

                                        Upload Vehicle
                                    </button>

                                    {yourVehicles.length > 0 && (
                                        <button
                                            onClick={handleVehicleRemove}
                                            className="flex bg-white/10 rounded-lg backdrop-blur-sm gap-2 hover:bg-white/20 items-center px-4 py-2 transition-all"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l1.5-4.5a2 2 0 011.9-1.5h7.2a2 2 0 011.9 1.5L19 13M4 17h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1M6 17a1 1 0 11-2 0 1 1 0 012 0zm14 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 6h6"
                                                />
                                            </svg>

                                            Remove Vehicle
                                        </button>
                                    )}

                                </div>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl w-full backdrop-blur-sm md:w-auto">
                                <h3 className="flex text-lg font-semibold gap-2 items-center mb-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Vehicle Details
                                </h3>
                                {yourVehicles.length > 0 ? (
                                    <div className="space-y-2">
                                        <select
                                            onChange={(e) => {
                                                const selected = yourVehicles.find(v => v.plate_number === e.target.value);
                                                setSelectedVehicle(selected);
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ease-in-out font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                            value={selectedVehicle?.plate_number || ""}
                                        >
                                            <option disabled value="" className="text-gray-400">
                                                Select vehicle
                                            </option>
                                            {yourVehicles.map((vehicle) => (
                                                <option
                                                    key={vehicle.plate_number}
                                                    value={vehicle.plate_number}
                                                    className="text-gray-700 hover:bg-blue-50"
                                                >
                                                    {vehicle.plate_number}
                                                </option>
                                            ))}
                                        </select>

                                        {selectedVehicle && (
                                            <div className="space-y-1 mt-4">
                                                <p className="font-mono">{selectedVehicle.plate_number}</p>
                                                <p className="text-sm text-white/80">{selectedVehicle.type}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : <p className="text-center text-xl">No vehicle found!</p>}

                            </div>
                        </div>
                    </div>}

                <div className="grid grid-cols-1 p-6 gap-4 lg:grid-cols-3 sm:grid-cols-2 sm:p-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 border border-gray-100 p-5 rounded-xl"
                        >
                            <div className="text-2xl text-indigo-900 font-bold mb-2">{stat.value}</div>
                            <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl text-gray-800 font-bold mb-6">Booking History</h2>
                    <div className="space-y-4">
                        {profileData.bookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gray-50 border-indigo-900 border-l-4 p-4 rounded-r-xl group hover:bg-white transition-colors"
                            >
                                <div className="flex flex-col justify-between gap-4 items-start sm:flex-row">
                                    <div className="flex-1">
                                        <h3 className="text-gray-800 text-lg font-semibold">{booking.place_name}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{booking.address}</p>
                                        <div className="flex flex-wrap gap-2 items-center mt-3">
                                            <span className="bg-indigo-100 rounded-full text-indigo-900 text-sm px-3 py-1">
                                                {new Date(booking.start_time).toLocaleDateString()}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-600 text-sm">
                                                {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {' '}
                                                {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="sm:text-right">
                                        <div className="text-gray-900 text-xl font-bold mb-2">${booking.price.toFixed(2)}</div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                                {booking.payment_method && (
                                    <div className="flex text-gray-500 text-sm gap-2 items-center mt-3">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
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