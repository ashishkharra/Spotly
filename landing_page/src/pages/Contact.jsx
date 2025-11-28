import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "react-feather";

function Contact() {
  return (
        <div className="bg-gray-50">
      <section className="bg-gradient-to-b from-gray-900 to-orange-900 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >

            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-orange-200 max-w-2xl mx-auto"
            transition={{ delay: 0.4 }}
          >
            We're here to help you with all your parking needs
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20 relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              className="space-y-8"
            >
              <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="text-orange-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Corporate Office</p>
                      <p className="text-gray-400">123 Parking Lane</p>
                      <p className="text-gray-400">Smart City, SC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="text-orange-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Numbers</p>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">+1 (555) 890-1234</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="text-orange-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Email Addresses</p>
                      <p className="text-gray-400">support@parksmart.com</p>
                      <p className="text-gray-400">sales@parksmart.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="text-orange-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Office Hours</h4>
                    <p className="text-gray-600">Monday-Friday: 8AM - 8PM EST</p>
                    <p className="text-gray-600">Saturday: 9AM - 5PM EST</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gray-200 h-96 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
            <div className="w-full h-full flex items-center justify-center">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.543273210575!2d75.76177538083634!3d26.85447541655788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db51e9b46a8d9%3A0xe051803a13e605c7!2sMansarover%20Plaza!5e0!3m2!1sen!2sin!4v1741236821459!5m2!1sen!2sin" width="600" height="450" className="w-full h-full"></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          className="max-w-4xl mx-auto px-4 lg:px-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Our support team is available 24/7
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="tel:+15551234567"
              whileHover={{ scale: 1.05 }}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Call Now
            </motion.a>
            <motion.a
              href="mailto:support@parksmart.com"
              whileHover={{ scale: 1.05 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold"
            >
              Email Support
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Contact
