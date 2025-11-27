import { FiDollarSign, FiActivity, FiCreditCard, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { revenueData, bookings, totalRevenue, maxRevenue } from "../components/constants/constants";

const Revenue = () => {
    return (

        <div className="p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Revenue Overview</h2>
                <p className="text-gray-600">Track your earnings and payment history</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                        <div className="p-3 bg-indigo-100 rounded-lg">
                            <FiDollarSign className="text-indigo-600 text-xl" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</div>
                    <div className="flex items-center mt-2 text-green-600">
                        <FiActivity className="mr-1" />
                        <span>+12.4% from last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Available Balance</h3>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FiCreditCard className="text-green-600 text-xl" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">$8,200</div>
                    <div className="mt-2 text-gray-600">Next payout: Aug 15, 2023</div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Avg. per Space</h3>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <FiStar className="text-purple-600 text-xl" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">$1,240</div>
                    <div className="flex items-center mt-2 text-green-600">
                        <FiActivity className="mr-1" />
                        <span>+8.2% from last month</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 md:mb-0">Monthly Revenue</h3>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">2023</button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm">2022</button>
                    </div>
                </div>

                <div className="mt-16 w-full">
                    <div className="flex items-end h-64 space-x-1 mb-4">
                        {revenueData.map((item, index) => (
                            <div
                                key={index}
                                className="flex-1 min-w-[1.5rem] max-w-[4rem] flex flex-col items-center bar-item"
                            >
                                <div className="text-xs text-gray-500">{item.month}</div>
                                <motion.div
                                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md"
                                    initial={{ height: 0 }}
                                    animate={{ height: ((item.revenue / 2000) * 100) / 2 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                />
                                <div className="text-xs mt-1 text-gray-600">
                                    ${(item.revenue / 1000).toFixed(1)}k
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
  @media (max-width: 483px) {
    .bar-item {
      min-width: 1rem !important;
      max-width: 3rem !important;
    }
  }
`}</style>


            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Transaction History</h3>
                    <button className="text-indigo-600 font-medium">Export CSV</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Space</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{booking.date}</div>
                                        <div className="text-sm text-gray-500">{booking.time}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.space}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{booking.user}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{booking.amount}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Revenue