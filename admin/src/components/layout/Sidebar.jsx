import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiGift,
  FiFileText,
  FiCode,
  FiDatabase,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import { FaExchangeAlt, FaHeadset } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const menuItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    {
      icon: <FiUsers />,
      label: 'Vendor',
      children: [
        { path: '/vendor', label: 'Vendor' }
      ]
    },
    {
      icon: <FiUser />,
      label: 'Customer',
      children: [
        { path: '/customer', label: 'Customer' }
      ]
    },
    {
      icon: <FiCalendar />,
      label: 'Booking',
      children: [
        { path: '/booking/today', label: 'Today Booking' },
        { path: '/booking/all', label: 'All Booking' }
      ]
    },
    {
      icon: <FiDollarSign />,
      label: 'Payment',
      children: [
        { path: '/payment/history', label: 'Payment History' },
        { path: '/payment/payout', label: 'Payout' }
      ]
    },
    {
      icon: <FiGift />,
      label: 'Referrals',
      children: [
        { path: '/coupon', label: 'Coupons' }
      ]
    },
    {
      icon: <FiFileText />,
      label: 'Report',
      children: [
        { path: '/report', label: 'Report' }
      ]
    },
    {
      icon: <FaExchangeAlt />,
      label: 'APIs',
      children: [
        { path: '/apis', label: 'APIs' }
      ]
    },
    { path: '/data', icon: <FiDatabase />, label: 'Data' },
    {
      icon: <FiSettings />,
      label: 'Settings',
      children: [
        { path: '/settings/commission', label: 'Commission' },
        { path: '/settings/payment', label: 'Payment' },
        { path: '/setting/content', label: 'Content' }
      ]
    },
    { path: '/support', icon: <FaHeadset />, label: 'Technical Support' },
  ];

  const toggleItem = (label) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute inset-0 text-white bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -280,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 sm:top-18 h-screen bg-gradient-to-b from-orange-50 to-white border-r border-orange-100 shadow-xl z-40 sm:z-10 w-64 overflow-y-auto"
      >
        {/* Logo */}
        <div className="p-6 border-b border-orange-200">
          <Link to="/" className="flex items-center justify-center">
            <img
              src="/images/lehLogo2.png"
              alt="Spotly Logo"
              className="h-12 w-auto"
            />
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Spotly
            </span>
          </Link>
          <p className="text-xs text-gray-500 text-center mt-2">Smart Parking Solutions</p>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleItem(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        expandedItems[item.label] 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'hover:bg-orange-50 text-gray-700 hover:text-orange-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedItems[item.label] ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedItems[item.label] ? 'auto' : 0,
                        opacity: expandedItems[item.label] ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="pl-11 mt-1 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              to={child.path}
                              className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                isActive(child.path)
                                  ? 'bg-orange-500 text-white'
                                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                              }`}
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path, item.exact)
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={onClose}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Stats Summary */}
        <div className="mt-auto p-4 border-t border-orange-200">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Active Bookings</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Today's Revenue</span>
                  <span className="font-semibold">₹12,450</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-2/3"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Commission</span>
                  <span className="font-semibold">₹2,490</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;