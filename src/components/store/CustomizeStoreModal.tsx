import React, { useState } from 'react';
import { X, Palette, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomizeStore } from '../../hooks/useCustomizeStore';
import { ColorPalette } from './ColorPalette';
import { ImageUpload } from './ImageUpload';

type CustomizeStoreModalProps = {
  businessId: string;
  currentName: string;
  currentTheme: string;
  onClose: () => void;
};

const PALETTES = [
  {
    name: 'Arco-íris',
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
  },
  {
    name: 'Doces',
    primary: '#FF9ECD',
    secondary: '#B6E3FF',
    accent: '#FFE5A9',
  },
  {
    name: 'Aventura',
    primary: '#7CC6FE',
    secondary: '#98E4D6',
    accent: '#FFDE7D',
  },
  {
    name: 'Fantasia',
    primary: '#C8A4FF',
    secondary: '#FFB4E1',
    accent: '#AFF8D8',
  },
];

export function CustomizeStoreModal({ 
  businessId, 
  currentName, 
  currentTheme,
  onClose 
}: CustomizeStoreModalProps) {
  const [name, setName] = useState(currentName);
  const [selectedPalette, setSelectedPalette] = useState(
    PALETTES.find(p => p.name === currentTheme) || PALETTES[0]
  );
  const [logo, setLogo] = useState<File | null>(null);
  const { updateStore, isLoading } = useCustomizeStore(businessId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStore({
        name,
        theme: selectedPalette.name,
        logo,
      });
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar loja:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 w-full max-w-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold">Personalizar Loja</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Loja
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 focus:ring-4 focus:ring-purple-200 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo da Loja
            </label>
            <ImageUpload onImageSelect={setLogo} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tema de Cores
            </label>
            <div className="grid grid-cols-2 gap-4">
              {PALETTES.map((palette) => (
                <ColorPalette
                  key={palette.name}
                  palette={palette}
                  isSelected={palette.name === selectedPalette.name}
                  onClick={() => setSelectedPalette(palette)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 rounded-full text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}