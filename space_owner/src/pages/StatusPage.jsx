import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiActivity, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiXCircle, 
  FiClock,
  FiRefreshCw,
  FiRss,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiExternalLink
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const StatusPage = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock data for services status
  const services = [
    {
      id: 'api',
      name: 'API Services',
      status: 'operational',
      description: 'Core backend API for all Spotly functionality',
      uptime: '99.98%',
      responseTime: '142ms',
      history: [
        { time: '2 hours ago', status: 'operational' },
        { time: 'Yesterday', status: 'degraded' },
        { time: '1 week ago', status: 'operational' },
      ]
    },
    {
      id: 'payments',
      name: 'Payment Processing',
      status: 'operational',
      description: 'Credit card processing and transaction management',
      uptime: '99.99%',
      responseTime: '208ms',
      history: [
        { time: '5 hours ago', status: 'operational' },
        { time: '3 days ago', status: 'operational' },
        { time: '2 weeks ago', status: 'maintenance' },
      ]
    },
    {
      id: 'database',
      name: 'Database',
      status: 'degraded',
      description: 'Primary data storage and query processing',
      uptime: '99.87%',
      responseTime: '89ms',
      history: [
        { time: '30 minutes ago', status: 'degraded' },
        { time: '2 hours ago', status: 'operational' },
        { time: 'Yesterday', status: 'operational' },
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      status: 'outage',
      description: 'iOS and Android mobile applications',
      uptime: '97.45%',
      responseTime: 'N/A',
      history: [
        { time: '15 minutes ago', status: 'outage' },
        { time: '1 hour ago', status: 'degraded' },
        { time: '2 hours ago', status: 'operational' },
      ]
    },
    {
      id: 'notifications',
      name: 'Notifications',
      status: 'maintenance',
      description: 'Email, SMS, and push notification services',
      uptime: '99.92%',
      responseTime: '312ms',
      history: [
        { time: '45 minutes ago', status: 'maintenance' },
        { time: '2 hours ago', status: 'operational' },
        { time: 'Yesterday', status: 'operational' },
      ]
    },
    {
      id: 'website',
      name: 'Public Website',
      status: 'operational',
      description: 'Spotly marketing website and landing pages',
      uptime: '99.97%',
      responseTime: '76ms',
      history: [
        { time: '5 hours ago', status: 'operational' },
        { time: 'Yesterday', status: 'operational' },
        { time: '1 week ago', status: 'operational' },
      ]
    }
  ];

  // Mock data for incidents
  const incidents = [
    {
      id: 1,
      title: 'Mobile App Connectivity Issues',
      status: 'investigating',
      severity: 'major',
      services: ['mobile'],
      started: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      updates: [
        {
          time: new Date(Date.now() - 15 * 60 * 1000),
          status: 'identified',
          message: 'We\'re investigating reports of connectivity issues with our mobile applications.'
        },
        {
          time: new Date(Date.now() - 10 * 60 * 1000),
          status: 'investigating',
          message: 'Our engineering team has identified the issue and is working on a fix.'
        }
      ]
    },
    {
      id: 2,
      title: 'Database Performance Degradation',
      status: 'monitoring',
      severity: 'minor',
      services: ['database'],
      started: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      resolved: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      updates: [
        {
          time: new Date(Date.now() - 30 * 60 * 1000),
          status: 'investigating',
          message: 'We\'re seeing increased response times from our primary database cluster.'
        },
        {
          time: new Date(Date.now() - 20 * 60 * 1000),
          status: 'update',
          message: 'We\'ve identified the cause as a slow-running query and are optimizing it.'
        },
        {
          time: new Date(Date.now() - 5 * 60 * 1000),
          status: 'resolved',
          message: 'The query has been optimized and database performance has returned to normal levels.'
        }
      ]
    },
    {
      id: 3,
      title: 'Scheduled Maintenance: Notification Services',
      status: 'completed',
      severity: 'maintenance',
      services: ['notifications'],
      started: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      resolved: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      updates: [
        {
          time: new Date(Date.now() - 3 * 60 * 60 * 1000),
          status: 'scheduled',
          message: 'We\'ll be performing maintenance on our notification services to improve performance.'
        },
        {
          time: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'in_progress',
          message: 'Maintenance has started. Notification services may be temporarily unavailable.'
        },
        {
          time: new Date(Date.now() - 45 * 60 * 1000),
          status: 'completed',
          message: 'Maintenance has been completed successfully. All notification services are operational.'
        }
      ]
    }
  ];

  // Calculate overall status based on services
  const overallStatus = services.every(s => s.status === 'operational') 
    ? 'operational' 
    : services.some(s => s.status === 'outage') 
      ? 'outage' 
      : services.some(s => s.status === 'degraded') 
        ? 'degraded' 
        : 'maintenance';

  const statusConfig = {
    operational: { label: 'All Systems Operational', color: 'bg-green-500', icon: FiCheckCircle },
    degraded: { label: 'Partial System Degradation', color: 'bg-yellow-500', icon: FiAlertTriangle },
    outage: { label: 'Major Service Outage', color: 'bg-red-500', icon: FiXCircle },
    maintenance: { label: 'Maintenance in Progress', color: 'bg-indigo-500', icon: FiClock }
  };

  const StatusIndicator = ({ status, size = 'normal' }) => {
    const config = statusConfig[status] || statusConfig.operational;
    const Icon = config.icon;
    const sizeClass = size === 'large' ? 'w-4 h-4' : 'w-3 h-3';
    
    return (
      <div className="flex items-center">
        <div className={`rounded-full ${config.color} ${sizeClass} mr-2`}></div>
        <Icon className={`${size === 'large' ? 'text-lg' : 'text-sm'} ${config.color.replace('bg-', 'text-')}`} />
        <span className="ml-1 capitalize">{status}</span>
      </div>
    );
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (start, end = new Date()) => {
    const diffMs = Math.abs(end - start);
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Spotly Status</h1>
              <p className="text-gray-600">Real-time information about Spotly services</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <FiRefreshCw className="mr-1" />
                Refresh
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <FiRss className="mr-1" />
                RSS
              </button>
              <Link 
                to="/support" 
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">System Status</h2>
              <div className="flex items-center">
                <StatusIndicator status={overallStatus} size="large" />
                <span className="ml-4 text-gray-600 text-sm">
                  Last updated: {formatDate(lastUpdated)}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {services.filter(s => s.status === 'operational').length} Operational
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {services.filter(s => s.status === 'degraded').length} Degraded
                </div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  {services.filter(s => s.status === 'outage').length} Outage
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  selectedService === service.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedService(
                  selectedService === service.id ? null : service.id
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{service.name}</h3>
                  <StatusIndicator status={service.status} />
                </div>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Uptime: {service.uptime}</span>
                  <span>Response: {service.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Incidents */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Incidents</h2>
              
              {incidents.filter(i => i.status !== 'completed' && i.status !== 'resolved').length > 0 ? (
                <div className="space-y-4">
                  {incidents
                    .filter(i => i.status !== 'completed' && i.status !== 'resolved')
                    .map((incident) => (
                      <div key={incident.id} className="border-l-4 border-red-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{incident.title}</h3>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            {incident.severity === 'major' ? 'Major' : 'Minor'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Started: {formatDate(incident.started)} • 
                          Duration: {formatDuration(incident.started)}
                        </p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-800 text-sm mb-2">Latest Update</h4>
                          <p className="text-gray-600 text-sm">
                            {incident.updates[incident.updates.length - 1].message}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">
                            {formatDate(incident.updates[incident.updates.length - 1].time)}
                          </p>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm mt-2">
                          View all updates
                        </button>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No active incidents</h3>
                  <p className="text-gray-600">All systems are operating normally.</p>
                </div>
              )}
            </motion.div>

            {/* Past Incidents */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Past Incidents</h2>
              
              {incidents.filter(i => i.status === 'completed' || i.status === 'resolved').length > 0 ? (
                <div className="space-y-4">
                  {incidents
                    .filter(i => i.status === 'completed' || i.status === 'resolved')
                    .map((incident) => (
                      <div key={incident.id} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{incident.title}</h3>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Resolved
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {formatDate(incident.started)} - {formatDate(incident.resolved)} • 
                          Duration: {formatDuration(incident.started, incident.resolved)}
                        </p>
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                          View incident details
                        </button>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">No past incidents in the last 30 days.</p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Subscribe Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="font-bold text-gray-800 mb-4">Stay Updated</h3>
              
              {isSubscribed ? (
                <div className="text-center py-4">
                  <FiCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
                  <p className="text-gray-600">You're subscribed to status updates!</p>
                  <button 
                    className="text-indigo-600 hover:text-indigo-700 text-sm mt-2"
                    onClick={() => setIsSubscribed(false)}
                  >
                    Unsubscribe
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 text-sm mb-4">
                    Get notified when services are updated, degraded, or back to normal.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm">
                      Subscribe via Email
                    </button>
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm">
                      Subscribe via SMS
                    </button>
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm flex items-center justify-center">
                      <FiRss className="mr-2" />
                      RSS Feed
                    </button>
                  </div>
                </>
              )}
            </motion.div>

            {/* System Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="font-bold text-gray-800 mb-4">System Metrics</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">API Latency</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      <FiArrowDown className="mr-1" />
                      142ms
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium text-green-600">0.02%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Uptime (30 days)</span>
                    <span className="text-sm font-medium text-green-600">99.97%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.97%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status History */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="font-bold text-gray-800 mb-4">Status History</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Today</span>
                  <StatusIndicator status="operational" />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Yesterday</span>
                  <StatusIndicator status="degraded" />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Past 7 days</span>
                  <StatusIndicator status="operational" />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Past 30 days</span>
                  <StatusIndicator status="operational" />
                </div>
              </div>
              
              <button className="w-full mt-4 text-center text-indigo-600 hover:text-indigo-700 text-sm">
                View full history
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Spotly Inc. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                API Status
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StatusPage;