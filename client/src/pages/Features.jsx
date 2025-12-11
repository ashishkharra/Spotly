import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Car, CreditCard, Shield, Clock, Smartphone, BarChart, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 text-gray-900">

      {/* Header Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center max-w-3xl mx-auto px-6"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Powerful Features Designed for Parking Owners & Users</h1>
        <p className="text-gray-600 text-lg">Spotly brings a complete ecosystem that helps individuals find parking easily and empowers space owners to earn effortlessly.</p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mt-16 max-w-7xl mx-auto px-6">

        {/* Card 1 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <MapPin className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Smart Location Search</h3>
          <p className="text-gray-600">Users can quickly find nearby available parking spots with accurate location mapping powered by real-time data.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <Car className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">List Your Parking Space</h3>
          <p className="text-gray-600">Owners can upload details, pricing, availability, and facilities to start earning instantly from unused parking spaces.</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <CreditCard className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Instant Booking & Payments</h3>
          <p className="text-gray-600">Customers can book spaces instantly with secure payments while owners receive earnings seamlessly.</p>
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <Shield className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Verified & Secure Spaces</h3>
          <p className="text-gray-600">Every listed parking area undergoes verification to ensure safety and trust for all users.</p>
        </motion.div>

        {/* Card 5 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <Clock className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Flexible Booking Durations</h3>
          <p className="text-gray-600">Hourly, daily, or monthly—users pick what suits them, and owners can set custom pricing for every duration.</p>
        </motion.div>

        {/* Card 6 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <Smartphone className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Mobile Friendly Experience</h3>
          <p className="text-gray-600">Book, manage, and track everything from any device with our seamless mobile-responsive interface.</p>
        </motion.div>

        {/* Card 7 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <BarChart className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Earnings & Analytics</h3>
          <p className="text-gray-600">Owners get a complete dashboard showing bookings, earnings, occupancy analytics, and growth insights.</p>
        </motion.div>

        {/* Card 8 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <Users className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Customer Reviews & Ratings</h3>
          <p className="text-gray-600">Buyers can rate parking spaces and share feedback, helping owners improve and new users trust the listings.</p>
        </motion.div>

        {/* Card 9 */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white shadow-lg rounded-2xl p-8">
          <CheckCircle className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Real-Time Availability</h3>
          <p className="text-gray-600">Live data ensures that users see exactly which slots are open at any moment.</p>
        </motion.div>
      </div>

      {/* Additional Section */}
      <div className="mt-24 bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" className="text-3xl font-bold mb-4">Built for Reliability & Seamless Experience</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" className="text-gray-300 max-w-2xl mx-auto mb-10">
            Spotly ensures smooth operation for both users and space owners. Our system is optimized for speed, security, and accuracy—making parking effortless.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
            <a href="/register-space" className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-3 rounded-xl font-semibold">
              Start Listing Your Space
            </a>
          </motion.div>
        </div>
      </div>

    </div>
  );
}