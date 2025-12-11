import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <div id="preloader" className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="loading-wave flex space-x-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="loading-bar w-4 h-16 bg-orange-500 rounded-full"
            initial={{ scaleY: 0.3 }}
            animate={{
              scaleY: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;