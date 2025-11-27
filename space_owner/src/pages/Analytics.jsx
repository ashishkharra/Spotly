import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiBarChart2,
    FiDollarSign,
    FiMapPin,
    FiClock,
    FiCalendar,
    FiUser,
    FiFilter,
    FiDownload,
    FiRefreshCw
} from 'react-icons/fi';
import { spaces, revenueAnalyticData, metricsData } from '../components/constants/constants';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('monthly');
    const [activeMetric, setActiveMetric] = useState('revenue');
    const currentData = revenueAnalyticData[timeRange];
    const currentMetric = metricsData[activeMetric];

    const maxRevenue = Math.max(...currentData.map(item => item.revenue));
    const maxMetric = Math.max(...currentMetric.data);

    return (
        <motion.div className="bg-gray-50 min-h-screen md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                            <FiBarChart2 className="mr-3 text-indigo-600" />
                            Parking Analytics
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Track performance and optimize your parking spaces
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                            <FiFilter className="mr-2" />
                            Filters
                        </button>

                        <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                            <FiDownload className="mr-2" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {Object.entries(metricsData).map(([key, metric]) => (
                        <motion.div
                            key={key}
                            whileHover={{ y: -5 }}
                            className={`bg-gradient-to-br ${metric.color} text-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${activeMetric === key ? 'ring-4 ring-indigo-300' : ''}`}
                            onClick={() => setActiveMetric(key)}
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold">{metric.title}</h3>
                                        <p className="text-indigo-100 mt-1">Across all spaces</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <metric.icon className="text-xl" />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-3xl font-bold">
                                        {metric.title === 'Revenue' ? `$${metric.data.reduce((a, b) => a + b, 0).toLocaleString()}`
                                            : metric.title === 'Bookings' ? metric.data.reduce((a, b) => a + b, 0)
                                                : `${Math.round(metric.data.reduce((a, b) => a + b, 0) / metric.data.length)}%`}
                                    </div>

                                    <div className="flex items-center mt-2 text-indigo-100">
                                        <FiRefreshCw className="mr-1" />
                                        <span>Updated 2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Revenue Trend</h2>
                            <div className="flex space-x-2">
                                <button
                                    className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'daily' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                                    onClick={() => setTimeRange('daily')}
                                >
                                    Daily
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'weekly' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                                    onClick={() => setTimeRange('weekly')}
                                >
                                    Weekly
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'monthly' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                                    onClick={() => setTimeRange('monthly')}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>

                        <div className="h-64">
                            <div className="flex items-end h-48 space-x-2">
                                {currentData.map((item, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div className="text-sm text-gray-500">
                                            {timeRange === 'monthly' ? item.month :
                                                timeRange === 'weekly' ? item.week : item.day}
                                        </div>
                                        <div className="relative flex-1 w-full flex items-end justify-center">
                                            <motion.div
                                                className="w-3/4 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(item.revenue / maxRevenue) * 90}%` }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                            />
                                        </div>
                                        <div className="text-xs mt-2 text-gray-600">
                                            ${(item.revenue / 1000).toFixed(1)}k
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Space Performance */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Space Performance</h2>
                            <div className="text-sm text-gray-500">By {currentMetric.title.toLowerCase()}</div>
                        </div>

                        <div className="space-y-4">
                            {spaces.map((space, index) => {
                                const value = currentMetric.data[index];
                                const percentage = (value / maxMetric) * 100;

                                return (
                                    <div key={space.id}>
                                        <div className="flex justify-between mb-1">
                                            <div className="flex items-center">
                                                <FiMapPin className="mr-2 text-indigo-600" />
                                                <span className="font-medium">{space.name}</span>
                                            </div>
                                            <span className="font-bold">
                                                {currentMetric.title === 'Revenue' ? `$${value}`
                                                    : currentMetric.title === 'Bookings' ? value
                                                        : `${value}%`}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${currentMetric.color.split(' ')[0]} ${currentMetric.color.split(' ')[1]}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Utilization Details */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Utilization Analysis</h2>
                        <div className="text-sm text-indigo-600 font-medium">Peak hours: 8AM-6PM</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
                                    <FiClock className="text-xl" />
                                </div>
                                <h3 className="font-bold text-gray-800">Peak Hours</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Your spaces are 92% utilized during peak business hours
                            </p>
                            <div className="text-blue-600 font-medium">Optimization tip: Increase rates during peak hours</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
                                    <FiUser className="text-xl" />
                                </div>
                                <h3 className="font-bold text-gray-800">Customer Patterns</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Most bookings (68%) are for 2-4 hour durations
                            </p>
                            <div className="text-green-600 font-medium">Offer discounted rates for longer stays</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 text-purple-800 p-2 rounded-lg mr-3">
                                    <FiMapPin className="text-xl" />
                                </div>
                                <h3 className="font-bold text-gray-800">Space Comparison</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Downtown Garage has 25% higher utilization than other spaces
                            </p>
                            <div className="text-purple-600 font-medium">Promote underutilized spaces with special offers</div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Optimization Recommendations</h2>
                        <span className="ml-3 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            3 Actions
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <div className="flex items-start mb-3">
                                <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                                    <FiDollarSign className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Dynamic Pricing</h3>
                                    <p className="text-gray-600 text-sm">
                                        Increase rates during peak hours to maximize revenue
                                    </p>
                                </div>
                            </div>
                            <div className="text-blue-600 text-sm font-medium">Potential revenue increase: 18%</div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <div className="flex items-start mb-3">
                                <div className="bg-green-500 text-white p-2 rounded-lg mr-3">
                                    <FiClock className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Extended Hours</h3>
                                    <p className="text-gray-600 text-sm">
                                        Open Westside Parking for night parking (10PM-6AM)
                                    </p>
                                </div>
                            </div>
                            <div className="text-green-600 text-sm font-medium">Potential utilization increase: 35%</div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <div className="flex items-start mb-3">
                                <div className="bg-purple-500 text-white p-2 rounded-lg mr-3">
                                    <FiUser className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Loyalty Program</h3>
                                    <p className="text-gray-600 text-sm">
                                        Implement a loyalty program for frequent parkers
                                    </p>
                                </div>
                            </div>
                            <div className="text-purple-600 text-sm font-medium">Potential retention increase: 42%</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;