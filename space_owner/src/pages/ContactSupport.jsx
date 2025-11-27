import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiClock, 
  FiHelpCircle,
  FiSearch,
  FiChevronDown,
  FiExternalLink,
  FiCheckCircle
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ContactSupport = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ data
  const faqCategories = [
    {
      id: 'account',
      title: 'Account & Billing',
      questions: [
        {
          q: 'How do I reset my password?',
          a: 'You can reset your password from the login page by clicking "Forgot Password" and following the instructions sent to your email.'
        },
        {
          q: 'How do I update my payment method?',
          a: 'Go to your Account Settings > Payment Methods to add or update your payment information.'
        }
      ]
    },
    {
      id: 'spaces',
      title: 'Managing Spaces',
      questions: [
        {
          q: 'How do I add a new parking space?',
          a: 'From your dashboard, click "Add New Space" and fill out the required information about your parking location.'
        },
        {
          q: 'Can I change the pricing for my space?',
          a: 'Yes, you can adjust pricing at any time from the "My Spaces" section of your dashboard.'
        }
      ]
    },
    {
      id: 'bookings',
      title: 'Bookings & Reservations',
      questions: [
        {
          q: 'How do I handle a no-show?',
          a: 'Our system automatically handles no-shows according to your cancellation policy. You can review these settings in your space details.'
        },
        {
          q: 'Can I block off dates when my space is unavailable?',
          a: 'Yes, you can set unavailable dates in your space calendar to prevent bookings during those times.'
        }
      ]
    }
  ];

  // Support topics for the form
  const supportTopics = [
    'Account Issues',
    'Billing Questions',
    'Space Management',
    'Booking Problems',
    'Technical Support',
    'Feature Request',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({ selectedTopic, message });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedTopic('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            How can we help you?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Get answers to your questions about Spotly parking management
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search for answers..."
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Support
          </button>
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors ${
              activeTab === 'resources'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>

        {/* Contact Form */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What can we help you with?
                      </label>
                      <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Select a topic</option>
                        {supportTopics.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Please describe your issue in detail..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <FiMail className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Email</h4>
                      <p className="text-gray-600">support@spotly.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <FiPhone className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <FiMessageSquare className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Live Chat</h4>
                      <p className="text-gray-600">Available 24/7</p>
                      <button className="mt-2 text-indigo-600 hover:text-indigo-700 font-medium">
                        Start a chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">System Status</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">API Services</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      Operational
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Payment Processing</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      Operational
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Mobile App</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      Partial Outage
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link to="/status" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                    View status page <FiExternalLink className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {faqCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <h3 className="text-lg font-bold text-gray-800 p-6 border-b border-gray-200">
                  {category.title}
                </h3>
                
                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, index) => (
                    <div key={index} className="p-6">
                      <button className="flex justify-between items-center w-full text-left">
                        <span className="font-medium text-gray-800">{item.q}</span>
                        <FiChevronDown className="text-gray-500" />
                      </button>
                      <div className="mt-3 text-gray-600">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <FiHelpCircle className="text-indigo-600 text-3xl mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Still need help?</h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Our support team is ready to help you.
              </p>
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium"
                onClick={() => setActiveTab('contact')}
              >
                Contact Support
              </button>
            </div>
          </motion.div>
        )}

        {/* Resources Section */}
        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiHelpCircle className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Getting Started Guide</h3>
              <p className="text-gray-600 mb-4">
                Learn how to set up your account and start managing your parking spaces.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                Read guide <FiExternalLink className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiMessageSquare className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with other Spotly space owners and share tips and best practices.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                Join discussion <FiExternalLink className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiClock className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Watch step-by-step videos on how to use Spotly's advanced features.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                Watch videos <FiExternalLink className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiMail className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">API Documentation</h3>
              <p className="text-gray-600 mb-4">
                Technical resources for developers looking to integrate with Spotly.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View docs <FiExternalLink className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiHelpCircle className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Blog</h3>
              <p className="text-gray-600 mb-4">
                Read articles on parking management best practices and industry trends.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                Read blog <FiExternalLink className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiMessageSquare className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Webinars</h3>
              <p className="text-gray-600 mb-4">
                Join live or watch recorded webinars to deepen your Spotly knowledge.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View schedule <FiExternalLink className="ml-1" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactSupport;