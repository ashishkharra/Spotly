import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Error = () => {
  const location = useLocation();
  const message = location.state?.message || 'Something went wrong';
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
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/videos/errorVd.mp4"
        autoPlay
        loop
        muted
      ></video> */}

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative text-white text-center p-6"
      >
        <h1 className="text-6xl font-bold">404</h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-2xl mt-2"
        >
         {message} 
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
