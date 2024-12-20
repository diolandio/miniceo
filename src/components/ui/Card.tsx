import React from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-white rounded-3xl p-6 shadow-lg border-2 border-opacity-10
        hover:shadow-xl transition-shadow duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}