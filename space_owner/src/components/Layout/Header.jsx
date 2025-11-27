import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiUser, FiChevronDown, FiChevronUp, FiMenu, FiMapPin, FiCreditCard, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { notifications, tabs } from '../constants/constants';
import { authApi } from '../../APIs/postApi';
import { userAuth } from '../store/Store';
import { useToast } from '../Toast/ToastProvider';


const Header = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "");
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await authApi.logout();
            if (res.success) {
                userAuth.getState().clearUser();
                navigate('/');
                showToast("Logout successfully!", "success")
            }
        } catch (error) {
            showToast('Something went wrong!', "error")
        }
    }
    return (
        <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
            {/* Left Section */}
            <div className="flex items-center space-x-5">
                <Link to={'/dashboard'}>
                    <div className="flex items-center">
                        <FiMapPin className="mr-2 text-indigo-600 text-3xl" />
                        <h1 className="text-xl font-bold text-gray-800">Spotly</h1>
                    </div>
                </Link>

                <div className="hidden md:flex">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const isActive = currentPath === tab;

                            return (
                                <button
                                    key={tab}
                                    onClick={() => navigate(`/${tab.replace(/\s+/g, '-')}`)}
                                    className={`px-3 py-2 text-md font-medium rounded-md capitalize transition-colors cursor-pointer
          ${isActive
                                            ? "text-indigo-600 underline underline-offset-4"
                                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 rounded-full hover:bg-gray-100 relative"
                    >
                        <FiBell className="text-gray-600 text-lg cursor-pointer" />
                        {notifications.some(n => !n.read) && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-gray-200"
                            >
                                <div className="p-3 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                                        >
                                            <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 p-1.5 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="bg-indigo-100 text-indigo-700 h-9 w-9 rounded-full flex items-center justify-center">
                            <FiUser className="text-indigo-600" />
                        </div>
                        <div className="hidden md:block">
                            <div className="text-sm font-medium text-gray-800">Parking Owner</div>
                            <div className="text-xs text-gray-500">Pro Account</div>
                        </div>
                        {showUserMenu ?
                            <FiChevronUp className="text-gray-500 ml-1" /> :
                            <FiChevronDown className="text-gray-500 ml-1" />
                        }
                    </button>

                    {/* User menu dropdown */}
                    <AnimatePresence>
                        {showUserMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-20 border border-gray-200"
                            >
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 text-left text-gray-700 hover:text-indigo-600 transition-color cursor-pointer font-semibold"
                                >
                                    <FiUser size={21} />
                                    <span className="text-sm">Profile</span>
                                </button>

                                <button
                                    onClick={() => navigate('/billing')}
                                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 text-left text-gray-700 hover:text-indigo-600 transition-color cursor-pointer font-semibold"
                                >
                                    <FiCreditCard size={21} />
                                    <span className="text-sm">Billing</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 text-left text-gray-700 hover:text-indigo-600 transition-color cursor-pointer font-semibold"
                                >
                                    <FiX size={21} />
                                    <span className="text-sm">Sign Out</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 text-xl"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <FiMenu />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-30 overflow-hidden"
                    >
                        <div className="p-2 flex flex-col">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        navigate(`/${tab}`);
                                        setMenuOpen(false);
                                    }}
                                    className="px-4 py-3 rounded-md text-left hover:bg-gray-100 capitalize font-medium text-gray-700"
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;