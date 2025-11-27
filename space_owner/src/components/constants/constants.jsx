import { FiCreditCard, FiSettings, FiUser, FiX, FiDollarSign, FiClock, FiCalendar } from "react-icons/fi";

// Static data arrays
export const notifications = [
  { id: 1, message: 'New booking at Downtown Garage', time: '2 hours ago', read: false },
  { id: 2, message: 'Payment received for booking #4582', time: '1 day ago', read: true },
  { id: 3, message: 'Westside Parking is now inactive', time: '2 days ago', read: true },
  { id: 4, message: 'You earned $120 yesterday', time: '3 days ago', read: true },
];

export const userMenuItems = [
  { label: 'Profile', icon: FiUser },
  { label: 'Billing', icon: FiCreditCard },
  { label: 'Settings', icon: FiSettings },
  { label: 'Sign out', icon: FiX }
];

export const tabs = ['dashboard', 'analytics', 'revenue', 'spaces'];

// Static spaces data (removed useState)
export const spaces = [
  { id: 1, name: 'Downtown Garage', address: '123 Main St', type: 'Garage', capacity: 50, occupied: 42, rate: '$5/hr', status: 'active', earnings: '$1,240' },
  { id: 2, name: 'Riverside Lot', address: '456 River Ave', type: 'Outdoor', capacity: 30, occupied: 28, rate: '$3/hr', status: 'active', earnings: '$890' },
  { id: 3, name: 'Central Plaza', address: '789 Center Blvd', type: 'Valet', capacity: 20, occupied: 15, rate: '$8/hr', status: 'active', earnings: '$1,120' },
  { id: 4, name: 'Westside Parking', address: '101 West St', type: 'Garage', capacity: 40, occupied: 12, rate: '$4/hr', status: 'inactive', earnings: '$0' },
];

// Static bookings data (removed useState)
export const bookings = [
  { id: 1, space: 'Downtown Garage', user: 'John Smith', duration: '3 hours', amount: '$15.00', date: 'Aug 15, 2023', status: 'completed', time: '10:30 AM' },
  { id: 2, space: 'Riverside Lot', user: 'Emily Johnson', duration: '2 hours', amount: '$6.00', date: 'Aug 14, 2023', status: 'completed', time: '2:15 PM' },
  { id: 3, space: 'Central Plaza', user: 'Michael Brown', duration: '5 hours', amount: '$40.00', date: 'Aug 14, 2023', status: 'completed', time: '9:45 AM' },
  { id: 4, space: 'Downtown Garage', user: 'Sarah Davis', duration: '1 hour', amount: '$5.00', date: 'Aug 13, 2023', status: 'completed', time: '4:20 PM' },
  { id: 5, space: 'Riverside Lot', user: 'David Wilson', duration: '4 hours', amount: '$12.00', date: 'Aug 13, 2023', status: 'completed', time: '11:30 AM' },
  { id: 6, space: 'Central Plaza', user: 'Lisa Taylor', duration: '6 hours', amount: '$48.00', date: 'Aug 12, 2023', status: 'completed', time: '8:00 AM' },
];

export const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 5100 },
  { month: 'Apr', revenue: 6800 },
  { month: 'May', revenue: 7200 },
  { month: 'Jun', revenue: 8900 },
  { month: 'Jul', revenue: 9800 },
  { month: 'Aug', revenue: 2400 },
  { month: 'Sep', revenue: 400 },
  { month: 'Oct', revenue: 1400 },
  { month: 'Nov', revenue: 1200 },
  { month: 'Dec', revenue: 200 },
];
export const maxRevenue = Math.max(...revenueData.map(item => item.revenue));

// Derived values
export const totalSpaces = spaces.length;
export const activeSpaces = spaces.filter(space => space.status === 'active').length;

// Fixed division by zero issue
export const avgUtilization = activeSpaces > 0
  ? spaces.reduce((sum, space) => {
    if (space.status === 'active') {
      return sum + (space.occupied / space.capacity);
    }
    return sum;
  }, 0) / activeSpaces * 100
  : 0;

export const totalRevenue = spaces.reduce(
  (sum, space) => sum + parseFloat(space.earnings.replace(/[^0-9.-]+/g, "") || 0),
  0
);

export const revenueAnalyticData = {
  monthly: [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 6800 },
    { month: 'May', revenue: 7200 },
    { month: 'Jun', revenue: 8900 },
    { month: 'Jul', revenue: 9800 },
    { month: 'Aug', revenue: 12400 },
  ],
  weekly: [
    { week: 'W1', revenue: 1800 },
    { week: 'W2', revenue: 2200 },
    { week: 'W3', revenue: 3100 },
    { week: 'W4', revenue: 2800 },
  ],
  daily: [
    { day: 'Mon', revenue: 1200 },
    { day: 'Tue', revenue: 1800 },
    { day: 'Wed', revenue: 2100 },
    { day: 'Thu', revenue: 1900 },
    { day: 'Fri', revenue: 2500 },
    { day: 'Sat', revenue: 2900 },
    { day: 'Sun', revenue: 2200 },
  ]
};

export const metricsData = {
  revenue: {
    title: 'Revenue',
    icon: FiDollarSign,
    color: 'from-green-500 to-emerald-500',
    data: spaces.map(space => space.revenue)
  },
  utilization: {
    title: 'Utilization',
    icon: FiClock,
    color: 'from-blue-500 to-cyan-500',
    data: spaces.map(space => space.utilization)
  },
  bookings: {
    title: 'Bookings',
    icon: FiCalendar,
    color: 'from-purple-500 to-indigo-500',
    data: spaces.map(space => space.bookings)
  }
};