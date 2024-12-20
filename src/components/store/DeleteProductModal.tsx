import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';

type DeleteProductModalProps = {
  productId: string;
  productName: string;
  businessId: string;
  onClose: () => void;
};

export function DeleteProductModal({ 
  productId, 
  productName, 
  businessId, 
  onClose 
}: DeleteProductModalProps) {
  const { deleteProduct, isLoading } = useProducts(businessId);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      onClose();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Excluir Produto</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-4 text-red-500">
            <Trash2 className="w-12 h-12" />
          </div>
          <p className="text-center text-gray-700">
            Tem certeza que deseja excluir o produto <strong>{productName}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}