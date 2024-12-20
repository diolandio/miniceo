import React from 'react';
import { motion } from 'framer-motion';

type MascotProps = {
  emotion?: 'happy' | 'excited' | 'thinking';
  size?: 'sm' | 'md' | 'lg';
};

export function Mascot({ emotion = 'happy', size = 'md' }: MascotProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const mascotVariants = {
    happy: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    excited: {
      rotate: [-5, 5, -5],
      transition: {
        duration: 0.5,
        repeat: Infinity,
      }
    },
    thinking: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={mascotVariants}
      animate={emotion}
      className={`${sizes[size]} relative`}
    >
      <img
        src="https://api.dicebear.com/7.x/bottts/svg?seed=happy&backgroundColor=ffcdd2"
        alt="Mascote"
        className="w-full h-full"
      />
    </motion.div>
  );
}