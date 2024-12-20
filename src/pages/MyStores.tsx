import React from 'react';
import { Store, UtensilsCrossed, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStores } from '../hooks/useStores';
import { motion } from 'framer-motion';
import { DeleteStoreModal } from '../components/DeleteStoreModal';

export function MyStores() {
  const { stores, isLoading } = useStores();
  const [storeToDelete, setStoreToDelete] = React.useState<{ id: string; name: string } | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin text-purple-600">
          <Store className="w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="container mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Minhas Lojas</h1>
            <Link
              to="/criar-negocio"
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Criar Nova Loja
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <motion.div
                key={store.id}
                whileHover={{ scale: 1.03 }}
                className={`${
                  store.type === 'toys' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                    : 'bg-gradient-to-br from-orange-500 to-red-500'
                } rounded-xl p-6 text-white shadow-lg relative group`}
              >
                <Link to={`/loja/${store.id}`} className="block">
                  <div className="flex items-center space-x-3 mb-4">
                    {store.type === 'toys' ? (
                      <Store className="w-8 h-8" />
                    ) : (
                      <UtensilsCrossed className="w-8 h-8" />
                    )}
                    <h3 className="text-xl font-bold">{store.name}</h3>
                  </div>
                  <p className="text-white/80">
                    {store.type === 'toys' ? 'Loja de Brinquedos' : 'Lanchonete'}
                  </p>
                </Link>

                <button
                  onClick={() => setStoreToDelete({ id: store.id, name: store.name })}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            {stores.length === 0 && (
              <div className="col-span-full text-center p-8 bg-white rounded-xl shadow">
                <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Você ainda não tem nenhuma loja. Que tal criar uma?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {storeToDelete && (
        <DeleteStoreModal
          storeId={storeToDelete.id}
          storeName={storeToDelete.name}
          onClose={() => setStoreToDelete(null)}
        />
      )}
    </div>
  );
}