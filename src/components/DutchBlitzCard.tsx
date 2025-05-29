import React from 'react';
import type { DutchBlitzCard } from '../types/dutchBlitzGame';

interface DutchBlitzCardProps {
  card: DutchBlitzCard;
  onClick?: () => void;
  isSelected?: boolean;
  showBack?: boolean;
}

const DutchBlitzCard: React.FC<DutchBlitzCardProps> = ({ 
  card, 
  onClick, 
  isSelected = false,
  showBack = false 
}) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500 border-red-600';
      case 'yellow': return 'bg-yellow-400 border-yellow-500';
      case 'blue': return 'bg-blue-500 border-blue-600';
      case 'green': return 'bg-green-500 border-green-600';
      default: return 'bg-gray-400 border-gray-500';
    }
  };

  if (showBack) {
    return (
      <div className="w-16 h-24 bg-gradient-to-br from-purple-600 to-purple-800 border-2 border-purple-700 rounded-lg flex items-center justify-center shadow-md">
        <div className="text-white text-xs font-bold">🃏</div>
      </div>
    );
  }

  return (
    <div
      className={`
        w-16 h-24 border-2 rounded-lg flex flex-col items-center justify-center shadow-md cursor-pointer transition-all duration-200
        ${getColorClass(card.color)}
        ${card.isPlayable ? 'hover:scale-105 hover:shadow-lg' : 'opacity-50 cursor-not-allowed'}
        ${isSelected ? 'ring-4 ring-white ring-opacity-70 scale-105' : ''}
      `}
      onClick={card.isPlayable ? onClick : undefined}
    >
      <div className="text-white text-lg font-bold mb-1">
        {card.emoji}
      </div>
      <div className="text-white text-xl font-bold">
        {card.number}
      </div>
      <div className="text-white text-xs font-medium capitalize">
        {card.color}
      </div>
    </div>
  );
};

export default DutchBlitzCard; 