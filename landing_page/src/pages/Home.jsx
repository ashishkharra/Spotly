import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Toast from "../components/Toast.jsx";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Testimonials, partners, features, faqs, pricingPlans, teamMembers } from "../config/constans.js";


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

          <motion.div
            variants={slideUp}
            className="max-w-4xl w-72 sm:w-96 lg:w-[520px] xl:w-[600px] 2xl:w-[700px] mx-auto"
          >
            <div className="relative mt-8 border border-white rounded-lg bg-orange-500">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full px-6 py-5 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-2 top-2 bg-white text-black px-8 py-2.5 rounded-lg hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </motion.div>

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
              className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col justify-center"
            >
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img
                  loading="lazy"
                  src="/assets/Images/parking-analytics.svg"
                  alt="Parking analytics"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Parking Analytics</h3>
              <p className="text-gray-600 mb-6">
                Real-time insights and predictive analytics to optimize your parking assets
              </p>
              <button className="text-orange-500 font-semibold hover:underline">
                Explore Features →
              </button>
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

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/95 z-0" />
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Parking Experience?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join the future of urban mobility today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-50"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10"
            >
              Schedule Demo
            </motion.button>
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
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Advanced Parking Features
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions built for modern urban challenges
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <img loading="lazy" src={feature.icon} alt={feature.title} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Flexible Pricing Plans
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600 max-w-2xl mx-auto">
              Scale with solutions that grow with your needs
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className={`p-8 rounded-2xl ${plan.highlight ? 'bg-gray-900 text-white' : 'bg-white'} 
                                shadow-lg hover:shadow-xl transition`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className={`${plan.highlight ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {plan.description}
                  </p>
                  <div className="text-4xl font-bold mb-4">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-500">/month</span>
                  </div>
                  <button className={`w-full py-3 rounded-lg font-semibold 
                                        ${plan.highlight ?
                      'bg-orange-500 hover:bg-orange-600 text-white' :
                      'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                  >
                    Get Started
                  </button>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <svg className={`w-5 h-5 mr-3 ${plan.highlight ? 'text-orange-400' : 'text-orange-500'}`}
                        fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Meet Our Leadership
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600 max-w-2xl mx-auto">
              The visionary team driving urban mobility innovation
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="text-center"
              >
                <img loading="lazy" src={member.photo} alt={member.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-6 shadow-lg" />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.socials.map((social, sIndex) => (
                    <a key={sIndex} href={social.link}
                      className="text-gray-600 hover:text-orange-500 transition">
                      <img src={social.icon} alt={social.name} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerChildren}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={slideUp} className="text-gray-600 max-w-2xl mx-auto">
              Answers to common questions about our platform
            </motion.p>
          </motion.div>

          <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white rounded-xl shadow-sm mb-4 p-6 cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-900 to-gray-900 text-white border-b border-gray-600">
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