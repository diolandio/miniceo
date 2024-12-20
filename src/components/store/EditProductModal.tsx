import React, { useState } from 'react';
import { X, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../types/supabase';
import { ImageUpload } from './ImageUpload';
import { useProducts } from '../../hooks/useProducts';
import { uploadProductImage } from '../../lib/storage';

type EditProductModalProps = {
  product: Product;
  onClose: () => void;
};

export function EditProductModal({ product, onClose }: EditProductModalProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [stockQuantity, setStockQuantity] = useState(product.stock_quantity?.toString() || '0');
  const [alertThreshold, setAlertThreshold] = useState(product.stock_alert_threshold?.toString() || '5');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { updateProduct, isLoading } = useProducts(product.business_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageData = null;
      if (selectedImage) {
        imageData = await uploadProductImage(selectedImage);
      }

      await updateProduct(product.id, {
        name,
        price: parseFloat(price),
        stock_quantity: parseInt(stockQuantity),
        stock_alert_threshold: parseInt(alertThreshold),
        ...(imageData && {
          image_url: imageData.url,
          image_path: imageData.path,
          image_name: imageData.name
        })
      });
      
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold">Editar Produto</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade em Estoque
              </label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alerta de Estoque Baixo
              </label>
              <input
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <ImageUpload onImageSelect={setSelectedImage} currentImage={product.image_url} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}