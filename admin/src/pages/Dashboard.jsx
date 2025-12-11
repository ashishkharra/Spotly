import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const stats = [
    { icon: <FiDollarSign />, label: 'Total Revenue', value: '₹1,24,500', change: '+12.5%', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: <FiUsers />, label: 'Total Vendors', value: '128', change: '+8', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: <FiCalendar />, label: 'Active Bookings', value: '24', change: '+3', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: <FiMapPin />, label: 'Parking Spaces', value: '356', change: '+12', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 65000, commission: 13000 },
    { month: 'Feb', revenue: 78000, commission: 15600 },
    { month: 'Mar', revenue: 89000, commission: 17800 },
    { month: 'Apr', revenue: 95000, commission: 19000 },
    { month: 'May', revenue: 112000, commission: 22400 },
    { month: 'Jun', revenue: 124500, commission: 24900 },
  ];

  const recentBookings = [
    { id: '#BK001', vendor: 'Mall Parking', customer: 'John Doe', time: '10:30 AM', amount: '₹250', status: 'Active' },
    { id: '#BK002', vendor: 'Street Parking', customer: 'Jane Smith', time: '11:15 AM', amount: '₹150', status: 'Completed' },
    { id: '#BK003', vendor: 'Airport Parking', customer: 'Bob Johnson', time: '12:45 PM', amount: '₹500', status: 'Active' },
    { id: '#BK004', vendor: 'Hotel Parking', customer: 'Alice Brown', time: '1:30 PM', amount: '₹300', status: 'Pending' },
    { id: '#BK005', vendor: 'Shopping Complex', customer: 'Charlie Wilson', time: '2:15 PM', amount: '₹200', status: 'Active' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                <FiTrendingUp className="inline mr-1" />
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Last quarter</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="commission" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Commission (20%)</span>
            </div>
          </div>
        </div>
        {/* Recent Bookings */}
        <div className="p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{booking.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {booking.vendor} • {booking.customer}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{booking.amount}</div>
                  <div className="text-sm text-gray-500">{booking.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Need quick actions?</h3>
            <p className="text-gray-600 mt-1">Manage your parking ecosystem efficiently</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Add New Vendor
            </button>
            <button className="px-4 py-2 bg-white text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors font-medium">
              View Reports
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all text-left">
            <FiAlertCircle className="text-orange-500 text-xl mb-2" />
            <div className="font-medium text-gray-900">Pending Approvals</div>
            <div className="text-sm text-gray-600">3 vendor requests</div>
          </button>
          
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all text-left">
            <FiDollarSign className="text-green-500 text-xl mb-2" />
            <div className="font-medium text-gray-900">Process Payouts</div>
            <div className="text-sm text-gray-600">₹8,450 pending</div>
          </button>
          
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all text-left">
            <FiCalendar className="text-blue-500 text-xl mb-2" />
            <div className="font-medium text-gray-900">Booking Alerts</div>
            <div className="text-sm text-gray-600">5 upcoming slots</div>
          </button>
          
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all text-left">
            <FiUsers className="text-purple-500 text-xl mb-2" />
            <div className="font-medium text-gray-900">Customer Support</div>
            <div className="text-sm text-gray-600">12 open tickets</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;