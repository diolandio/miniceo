import React from 'react';
import { Store, UtensilsCrossed, Plus, ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '../../types/supabase';
import { motion } from 'framer-motion';

type StoreHeaderProps = {
  business: Business | null;
  onAddProduct: () => void;
  onManageInventory: () => void;
};

export function StoreHeader({ business, onAddProduct, onManageInventory }: StoreHeaderProps) {
  const Icon = business?.type === 'toys' ? Store : UtensilsCrossed;
  const bgGradient = business?.type === 'toys' 
    ? 'from-blue-500 to-purple-500'
    : 'from-orange-500 to-red-500';

  return (
    <div className="flex items-center gap-4">
      <Link 
        to="/dashboard"
        className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-800" />
      </Link>

      <div className="flex items-center gap-3">
        <div className={`bg-gradient-to-r ${bgGradient} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{business?.name}</h1>
      </div>
      
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onManageInventory}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 hover:shadow-lg transition-all"
        >
          <Package className="w-5 h-5" />
          <span>Estoque</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddProduct}
          className={`flex items-center gap-2 bg-gradient-to-r ${bgGradient} text-white px-4 py-2 rounded-full hover:shadow-lg transition-shadow`}
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Produto</span>
        </motion.button>
      </div>
    </div>
  );
}