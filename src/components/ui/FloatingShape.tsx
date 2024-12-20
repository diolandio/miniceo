import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type FloatingShapeProps = {
  Icon: LucideIcon;
  color: string;
  position: string;
};

export function FloatingShape({ Icon, color, position }: FloatingShapeProps) {
  return (
    <motion.div
      className={`absolute ${position} opacity-30`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Icon className={`w-12 h-12 ${color}`} />
    </motion.div>
  );
}