import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
    const quickLinks = [
        { id: 1, text: 'Home', link: '/' },
        { id: 2, text: 'Find Parking', link: '/find-parking' },
        { id: 3, text: 'About', link: '/about' },
        { id: 4, text: 'Contact', link: '/contact' },

    ]
    const currentYear = new Date().getFullYear();
    
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const staggerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="w-full bg-slate-900 text-white relative overflow-hidden">
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 bg-orange-500 p-3 rounded-full shadow-lg z-50"
            >
                <FiArrowUp className="text-white text-xl" />
            </motion.button>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={sectionVariants}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl font-bold mb-4">Spotly</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Pioneering digital transformation through innovative solutions that empower businesses 
                                to thrive in the modern marketplace.
                            </p>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={sectionVariants}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                        <motion.ul
                            variants={staggerVariants}
                            className="space-y-3"
                        >
                            {quickLinks.map((tabs) => (
                                <motion.li key={tabs.id} variants={itemVariants}>
                                    <Link 
                                        to={tabs.link} 
                                        className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {tabs.text}
                                    </Link>
                                    
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={sectionVariants}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-xl font-bold mb-6">Stay Updated</h3>
                        <motion.div variants={itemVariants}>
                            <p className="text-gray-400 mb-6">
                                Join our newsletter for exclusive insights and early access to new features.
                            </p>
                            <form className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    Subscribe Now
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={sectionVariants}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
                        <motion.div
                            variants={staggerVariants}
                            className="space-y-4"
                        >
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center text-gray-400">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Jaipur, Mansarover
                                </div>
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center text-gray-400">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    contact@spotly.io
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex space-x-6 mt-6">
                                {['linkedin', 'twitter', 'github', 'dribbble'].map((platform, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="text-gray-400 hover:text-orange-500 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        </svg>
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="border-t border-gray-800 mt-16 pt-8 text-center"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 space-y-4 md:space-y-0">
                        <div className="order-2 md:order-1">
                            &copy; {currentYear} Spotly Technologies. All rights reserved.
                        </div>
                        <div className="flex space-x-6 order-1 md:order-2">
                            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;