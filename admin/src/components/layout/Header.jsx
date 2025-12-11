import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NotificationIcon,
  FullscreenIcon,
  EmailIcon,
  EditIcon,
  ProfileIcon,
  SettingsIcon,
  LogoutIcon
} from '../icons/index.jsx';
import { Link } from 'react-router-dom';
import { userAuth } from "../../store/store.jsx";
import useAxios from '../../hooks/useAxios.jsx'
import { adminAuthApi } from '../../apis/apis.js';
import Toast from '../ui/Toast.jsx';

const Header = ({ user, onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(27);
  const { sendRequest } = useAxios(adminAuthApi);
  const logout = userAuth(state => state.logout)

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleLogout = async () => {
    setShowToast(false);
    try {
      const res = await sendRequest('GET', '/logout', {});
      if (res.success) {
        logout();
        setTimeout(() => {
          setToastMessage(res.message || "Logged out successfully!");
          setToastType("success");
          setShowToast(true);
        }, 10);

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setTimeout(() => {
          setToastMessage(res.message || "Something went wrong!");
          setToastType("error");
          setShowToast(true);
        }, 10);
      }
    } catch (error) {
      setTimeout(() => {
        setToastMessage(error.message || "Something went wrong!");
        setToastType("error");
        setShowToast(true);
      }, 10);
    }
  }

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <header className="header sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="z-50 absolute">{showToast && <Toast message={toastMessage} type={toastType} />}</div>
      <div className="header-content">
        <nav className="navbar px-6 py-3">
          <div className="flex items-center justify-between w-full">
            {/* Left side - Hamburger for mobile */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                <FullscreenIcon className="w-5 h-5 text-gray-700" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </span>
              </button>

              {/* Messages */}
              <Link
                to="/messages"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
              >
                <EmailIcon className="w-5 h-5 text-gray-700" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Messages
                </span>
              </Link>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user?.profile_image || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-orange-100"
                  />
                  <div className="hidden md:block text-left">
                    <span className="text-sm font-semibold text-gray-900">
                      {capitalizeWords(user?.role || 'Admin User')}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -right-6 mt-2 w-70 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                    >
                      {/* Profile header */}
                      <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={user?.profile_image || '/default-avatar.png'}
                              alt="Profile"
                              className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <div>
                              <h4 className="text-white font-semibold">
                                {capitalizeWords(user?.username || 'Admin User')}
                              </h4>
                              <p className="text-orange-100 text-sm">{user?.email || 'admin@spotly.com'}</p>
                            </div>
                          </div>
                          <Link
                            to="/profile"
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <EditIcon className="w-5 h-5 text-white" />
                          </Link>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-3">
                          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer">
                            <div className="text-orange-500 group-hover:text-orange-600">
                              <ProfileIcon />
                            </div>
                            <span className="text-xs font-medium text-gray-700 mt-2">Profile</span>
                          </button>
                          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer">
                            <div className="text-orange-500 group-hover:text-orange-600">
                              <SettingsIcon />
                            </div>
                            <span className="text-xs font-medium text-gray-700 mt-2">Settings</span>
                          </button>
                          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer" onClick={handleLogout}>
                            <div className="text-orange-500 group-hover:text-orange-600">
                              <LogoutIcon />
                            </div>
                            <span className="text-xs font-medium text-gray-700 mt-2">Logout</span>
                          </button>
                        </div>
                      </div>

                      {/* Additional info */}
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Last login:</span>
                          <span className="text-gray-900 font-medium">{user?.last_login}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;