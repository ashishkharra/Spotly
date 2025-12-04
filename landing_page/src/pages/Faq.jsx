import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
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

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 lg:px-8">
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
                className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-700">{item.a}</div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Extra Info Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
      >
        <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Booking</h3>
          <p className="text-gray-600">Every transaction is encrypted, safe, and smooth for both users and space owners.</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
          <p className="text-gray-600">Our support team is always ready to assist you with any parking or listing concerns.</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Space Management</h3>
          <p className="text-gray-600">Update pricing, availability, and facilities anytime — all from a simple dashboard.</p>
        </div>
      </motion.div>
    </div>
  );
}
