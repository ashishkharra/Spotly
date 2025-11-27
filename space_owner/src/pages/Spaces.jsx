import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiType, FiNavigation, FiMapPin, FiMap, FiClock, FiInfo } from 'react-icons/fi';
import { useState } from 'react';


const Spaces = () => {
    const [spaces, setSpaces] = useState([
        { id: 1, name: 'Downtown Garage', address: '123 Main St', type: 'Garage', capacity: 50, occupied: 42, rate: 5, status: 'active', earnings: 1240, features: ['Covered', 'Security', 'EV Charging'] },
        { id: 2, name: 'Riverside Lot', address: '456 River Ave', type: 'Outdoor', capacity: 30, occupied: 28, rate: 3, status: 'active', earnings: 890, features: ['24/7 Access', 'Lighted'] },
        { id: 3, name: 'Central Plaza', address: '789 Center Blvd', type: 'Valet', capacity: 20, occupied: 15, rate: 8, status: 'active', earnings: 1120, features: ['Valet', 'Car Wash'] },
    ]);

    const spaceTypes = ['Garage', 'Outdoor', 'Valet', 'Covered', 'Driveway', 'Lot'];
    const featuresList = ['24/7 Access', 'Security', 'EV Charging', 'Lighted', 'Covered', 'Valet', 'Car Wash', 'Restrooms', 'Surveillance'];
    const [showAddSpace, setShowAddSpace] = useState(false);

    const [newSpace, setNewSpace] = useState({
        name: '',
        address: '',
        type: 'Garage',
        capacity: 10,
        rate: 5,
        features: [],
        description: '',
        operatingHours: '24/7',
        images: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSpaceObj = {
            ...newSpace,
            id: spaces.length + 1,
            status: 'active',
            occupied: 0,
            earnings: 0
        };
        setSpaces([...spaces, newSpaceObj]);
        setShowAddSpace(false);
        setNewSpace({
            name: '',
            address: '',
            type: 'Garage',
            capacity: 10,
            rate: 5,
            features: [],
            description: '',
            operatingHours: '24/7',
            images: []
        });
    };
    return (
        <div className='px-5'>
            <div className="flex flex-col sm:flex-row my-5 justify-between w-full">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl font-bold text-gray-800">My Parking Spaces</h2>
                    <p className="text-gray-600">Manage and monitor all your parking locations</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg flex items-center justify-center sm:justify-start"
                    onClick={() => setShowAddSpace(true)}
                >
                    <FiPlus className="mr-2" />
                    Add New Space
                </motion.button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map(space => (
                    <motion.div
                        key={space.id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{space.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{space.address}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${space.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {space.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-500">Type</div>
                                    <div className="font-medium">{space.type}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-500">Rate</div>
                                    <div className="font-medium">{space.rate}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-indigo-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-500">Capacity</div>
                                    <div className="font-bold text-indigo-700">{space.capacity} spaces</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-500">Earnings</div>
                                    <div className="font-bold text-green-700">{space.earnings}</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                    <span>Utilization</span>
                                    <span>{Math.round((space.occupied / space.capacity) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600"
                                        style={{ width: `${Math.round((space.occupied / space.capacity) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 py-2 rounded-lg text-sm font-medium">
                                    Edit
                                </button>
                                <button className={`flex-1 py-2 rounded-lg text-sm font-medium ${space.status === 'active'
                                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                    }`}>
                                    {space.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {showAddSpace && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Add New Parking Space</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowAddSpace(false)}
                                >
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <FiType className="mr-2 text-indigo-600" />
                                                Space Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500"
                                                placeholder="Downtown Garage"
                                                value={newSpace.name}
                                                onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <FiNavigation className="mr-2 text-indigo-600" />
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500"
                                                placeholder="123 Main St, City, State"
                                                value={newSpace.address}
                                                onChange={(e) => setNewSpace({ ...newSpace, address: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <FiMapPin className="mr-2 text-indigo-600" />
                                                Space Type
                                            </label>
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500"
                                                value={newSpace.type}
                                                onChange={(e) => setNewSpace({ ...newSpace, type: e.target.value })}
                                            >
                                                {spaceTypes.map((type, index) => (
                                                    <option key={index} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <p className="mr-2 text-indigo-600">$</p>
                                                Hourly Rate ($)
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                step="0.5"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500"
                                                value={newSpace.rate}
                                                onChange={(e) => setNewSpace({ ...newSpace, rate: parseFloat(e.target.value) })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <FiMap className="mr-2 text-indigo-600" />
                                                Total Capacity
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500"
                                                value={newSpace.capacity}
                                                onChange={(e) => setNewSpace({ ...newSpace, capacity: parseInt(e.target.value) })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <FiClock className="mr-2 text-indigo-600" />
                                                Operating Hours
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500"
                                                placeholder="24/7 or 9AM-5PM"
                                                value={newSpace.operatingHours}
                                                onChange={(e) => setNewSpace({ ...newSpace, operatingHours: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <FiInfo className="mr-2 text-indigo-600" />
                                                Description
                                            </label>
                                            <textarea
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-indigo-500 h-24"
                                                placeholder="Describe your parking space..."
                                                value={newSpace.description}
                                                onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Features & Amenities</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {featuresList.map((feature, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${newSpace.features.includes(feature)
                                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                onClick={() => toggleFeature(feature)}
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${newSpace.features.includes(feature)
                                                    ? 'bg-indigo-500 border-indigo-500 text-white'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {newSpace.features.includes(feature) && <FiCheck className="text-sm" />}
                                                </div>
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                                        onClick={() => setShowAddSpace(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center"
                                    >
                                        <FiPlus className="mr-2" />
                                        Add Parking Space
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Spaces