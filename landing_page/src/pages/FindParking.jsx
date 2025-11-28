import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { MapPin, Clock } from "react-feather";
import { parkingSpots } from "../config/constans.js";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FindParking = () => {
  const [coords, setCoords] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [mapCenter, setMapCenter] = useState(null);
  const mapRef = useRef(null);

  const ChangeMapView = ({ center }) => {
    const map = useMap();

    useEffect(() => {
      if (center && center.lat && center.lng) {
        map.flyTo(center, map.getZoom(), {
          duration: 1
        });
      }
    }, [center]);

    return null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Received coordinates:", latitude, longitude);

        if (isValidCoordinate(latitude, longitude)) {
          const newCoords = {
            lat: parseFloat(latitude.toFixed(6)),
            lng: parseFloat(longitude.toFixed(6))
          };

          setCoords(newCoords);
          setMapCenter(newCoords);
          console.log("Setting coordinates:", newCoords);
        } else {
          console.error("Invalid coordinates received");
          setDefaultLocation();
        }
      },
      (err) => {
        console.error("Location error:", err);
        setDefaultLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // Helper functions
  const isValidCoordinate = (lat, lng) => {
    return lat !== null && lng !== null &&
      !isNaN(lat) && !isNaN(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180;
  };

  const setDefaultLocation = () => {
    const defaultCoords = { lat: 28.6139, lng: 77.2090 }; // New Delhi
    setCoords(defaultCoords);
    setMapCenter(defaultCoords);
  };


  // Fetch coordinates for searched location
  const fetchCoordinates = async (location) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) }); // Set map center to search result
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  // Debounced search for location
  const debouncedSearch = debounce((value) => {
    if (value.trim().length > 2) {
      fetchCoordinates(value);
    }
  }, 800);

  useEffect(() => {
    debouncedSearch(searchInput);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput]);


  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gray-900 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Perfect Parking Spot
            </h1>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Location input */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter location..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full p-3 border-0 text-gray-900 focus:ring-0"
                    />
                  </div>
                </div>

                {/* Date picker */}
                <div className="col-span-1 flex items-center">
                  <input
                    type="date"
                    className="w-full p-3 border-0 text-gray-900 focus:ring-0"
                  />
                </div>

                {/* Time picker + duration */}
                <div className="col-span-1 flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="time"
                    className="w-full p-3 border-0 text-gray-900 focus:ring-0 bg-transparent"
                  />
                  <select className="w-full p-3 border-0 text-gray-900 focus:ring-0 bg-white">
                    <option>2 hours</option>
                    <option>4 hours</option>
                    <option>All day</option>
                  </select>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit relative md:sticky lg:sticky top-8"
          >
            <h3 className="text-lg font-semibold mb-4">Filter Results</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border rounded-lg"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amenities</label>
                <div className="space-y-2">
                  {['24/7 Access', 'EV Charging', 'Security', 'Covered'].map((amenity, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Parking Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Types</option>
                  <option>Street Parking</option>
                  <option>Garage</option>
                  <option>Lot</option>
                </select>
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-2 mt-5 sm:mt-0 md:mt-0 lg:mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-200 h-96 rounded-2xl shadow-lg mb-8 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-2xl" />

              {coords ? (
                <MapContainer
                  center={[mapCenter?.lat || coords.lat, mapCenter?.lng || coords.lng]}
                  zoom={14}
                  scrollWheelZoom={true}
                  style={{ height: "400px", width: "100%", borderRadius: "1rem" }}
                  whenReady={() => console.log("Map is ready")}
                  key={`${coords.lat}-${coords.lng}`} // Force re-render on coord change
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <ChangeMapView center={mapCenter || coords} />

                  {/* Current location marker */}
                  <Marker position={[coords.lat, coords.lng]} icon={markerIcon}>
                    <Popup>Your Current Location</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center">
                  <p>Loading map...</p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow z-10">
                <h4 className="font-semibold mb-2">Current Area</h4>
                <p className="text-sm text-gray-600">Downtown District</p>
              </div>
            </motion.div>

            {/* Results */}
            <div className="space-y-6">
              {parkingSpots?.map((spot, index) => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="bg-gray-200 h-fit rounded-xl mb-4">
                        <img src={spot.img} alt="" className="h-48 rounded-lg object-cover" />
                      </div>
                      <div className="text-orange-500 font-semibold text-xl">
                        {spot.price}
                        <span className="text-sm text-gray-500">/hour</span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
                      <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {spot.distance}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {spot.availability}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {spot.features.map((feature, fIndex) => (
                          <span
                            key={fIndex}
                            className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
                        Reserve Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex justify-center space-x-2"
            >
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg ${page === 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {page}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Average Pricing Comparison</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Competitive rates across different parking types in your area
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: 'Street Parking', price: '$2.50/h', icon: '🚗' },
              { type: 'Parking Garages', price: '$4.75/h', icon: '🏢' },
              { type: 'Valet Service', price: '$7.90/h', icon: '🎩' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.type}</h3>
                <div className="text-3xl font-bold text-orange-500">{item.price}</div>
                <p className="text-gray-600 mt-2">per hour</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-4">Nearby Facilities</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Essential services near your selected parking location
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['🏧 ATM', '☕ Café', '⛽ Gas Station', '🛒 Market', '🏥 Pharmacy'].map((amenity, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-2xl mb-2">{amenity.split(' ')[0]}</div>
                <div className="text-sm text-gray-600">{amenity.split(' ')[1]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to secure your parking spot
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Real-Time Search', text: 'Instant availability updates', icon: '🔍' },
              { title: 'Secure Booking', text: 'Encrypted reservation system', icon: '🔒' },
              { title: 'Digital Pass', text: 'Mobile entry & exit', icon: '📱' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-gray-50 rounded-2xl text-center"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-900 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Premium Security Features</h2>
              <div className="space-y-4">
                {[
                  '24/7 CCTV Monitoring',
                  'Well-Lit Facilities',
                  'Emergency Call Boxes',
                  'Patrolled Parking Areas'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="relative h-64 bg-gray-800 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
              <img
                src="/assets/Images/security.jpg"
                alt="Security"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-16 bg-orange-50"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-block bg-white rounded-full px-6 py-2 mb-4 shadow-sm">
            ⚡ Live Pricing Updates
          </div>
          <h2 className="text-3xl font-bold mb-4">Smart Rate Adjustment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our system automatically adjusts prices based on real-time demand and availability
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="text-2xl font-bold text-orange-500">$3.20/h</div>
              <div className="text-sm">Current Average</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="text-2xl font-bold text-green-500">-15%</div>
              <div className="text-sm">Off-Peak Discount</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default FindParking