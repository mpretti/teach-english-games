import React from 'react';
import type { Vegetable } from '../types/game';
import { formatCurrency } from '../utils/gameUtils';

interface VegetableCardProps {
  vegetable: Vegetable;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
}

export const VegetableCard: React.FC<VegetableCardProps> = ({
  vegetable,
  quantity,
  onQuantityChange,
  maxQuantity
}) => {
  return (
    <div className={`vegetable-card ${quantity > 0 ? 'selected' : ''}`}>
      <div className="text-center">
        <div className="text-4xl mb-2">{vegetable.emoji}</div>
        <h3 className="font-semibold text-lg text-gray-800">{vegetable.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{vegetable.nameKorean}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-primary-600 font-bold">{formatCurrency(vegetable.price)}</span>
          <span className="text-yellow-600 font-medium">{vegetable.points} pts</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
            disabled={quantity >= maxQuantity}
            className="w-8 h-8 rounded-full bg-primary-200 hover:bg-primary-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            +
          </button>
        </div>
        
        {quantity > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Total: {formatCurrency(vegetable.price * quantity)}
          </div>
        )}
      </div>
    </div>
  );
}; 