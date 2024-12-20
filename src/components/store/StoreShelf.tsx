import React, { useState } from 'react';
import { Product } from '../../types/supabase';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { EditProductModal } from './EditProductModal';
import { DeleteProductModal } from './DeleteProductModal';

type StoreShelfProps = {
  title: string;
  products: Product[];
  type: 'toys' | 'food';
};

export function StoreShelf({ title, products, type }: StoreShelfProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  
  const bgColor = type === 'toys' ? 'bg-blue-50' : 'bg-orange-50';
  const borderColor = type === 'toys' ? 'border-blue-200' : 'border-orange-200';
  const iconColor = type === 'toys' ? 'text-blue-500' : 'text-orange-500';

  const Icon = title === 'Vitrine Principal' 
    ? Star 
    : title === 'Produtos Populares' 
      ? TrendingUp 
      : Sparkles;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${bgColor} rounded-3xl p-6 border-2 ${borderColor} shadow-xl`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => setEditingProduct(product)}
            onDelete={() => setDeletingProduct(product)}
          />
        ))}

        {products.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            <Icon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nenhum produto nesta seção ainda</p>
          </div>
        )}
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <DeleteProductModal
          productId={deletingProduct.id}
          productName={deletingProduct.name}
          businessId={deletingProduct.business_id}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </motion.div>
  );
}