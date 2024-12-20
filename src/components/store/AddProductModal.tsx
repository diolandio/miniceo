import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { ImageUpload } from './ImageUpload';
import { uploadProductImage } from '../../lib/storage';

type AddProductModalProps = {
  businessId: string;
  businessType: 'toys' | 'food';
  onClose: () => void;
};

export function AddProductModal({ businessId, businessType, onClose }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('0');
  const [alertThreshold, setAlertThreshold] = useState('5');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { addProduct, isLoading } = useProducts(businessId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;
    
    try {
      const { url, path, name: imageName } = await uploadProductImage(selectedImage);
      
      await addProduct({
        name,
        price: parseFloat(price),
        stock_quantity: parseInt(stockQuantity),
        stock_alert_threshold: parseInt(alertThreshold),
        image_url: url,
        image_path: path,
        image_name: imageName,
        featured: false,
        popular: false,
        is_new: true
      });
      
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Adicionar Produto</h2>
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

          <ImageUpload onImageSelect={setSelectedImage} />

          <button
            type="submit"
            disabled={isLoading || !selectedImage}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
}