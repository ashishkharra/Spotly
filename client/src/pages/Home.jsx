import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Toast from "../components/Toast.jsx";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Testimonials, partners, teamMembers } from "../config/constans.js";
import { CheckCircle, MapPin, Car, CreditCard, Shield, Clock, Smartphone, BarChart, Users, ChevronDown } from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};


const faqs = [
  {
    q: "What is Spotly?",
    a: "Spotly is a smart parking marketplace where space owners can list their unused parking spots and users can instantly search, compare, and book available spaces nearby.",
  },
  {
    q: "Is Spotly free to use?",
    a: "Yes! Browsing, searching, and exploring parking spaces is completely free. You only pay when you book a space.",
  },
  {
    q: "How do I book a parking space?",
    a: "Simply enter your location, browse spaces, compare pricing and facilities, and make a quick reservation in seconds.",
  },
  {
    q: "How do space owners earn money?",
    a: "Owners list their available parking spot, set pricing and availability, and earn whenever someone books their space.",
  },
  {
    q: "Does Spotly charge a commission?",
    a: "Yes, Spotly takes a small service fee from each successful booking to maintain the platform and provide support.",
  },
  {
    q: "Can I manage multiple parking spaces?",
    a: "Absolutely! Owners can add multiple spaces, each with separate pricing, availability, and facility details.",
  },
  {
    q: "Is online payment supported?",
    a: "Yes, Spotly supports secure payment options. Owners receive earnings directly in their linked payout method.",
  },
  {
    q: "How do cancellations work?",
    a: "Each space may have different cancellation rules. You can view them before booking.",
  },
];


const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 slides by default
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);
      setToastMessage(location.state.message);
      setToastType(location.state.type);
    }
  }, [location.state]);

  return (
    <div className="bg-background overflow-hidden">
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 z-10" />
        <img
          src="./assets/Images/park-main.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
        </img>
        {showToast && <Toast message={toastMessage} type={toastType} />}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4"
        >
          <motion.h1
            variants={slideUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            <span className="block mb-4">Premium Urban</span>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Parking Solutions
            </span>
          </motion.h1>

        </motion.div>
      </section>

      <section className="py-16 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerChildren}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 lg:px-8"
        >
          <motion.h2
            variants={slideUp}
            className="text-center text-gray-500 text-sm uppercase font-semibold mb-8"
          >
            Trusted by industry leaders
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition"
              >
                <img
                  loading="lazy"
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-12"
          >
            <motion.div
              variants={slideUp}
              className="lg:col-span-2 bg-gray-900 text-white p-12 rounded-3xl"
            >
              <h2 className="text-4xl font-bold mb-6">
                Transforming Urban Mobility Through Smart Parking
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Leveraging advanced technology to optimize parking infrastructure
                and create sustainable urban ecosystems.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { icon: '🚀', title: 'Instant Access', text: 'Real-time availability tracking' },
                  { icon: '🔒', title: 'Secure', text: 'Encrypted transactions' },
                  { icon: '💸', title: 'Profitable', text: 'Maximize space utilization' },
                  { icon: '🌱', title: 'Sustainable', text: 'Reduce urban congestion' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="bg-white shadow-2xl rounded-3xl p-8 flex sm:flex-col justify-center"
            >
              <div className="aspect-w-10 aspect-h-9 mb-6">
                <img
                  loading="lazy"
                  src="/assets/Images/parking-analytics.svg"
                  alt="Parking analytics"
                  className="object-cover max-h-[300px] md:max-h-[350px] lg:max-h-[450px] mx-auto"
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Smart Parking Analytics</h3>

                <p className="text-gray-600">
                  Real-time insights and predictive analytics to optimize your parking assets
                </p>

                <button className="text-orange-500 font-semibold hover:underline">
                  Explore Features →
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Simple 3-Step Process
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600 max-w-2xl mx-auto">
              From discovery to parking - streamlined for maximum efficiency
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '01', title: 'Search & Select', text: 'Find optimal parking locations' },
              { number: '02', title: 'Secure Booking', text: 'Instant reservation confirmation' },
              { number: '03', title: 'Park & Pay', text: 'Seamless digital transactions' }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="text-orange-500 text-4xl font-bold mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10 overflow-hidden bg-gray-50">

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
      </section>

      <section className="relative py-10 overflow-hidden from-gray-900 to-orange-900 pt-24 pb-20 px-4 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Spotly — whether you're a space owner or someone looking for easy parking.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-700">{item.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-orange-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '250K+', label: 'Daily Parkings' },
              { number: '95%', label: 'Customer Satisfaction' },
              { number: '40+', label: 'Cities Covered' },
              { number: '1M+', label: 'Monthly Transactions' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-orange-900 text-white border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold text-center mb-12">
              Trusted by Thousands
            </motion.h2>

            <div className="w-full px-4 py-8">
              <Slider {...sliderSettings} className="overflow-hidden">
                {Testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="px-2">
                    <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                          loading="lazy"
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                        />
                        <div className="text-center md:text-left">
                          <p className="text-xl italic mb-4">"{testimonial.quote}"</p>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default Home