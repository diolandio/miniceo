import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBusinessHours } from '../../hooks/useBusinessHours';

const DAYS = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
];

type BusinessHoursModalProps = {
  businessId: string;
  onClose: () => void;
};

export function BusinessHoursModal({ businessId, onClose }: BusinessHoursModalProps) {
  const { businessHours, updateHours, isLoading } = useBusinessHours(businessId);
  const [hours, setHours] = useState(
    DAYS.map((_, index) => ({
      day_of_week: index,
      open_time: businessHours.find(h => h.day_of_week === index)?.open_time || '09:00',
      close_time: businessHours.find(h => h.day_of_week === index)?.close_time || '18:00'
    }))
  );

  const handleSave = async () => {
    try {
      await updateHours(hours);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar horários:', error);
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
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold">Horário de Funcionamento</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {DAYS.map((day, index) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-24 font-medium">{day}</span>
              <input
                type="time"
                value={hours[index].open_time}
                onChange={(e) => {
                  const newHours = [...hours];
                  newHours[index].open_time = e.target.value;
                  setHours(newHours);
                }}
                className="border rounded-lg px-3 py-2"
              />
              <span>até</span>
              <input
                type="time"
                value={hours[index].close_time}
                onChange={(e) => {
                  const newHours = [...hours];
                  newHours[index].close_time = e.target.value;
                  setHours(newHours);
                }}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}