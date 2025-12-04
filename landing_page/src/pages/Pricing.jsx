import { motion } from "framer-motion";

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Header Section */}
      <section className="py-20 bg-[#0b1c2e] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" variants={stagger}>
            <motion.h1
              variants={slideUp}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Simple, Transparent Pricing
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Spotly is free to use. We only earn when you earn. No subscription,
              no hidden costs, no setup fee.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Commission Breakdown */}
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="grid gap-6">
            {[
              {
                q: "Is Spotly free to use?",
                a: "Yes, Spotly is completely free for both owners and customers.",
              },
              {
                q: "When do I pay commission?",
                a: "Only after a booking is completed. There is no charge before that.",
              },
              {
                q: "How does Spotly pay the owners?",
                a: "Owners get paid automatically after each booking minus Spotly’s 10% commission.",
              },
              {
                q: "Do customers pay extra?",
                a: "No. Customers pay only the parking fee listed by the space owner.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                className="p-6 border rounded-xl shadow-sm"
              >
                <h3 className="font-bold text-lg text-[#0B1C2E]">{item.q}</h3>
                <p className="text-gray-600 mt-2">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
