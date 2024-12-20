import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types/supabase';
import { StockBadge } from './StockBadge';

type ProductCardProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-4 shadow-md transform transition-all duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-square mb-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
        />
        {product.is_new && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Novo!
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-green-600 font-bold mb-2">
        R$ {product.price.toFixed(2)}
      </p>
      
      <div className="mb-3">
        <StockBadge 
          quantity={product.stock_quantity} 
          threshold={product.stock_alert_threshold} 
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200"
        >
          Excluir
        </button>
      </div>
    </motion.div>
  );
}