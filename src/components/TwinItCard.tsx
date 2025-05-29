import React from 'react';
import type { TwinItCard as TwinItCardType } from '../types/twinItGame';

interface TwinItCardProps {
  card: TwinItCardType;
  onClick?: () => void;
  isSelected?: boolean;
  isClickable?: boolean;
  showPattern?: boolean;
}

export const TwinItCard: React.FC<TwinItCardProps> = ({
  card,
  onClick,
  isSelected = false,
  isClickable = true,
  showPattern = true
}) => {
  const getCardColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500 border-red-600';
      case 'blue': return 'bg-blue-500 border-blue-600';
      case 'green': return 'bg-green-500 border-green-600';
      case 'yellow': return 'bg-yellow-400 border-yellow-500';
      case 'purple': return 'bg-purple-500 border-purple-600';
      case 'pink': return 'bg-pink-500 border-pink-600';
      case 'orange': return 'bg-orange-500 border-orange-600';
      case 'cyan': return 'bg-cyan-500 border-cyan-600';
      case 'magenta': return 'bg-fuchsia-500 border-fuchsia-600';
      case 'silver': return 'bg-gray-400 border-gray-500';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const handleClick = () => {
    if (isClickable && onClick && !card.isMatched) {
      onClick();
    }
  };

  return (
    <div
      className={`relative w-20 h-20 rounded-xl border-4 transition-all duration-300 ${
        getCardColorClass(card.color)
      } ${
        isClickable && !card.isMatched 
          ? 'cursor-pointer hover:scale-110 hover:shadow-lg transform' 
          : ''
      } ${
        isSelected ? 'ring-4 ring-white ring-opacity-80 scale-105' : ''
      } ${
        card.isMatched ? 'opacity-50 scale-95' : ''
      }`}
      onClick={handleClick}
      title={`${card.pattern} - ${card.color}`}
    >
      {/* Pattern Display */}
      {showPattern && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl filter drop-shadow-lg">
            {card.emoji}
          </div>
        </div>
      )}

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          ✓
        </div>
      )}

      {/* Matched Overlay */}
      {card.isMatched && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-70 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-lg">
            ✅
          </div>
        </div>
      )}

      {/* Card Back (when not visible) */}
      {!card.isVisible && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-white text-2xl">
            ?
          </div>
        </div>
      )}

      {/* Hover Effect */}
      {isClickable && !card.isMatched && (
        <div className="absolute inset-0 bg-white bg-opacity-0 hover:bg-opacity-20 rounded-lg transition-all duration-200" />
      )}
    </div>
  );
}; 