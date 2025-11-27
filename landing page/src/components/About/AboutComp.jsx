import { motion } from "framer-motion";
import { Home, Users, Award, MapPin } from "react-feather";

const AboutComp = () => {
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
            transition={{ delay: 0.2 }}
          >
            Revolutionizing Urban Mobility
          </motion.h1>
          <motion.p 
            className="text-xl text-orange-200 max-w-2xl mx-auto"
            transition={{ delay: 0.4 }}
          >
            Smart parking solutions for smarter cities
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20 relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-8">
                To transform urban landscapes through intelligent parking solutions 
                that reduce congestion, lower emissions, and improve quality of life.
              </p>
              <div className="space-y-4">
                {['Smart City Integration', 'Real-time Analytics', 'Sustainable Practices'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">

                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-gray-100 rounded-2xl overflow-hidden"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
            >
              <img 
                src="/assets/Images/city.jpg" 
                alt="City coverage" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Our Journey
          </motion.h2>
          
          <div className="relative pl-8 lg:pl-0">
            <div className="hidden lg:block absolute left-1/2 w-1 h-full bg-gray-200" />
            
            {[
              { year: "2018", title: "Company Founded", text: "Started with 3 parking lots in San Francisco" },
              { year: "2020", title: "Mobile App Launch", text: "Introduced real-time parking reservations" },
              { year: "2022", title: "AI Integration", text: "Implemented predictive availability system" },
              { year: "2024", title: "Global Expansion", text: "Operating in 40+ cities worldwide" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative mb-12 lg:w-1/2 lg:ml-auto lg:even:ml-0 lg:even:mr-auto lg:even:text-right"
              >
                <div className="lg:absolute lg:w-6 lg:h-6 bg-orange-500 rounded-full -left-3 top-6" />
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                  <div className="text-orange-500 font-bold mb-2">{item.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              { icon: <MapPin size={40} />, value: "40+", label: "Cities Served" },
              { icon: <Home size={40} />, value: "15K+", label: "Parking Locations" },
              { icon: <Users size={40} />, value: "2M+", label: "Monthly Users" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-8"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <div className="text-5xl font-bold mb-2">{item.value}</div>
                <div className="text-gray-300">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Meet The Team
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", photo: "/assets/Images/person1.jpg" },
              { name: "Michael Chen", role: "CTO", photo: "/assets/Images/person1.jpg" },
              { name: "Emma Wilson", role: "COO", photo: "/assets/Images/person1.jpg" },
              { name: "David Park", role: "CPO", photo: "/assets/Images/person1.jpg" }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-100">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutComp;