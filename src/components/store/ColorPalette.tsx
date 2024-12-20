import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type ColorPaletteProps = {
  palette: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  isSelected: boolean;
  onClick: () => void;
};

export function ColorPalette({ palette, isSelected, onClick }: ColorPaletteProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        p-4 rounded-2xl border-2 transition-all relative
        ${isSelected ? 'border-purple-500 shadow-lg' : 'border-gray-200'}
      `}
    >
      <div className="flex gap-2 mb-2">
        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: palette.primary }} />
        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: palette.secondary }} />
        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: palette.accent }} />
      </div>
      <p className="text-sm font-medium text-gray-700">{palette.name}</p>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-purple-500 text-white p-1 rounded-full">
          <Check className="w-4 h-4" />
        </div>
      )}
    </motion.button>
  );
}