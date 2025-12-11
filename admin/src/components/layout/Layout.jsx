import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import Preloader from '../ui/Preloader';
import { Outlet } from "react-router-dom";
import { userAuth } from "../../store/store.jsx";

const Layout = ({ children, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onToggleSidebar={toggleSidebar} />
      
      <div className="flex justify-between">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}
        >
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your parking spaces, bookings, and payments efficiently
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-y-auto">
              <Outlet />
            </div>

            {/* Quick Stats Footer */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Revenue</p>
                    <p className="text-2xl font-bold">₹1,24,500</p>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
                <div className="mt-3 text-xs opacity-90">+12.5% from last month</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Active Bookings</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="text-3xl">🚗</div>
                </div>
                <div className="mt-3 text-xs opacity-90">+3 from yesterday</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Commission Earned</p>
                    <p className="text-2xl font-bold">₹24,900</p>
                  </div>
                  <div className="text-3xl">💳</div>
                </div>
                <div className="mt-3 text-xs opacity-90">15% from total revenue</div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>

      {/* Mobile sidebar toggle button (floating) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 left-6 lg:hidden z-50 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Layout;