import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { userAuth } from "../Store";

const Header = () => {
    const user = userAuth((state) => state.user);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Find Parking', path: '/find-parking' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];
    const location = useLocation();
    const hideMenu = location.pathname === "/register";
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest("button[aria-label='Toggle navigation menu']")
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <header className="bg-white sticky top-0 z-100">
            <nav className="lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex h-16 justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex justify-center text-2xl text-gray-900 font-bold hover:text-orange-500 items-center transition-colors"
                        >
                            <img src="/assets/Images/location.png" alt="" className='w-10' />
                            <span>Spotly</span>
                        </motion.span>
                    </Link>

                    {!hideMenu && (
                        <div className="justify-center hidden items-center lg:space-x-8 min-[789px]:flex space-x-3">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <motion.div
                                        key={item.path}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative"
                                    >
                                        <Link
                                            title={item.name}
                                            to={item.path}
                                            className={`relative text-gray-700 text-center font-semibold hover:text-orange-500 transition-colors ${isActive ? 'text-orange-600' : ''
                                                }`}
                                            style={{ fontSize: '16.5px' }}
                                        >
                                            {item.name}
                                            {isActive && (
                                                <motion.span
                                                    className="bg-orange-500 h-0.5 w-full absolute bottom-0 left-0"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                            <motion.span
                                                className="bg-orange-500 h-0.5 w-0 absolute bottom-0 left-0"
                                                whileHover={{ width: '100%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}


                    {!hideMenu && (
                        <div className="hidden items-center lg:space-x-4 min-[789px]:flex space-x-3">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {user ? (
                                    <Link to="/profile">
                                        <img src="/assets/Images/person1.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                                    </Link>
                                ) : (
                                    <Link
                                        to="/register"
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/list-space"
                                    className="border-2 border-orange-500 rounded-lg text-orange-500 hover:bg-orange-50 px-4 py-2 transition-colors"
                                >
                                    List Your Space
                                </Link>
                            </motion.div>
                        </div>
                    )}

                    <motion.button
                        onClick={toggleMenu}
                        className="flex p-2 rounded-md text-gray-700 hover:bg-gray-100 max-[788px]:flex min-[789px]:hidden"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                initial={false}
                                animate={{ d: isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }}
                                transition={{ duration: 0.3 }}
                            />
                        </svg>
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white shadow-lg absolute left-0 min-[789px]:hidden right-0"
                            ref={menuRef}
                        >
                            <div className="pb-4 pt-2 px-4 space-y-4">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className="rounded-lg text-gray-700 block hover:bg-gray-50 px-4 py-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="border-gray-100 border-t pt-4 space-y-4">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {user ? (
                                            <Link to="/profile">
                                                <img src="/assets/Images/person1.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/register"
                                                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                            >
                                                Sign In
                                            </Link>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Link
                                            to="/host"
                                            className="border-2 border-orange-500 rounded-lg text-center text-orange-500 w-full block hover:bg-orange-50 px-4 py-2"
                                        >
                                            List Your Space
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;