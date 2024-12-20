import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type LogoAnimationProps = {
  children: React.ReactNode;
} & HTMLMotionProps<"div">;

export function LogoAnimation({ children, ...props }: LogoAnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut"
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}