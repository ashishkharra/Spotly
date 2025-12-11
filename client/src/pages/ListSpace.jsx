import { motion } from "framer-motion";
import { CheckCircle, MapPin, Clock, DollarSign, Info, Upload, Shield, Calendar, Star } from "react-feather";

const ListSpace = () => {
    return (
        <div className="bg-gray-50">
            {/* Existing Hero Section */}
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
                        Monetize Your Parking Space
                    </motion.h1>
                    <motion.p
                        className="text-xl text-orange-200 max-w-2xl mx-auto"
                        transition={{ delay: 0.4 }}
                    >
                        Earn extra income by listing your unused parking space with our secure platform
                    </motion.p>
                </motion.div>
            </section>

            {/* Main Content */}
            <section className="py-20 relative -mt-16">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Listing Form */}
                        <motion.div
                            initial={{ x: -100 }}
                            whileInView={{ x: 0 }}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >
                            <h2 className="text-3xl font-bold mb-8">Space Details</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">Location Address</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter full address"
                                        />
                                        <MapPin className="absolute left-4 top-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Space Type</label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500">
                                            <option>Indoor Garage</option>
                                            <option>Outdoor Lot</option>
                                            <option>Street Parking</option>
                                            <option>Driveway</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Vehicle Size</label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500">
                                            <option>Compact Car</option>
                                            <option>SUV/Truck</option>
                                            <option>Motorcycle</option>
                                            <option>Oversized Vehicle</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Amenities</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                                            <span className="text-gray-600">Security Cameras</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                                            <span className="text-gray-600">Lighting</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                                            <span className="text-gray-600">EV Charging</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                                            <span className="text-gray-600">Covered</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Hourly Rate ($)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                                                placeholder="0.00"
                                            />
                                            <DollarSign className="absolute left-4 top-4 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Daily Rate ($)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                                                placeholder="0.00"
                                            />
                                            <DollarSign className="absolute left-4 top-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
                                >
                                    List Your Space
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Benefits Sidebar */}
                        <motion.div
                            initial={{ x: 100 }}
                            whileInView={{ x: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-6">Why List With Us?</h3>
                                <div className="space-y-6">
                                    {[
                                        { icon: CheckCircle, title: "Easy Management", text: "Full control over availability and pricing" },
                                        { icon: Clock, title: "Flexible Scheduling", text: "Choose when your space is available" },
                                        { icon: DollarSign, title: "Secure Payments", text: "Guaranteed payments protected by our system" },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0.9 }}
                                            whileInView={{ scale: 1 }}
                                            className="flex items-start space-x-4"
                                        >
                                            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                                <item.icon className="text-orange-500 w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-gray-400">{item.text}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                        <Info className="text-orange-500 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2">Listing Tips</h4>
                                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                                            <li>Clear photos increase bookings by 40%</li>
                                            <li>Competitive pricing attracts more users</li>
                                            <li>Detailed descriptions build trust</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-12"
                    >
                        <h3 className="text-3xl font-bold mb-8 text-center">How It Works</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "1. List Your Space", text: "Create your free listing in minutes" },
                                { title: "2. Get Booked", text: "Approved users reserve your space" },
                                { title: "3. Get Paid", text: "Receive payments directly to your account" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition"
                                >
                                    <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
                                    <p className="text-gray-600">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Photo Upload Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-white p-8 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-6">Add Photos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ scale: 1.05 }}
                                    className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition"
                                >
                                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Upload Photo</span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-4">Minimum 3 photos required (max 10MB each)</p>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced Form Section */}

            {/* New: Pricing Suggestions Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ y: 50 }}
                        whileInView={{ y: 0 }}
                        className="bg-orange-50 p-8 rounded-2xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <DollarSign className="w-8 h-8 text-orange-600" />
                            <h3 className="text-2xl font-bold">Pricing Suggestions</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl">
                                <h4 className="font-semibold mb-2">Hourly Rates</h4>
                                <p className="text-gray-600">
                                    Average in your area: <span className="font-bold">$3.50 - $6.00</span>
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl">
                                <h4 className="font-semibold mb-2">Daily Rates</h4>
                                <p className="text-gray-600">
                                    Recommended range: <span className="font-bold">$15 - $30</span>
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl">
                                <h4 className="font-semibold mb-2">Monthly Rates</h4>
                                <p className="text-gray-600">
                                    Potential earnings: <span className="font-bold">$200 - $500+</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Availability Scheduling */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        whileInView={{ scale: 1 }}
                        className="bg-white p-8 rounded-2xl shadow-lg"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Calendar className="w-8 h-8 text-orange-600" />
                            <h3 className="text-2xl font-bold">Set Availability</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-3">Available Days</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                        <label key={day} className="flex items-center space-x-2">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                                            <span>{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-3">Time Slots</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                                        <option>8:00 AM</option>
                                        <option>9:00 AM</option>
                                        {/* Add more times */}
                                    </select>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg">
                                        <option>5:00 PM</option>
                                        <option>6:00 PM</option>
                                        {/* Add more times */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Legal & Requirements Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-red-50 p-8 rounded-2xl border border-red-100"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Shield className="w-8 h-8 text-red-600" />
                            <h3 className="text-2xl font-bold">Legal Requirements</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <input type="checkbox" className="mt-1 form-checkbox h-5 w-5 text-red-500" />
                                <div>
                                    <p className="font-medium">I have the legal right to rent this space</p>
                                    <p className="text-sm text-gray-600">Must be property owner or have authorization</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <input type="checkbox" className="mt-1 form-checkbox h-5 w-5 text-red-500" />
                                <div>
                                    <p className="font-medium">Agree to insurance requirements</p>
                                    <p className="text-sm text-gray-600">$1M liability coverage recommended</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <input type="checkbox" className="mt-1 form-checkbox h-5 w-5 text-red-500" />
                                <div>
                                    <p className="font-medium">Comply with local regulations</p>
                                    <p className="text-sm text-gray-600">Check municipal parking laws</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Success Stories Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ y: 50 }}
                        whileInView={{ y: 0 }}
                        className="bg-gray-900 text-white p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center">Success Stories</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Sarah T.", earnings: "$2,300/mo", text: "Earning extra income from my downtown parking spot" },
                                { name: "Mike R.", earnings: "$1,800/mo", text: "Retired but still making money from my driveway" },
                                { name: "Downtown Garage", earnings: "$15k/mo", text: "Optimized our commercial parking utilization" },
                            ].map((story, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-6 bg-gray-800 rounded-xl"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                                            <Star className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold">{story.name}</p>
                                            <p className="text-orange-400 text-sm">{story.earnings}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">"{story.text}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Security Features Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-white p-8 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center">Our Security Features</h3>
                        <div className="grid md:grid-cols-4 gap-6 text-center">
                            {[
                                { icon: Shield, title: "Verified Users", text: "ID verification for all parkers" },
                                { icon: CheckCircle, title: "Damage Protection", text: "$10,000 property damage coverage" },
                                { icon: Clock, title: "24/7 Monitoring", text: "Round-the-clock support team" },
                                { icon: DollarSign, title: "Secure Payments", text: "Encrypted financial transactions" },
                            ].map((item, index) => (
                                <div key={index} className="p-6">
                                    <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <h4 className="font-bold mb-2">{item.title}</h4>
                                    <p className="text-gray-600 text-sm">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Revenue Calculator */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        whileInView={{ scale: 1 }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl text-white"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center">Earnings Calculator</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block mb-2">Daily Rate ($)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Utilization (%)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20"
                                    placeholder="50"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-sm mb-2">Estimated Monthly Earnings</p>
                                <p className="text-4xl font-bold">$1,950</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: FAQ Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-white p-8 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "How are payments processed?",
                                    a: "We handle payments securely through our platform, transferring funds to your account weekly"
                                },
                                {
                                    q: "Can I cancel a reservation?",
                                    a: "Yes, you can cancel reservations up to 24 hours before the booking time"
                                },
                                {
                                    q: "What requirements does my space need?",
                                    a: "Must be legally rentable, clearly marked, and meet basic safety standards"
                                }
                            ].map((faq, index) => (
                                <div key={index} className="border-b border-gray-100 pb-6">
                                    <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* New: Mobile App CTA */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ y: 50 }}
                        whileInView={{ y: 0 }}
                        className="bg-gray-900 text-white p-8 rounded-2xl"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-4">Manage Your Listings On The Go</h3>
                                <p className="text-gray-300 mb-6">Download our mobile app to track earnings, manage bookings, and get real-time notifications</p>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            {/* iOS app store icon */}
                                        </svg>
                                        App Store
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            {/* Google play icon */}
                                        </svg>
                                        Play Store
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                {/* Add mock phone image */}
                                <div className="w-64 h-64 bg-gray-800 rounded-3xl flex items-center justify-center">
                                    <p className="text-gray-400">App Preview</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        whileInView={{ scale: 1 }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 p-12 rounded-3xl"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to Start Earning?
                        </h2>
                        <p className="text-orange-100 mb-8 text-lg">
                            Join thousands of space owners making extra income
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-white text-orange-600 px-12 py-5 rounded-xl font-bold text-lg shadow-xl"
                        >
                            List Your Space Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default ListSpace