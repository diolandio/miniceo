import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store, UtensilsCrossed, Clock, Coins } from 'lucide-react';
import { StoreShelf } from './StoreShelf';
import { StoreHeader } from './StoreHeader';
import { AddProductModal } from './AddProductModal';
import { InventoryModal } from './InventoryModal';
import { useStore } from '../../hooks/useStore';

export function StoreLayout() {
  const { businessId } = useParams();
  const { business, products, isLoading } = useStore(businessId);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isManagingInventory, setIsManagingInventory] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="animate-bounce text-purple-600">
          {business?.type === 'toys' ? <Store className="w-12 h-12" /> : <UtensilsCrossed className="w-12 h-12" />}
        </div>
      </div>
    );
  }

  const bgColor = business?.type === 'toys' ? 'from-blue-100 to-purple-100' : 'from-orange-100 to-red-100';

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgColor}`}>
      <div className="bg-white/90 backdrop-blur-sm shadow-lg p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <StoreHeader 
            business={business} 
            onAddProduct={() => setIsAddingProduct(true)}
            onManageInventory={() => setIsManagingInventory(true)}
          />
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">7:20</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">720</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StoreShelf 
            title="Vitrine Principal" 
            products={products.filter(p => p.featured)} 
            type={business?.type}
          />
          <StoreShelf 
            title="Produtos Populares" 
            products={products.filter(p => p.popular)}
            type={business?.type}
          />
          <StoreShelf 
            title="Novidades" 
            products={products.filter(p => p.is_new)}
            type={business?.type}
          />
        </div>
      </div>

      {isAddingProduct && (
        <AddProductModal
          businessId={businessId!}
          businessType={business?.type!}
          onClose={() => setIsAddingProduct(false)}
        />
      )}

      {isManagingInventory && (
        <InventoryModal
          businessId={businessId!}
          products={products}
          onClose={() => setIsManagingInventory(false)}
        />
      )}
    </div>
  );
}