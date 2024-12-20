import React from 'react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-32 h-32 relative"
    >
      <img
        src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/miniceo-logo.png"
        alt="MiniCEO Logo"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}