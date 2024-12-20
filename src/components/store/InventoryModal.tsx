import React, { useState } from 'react';
import { X, Package } from 'lucide-react';
import { Product } from '../../types/supabase';
import { motion } from 'framer-motion';
import { EditProductModal } from './EditProductModal';
import { StockBadge } from './StockBadge';

type InventoryModalProps = {
  businessId: string;
  products: Product[];
  onClose: () => void;
};

export function InventoryModal({ products, onClose }: InventoryModalProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold">Gerenciar Estoque</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Produto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Preço</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estoque</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <StockBadge 
                      quantity={product.stock_quantity} 
                      threshold={product.stock_alert_threshold} 
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {product.featured && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Vitrine
                        </span>
                      )}
                      {product.popular && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          Popular
                        </span>
                      )}
                      {product.is_new && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Novo
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum produto cadastrado ainda</p>
            </div>
          )}
        </div>
      </motion.div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}