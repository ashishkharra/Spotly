import { motion } from "framer-motion";
import { Search, CreditCard, MapPin, CheckCircle } from "react-feather";

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

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const HowItWork = () => {
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

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              How Spotly Earns Money
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600">
              Our platform earns a small commission only when a booking is
              completed successfully.
            </motion.p>
          </motion.div>

          {/* Commission Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Owner Card */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              className="p-8 rounded-2xl bg-white shadow-xl border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3 text-[#0B1C2E]">
                For Parking Space Owners
              </h3>
              <p className="text-gray-600 mb-6">
                List your empty parking space and earn monthly income.
              </p>
              <p className="text-4xl font-bold text-orange-500 mb-4">10%</p>
              <p className="text-gray-500">
                Spotly keeps only 10% per successful booking.
              </p>
            </motion.div>

            {/* Divider Icon */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              className="flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl">
                %
              </div>
            </motion.div>

            {/* Customer Card */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              className="p-8 rounded-2xl bg-[#0B1C2E] text-white shadow-xl"
            >
              <h3 className="text-xl font-bold mb-3">For Customers</h3>
              <p className="text-gray-300 mb-6">
                Search, reserve & pay for parking easily.
              </p>
              <p className="text-4xl font-bold mb-4">₹0 Extra</p>
              <p className="text-gray-400">No extra fee. Just pay parking cost.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Earning Example */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Real Example
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600">
              See how much you (and we) earn from a typical booking.
            </motion.p>
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white p-8 rounded-2xl shadow-lg border"
          >
            <h3 className="text-xl font-bold mb-4 text-[#0B1C2E]">
              Example Calculation
            </h3>

            <table className="w-full text-left border-collapse text-gray-700">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Parking Price</td>
                  <td className="py-3">₹100</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Spotly Commission (10%)</td>
                  <td className="py-3">₹10</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Owner Receives</td>
                  <td className="py-3 font-bold text-green-600">₹90</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HowItWork