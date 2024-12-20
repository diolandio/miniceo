import React, { useState } from 'react';
import { X, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInauguration } from '../../hooks/useInauguration';

type InaugurationModalProps = {
  businessId: string;
  onClose: () => void;
};

export function InaugurationModal({ businessId, onClose }: InaugurationModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { inaugurateBusiness, isLoading } = useInauguration(businessId);

  const handleInaugurate = async () => {
    try {
      await inaugurateBusiness(date);
      onClose();
    } catch (error) {
      console.error('Erro ao inaugurar loja:', error);
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
            <PartyPopper className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold">Inaugurar Loja</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Escolha a data de inauguração da sua loja. A partir desta data, sua loja estará aberta para negócios!
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Inauguração
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleInaugurate}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50"
          >
            {isLoading ? 'Inaugurando...' : 'Inaugurar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}