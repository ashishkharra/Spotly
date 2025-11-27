import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    const box = {
        width: 50,
        height: 50,
        backgroundColor: "rgb(79 70 229 / var(--tw-bg-opacity))",
        borderRadius: 5,
    };

    return (
        <motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
    );
};

export default Loading;
