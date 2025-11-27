import { motion } from "framer-motion";
import { Search, CreditCard, MapPin, CheckCircle } from "react-feather";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const Working = () => {
  const steps = [
    {
      icon: <Search size={40} className="text-orange-500" />,
      title: "Find Your Spot",
      description: "Search real-time availability using our smart parking map",
      extra: "Filter by price, location, or amenities"
    },
    {
      icon: <CreditCard size={40} className="text-orange-500" />,
      title: "Secure Reservation",
      description: "Book instantly with our encrypted payment system",
      extra: "Free cancellation up to 1 hour before"
    },
    {
      icon: <MapPin size={40} className="text-orange-500" />,
      title: "Navigate & Park",
      description: "Get turn-by-turn directions to your reserved spot",
      extra: "Digital pass accessible via mobile app"
    },
    {
      icon: <CheckCircle size={40} className="text-orange-500" />,
      title: "Exit Seamlessly",
      description: "Automatic payment processing when you leave",
      extra: "Receipt emailed instantly"
    }
  ];

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-b from-gray-900 to-orange-900 pt-32 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-7xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.h1 variants={slideUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple Parking in 4 Steps
          </motion.h1>
          <motion.p variants={slideUp} className="text-xl text-orange-200 max-w-2xl mx-auto">
            Discover how our smart parking solution saves you time and stress
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20 relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <p className="text-sm text-orange-500">{step.extra}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={slideUp} className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Visual Walkthrough</h2>
              {[
                "Real-time parking availability map",
                "Smart price comparison tool",
                "Instant reservation confirmation",
                "Mobile entry/exit system"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-gray-600">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={slideUp}
              className="bg-gray-100 rounded-2xl p-8 shadow-inner"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent rounded-2xl" />
                <img
                  src="/assets/Images/parkingInterface.jpg"
                  alt="Parking interface"
                  className="rounded-xl shadow-xl object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={fadeIn} className="p-6">
              <div className="text-5xl font-bold mb-4 text-orange-500">98%</div>
              <h3 className="text-xl mb-2">Customer Satisfaction</h3>
              <p className="text-gray-400">Rated excellent in user reviews</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <div className="text-5xl font-bold mb-4 text-orange-500">24/7</div>
              <h3 className="text-xl mb-2">Support Availability</h3>
              <p className="text-gray-400">Live chat & phone support</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <div className="text-5xl font-bold mb-4 text-orange-500">5min</div>
              <h3 className="text-xl mb-2">Average Setup Time</h3>
              <p className="text-gray-400">Quick and easy registration</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          className="max-w-4xl mx-auto px-4 lg:px-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Park Smarter?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Join thousands of satisfied drivers today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Get Started Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold"
            >
              Watch Demo Video
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Working;