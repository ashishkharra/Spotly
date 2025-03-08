import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const menuItems = [
        { name: 'Home', path: '/Spotly' },
        { name: 'Find Parking', path: '/find-parking' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];
    const location = useLocation();
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
        <header className="sticky top-0 z-100 bg-white">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors flex justify-center items-center"
                        >
                            <img src="/assets/Images/location.png" alt="" className='w-10'/>
                            <span>Spotly</span>
                        </motion.span>
                    </Link>

                    {/* Desktop Menu (789px और ऊपर) */}
                    <div className="hidden min-[789px]:flex justify-center items-center space-x-3 lg:space-x-8">
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
                                        to={item.path}
                                        className={`relative text-gray-700 text-center font-semibold hover:text-orange-500 transition-colors ${isActive ? 'text-orange-600' : ''
                                            }`}
                                            style={{fontSize : '16.5px'}}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.span
                                                className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                        <motion.span
                                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500"
                                            whileHover={{ width: '100%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Buttons (789px और ऊपर) */}
                    <div className="hidden min-[789px]:flex items-center space-x-3 lg:space-x-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                            >
                                Sign In
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/host"
                                className="px-4 py-2 rounded-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors"
                            >
                                List Your Space
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Toggle Button (788px और नीचे) */}
                    <motion.button
                        onClick={toggleMenu}
                        className="flex max-[788px]:flex min-[789px]:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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

                {/* Mobile Menu (788px और नीचे) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="min-[789px]:hidden absolute left-0 right-0 bg-white shadow-lg"
                            ref={menuRef}
                        >
                            <div className="px-4 pt-2 pb-4 space-y-4">
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
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Link
                                            to="/register"
                                            className="block w-full text-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                        >
                                            Sign In
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Link
                                            to="/host"
                                            className="block w-full text-center px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
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