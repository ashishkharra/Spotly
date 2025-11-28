import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 25, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className={`fixed top-4 right-4 p-4 mt-8 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white flex items-center space-x-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {type === 'success' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
