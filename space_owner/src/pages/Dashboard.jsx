import { spaces, bookings, totalSpaces, activeSpaces, totalRevenue, avgUtilization } from '../components/constants/constants';
import { motion } from 'framer-motion';
import {
    FiDollarSign,
    FiMapPin,
    FiBarChart2,
    FiActivity,
} from 'react-icons/fi';

const Dashboard = () => {
    return (
        <div>
            <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-700">Total Spaces</h3>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FiMapPin className="text-blue-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-gray-800">{totalSpaces}</div>
                            <div className="flex items-center mt-2">
                                <span className="text-green-600 font-medium">{activeSpaces} active</span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span className="text-gray-500">{totalSpaces - activeSpaces} inactive</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-700">Monthly Revenue</h3>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <FiDollarSign className="text-green-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</div>
                            <div className="flex items-center mt-2">
                                <span className="text-green-600 font-medium flex items-center">
                                    <FiActivity className="mr-1" /> +12.4%
                                </span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span className="text-gray-500">from last month</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-700">Utilization Rate</h3>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <FiBarChart2 className="text-purple-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold text-gray-800">{avgUtilization.toFixed(1)}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                    className="bg-purple-600 h-2 rounded-full"
                                    style={{ width: `${avgUtilization}%` }}
                                ></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Parking Space Performance</h3>
                            <button className="text-blue-600 text-sm font-medium">View All</button>
                        </div>

                        <div className="space-y-4">
                            {spaces.filter(space => space.status === 'active').map((space, index) => (
                                <div key={space.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-800">{space.name}</h4>
                                        <p className="text-sm text-gray-500">{space.address}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-800">{space.earnings}</div>
                                        <div className="text-sm text-gray-500">
                                            {space.occupied}/{space.capacity} spots
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl shadow-md p-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
                            <button className="text-blue-600 text-sm font-medium">View All</button>
                        </div>

                        <div className="space-y-4">
                            {bookings.slice(0, 4).map(booking => (
                                <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-800">{booking.space}</h4>
                                        <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-800">{booking.amount}</div>
                                        <div className="text-sm text-gray-500">{booking.user}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">This Month</button>
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm">Last Month</button>
                        </div>
                    </div>

                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;