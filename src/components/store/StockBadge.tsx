import React from 'react';
import { AlertTriangle } from 'lucide-react';

type StockBadgeProps = {
  quantity: number;
  threshold: number;
};

export function StockBadge({ quantity, threshold }: StockBadgeProps) {
  if (quantity === 0) {
    return (
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Fora de estoque
      </span>
    );
  }

  if (quantity <= threshold) {
    return (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Estoque baixo: {quantity}
      </span>
    );
  }

  return (
    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
      Em estoque: {quantity}
    </span>
  );
}