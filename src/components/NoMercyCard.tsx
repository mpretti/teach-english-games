import React from 'react';
import type { NoMercyCard } from '../types/noMercyGame';

interface NoMercyCardProps {
  card: NoMercyCard;
  isRevealed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const NoMercyCardComponent: React.FC<NoMercyCardProps> = ({
  card,
  isRevealed = false,
  onClick,
  disabled = false,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-16 h-24 text-xs',
    medium: 'w-20 h-32 text-sm',
    large: 'w-24 h-36 text-base'
  };

  const colorClasses = {
    purple: 'from-purple-400 to-purple-600 text-white',
    yellow: 'from-yellow-400 to-yellow-600 text-black',
    red: 'from-red-400 to-red-600 text-white',
    brown: 'from-amber-600 to-amber-800 text-white',
    blue: 'from-blue-400 to-blue-600 text-white',
    orange: 'from-orange-400 to-orange-600 text-white',
    grey: 'from-gray-400 to-gray-600 text-white',
    pink: 'from-pink-400 to-pink-600 text-white',
    green: 'from-green-400 to-green-600 text-white',
    black: 'from-gray-800 to-black text-white'
  };

  const baseClasses = `
    ${sizeClasses[size]}
    border-2 rounded-lg shadow-md
    flex flex-col items-center justify-center
    transition-all duration-200 relative
    ${onClick && !disabled ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const cardClasses = isRevealed || card.isRevealed
    ? `${baseClasses} bg-gradient-to-br ${colorClasses[card.color]} border-gray-300`
    : `${baseClasses} bg-gradient-to-br from-gray-700 to-gray-900 text-white border-gray-600`;

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <div className={cardClasses} onClick={handleClick}>
      {isRevealed || card.isRevealed ? (
        <>
          {/* Card Number */}
          <div className="text-3xl font-bold mb-1">
            {card.number}
          </div>
          
          {/* Color Emoji */}
          <div className="text-lg mb-1">
            {card.emoji}
          </div>
          
          {/* Color Name */}
          <div className="text-xs font-medium capitalize">
            {card.color}
          </div>
        </>
      ) : (
        <>
          {/* Card Back Design */}
          <div className="text-2xl mb-2">🤠</div>
          <div className="text-xs font-bold">NO</div>
          <div className="text-xs font-bold">MERCY</div>
        </>
      )}
      
      {/* Western Theme Border */}
      <div className="absolute inset-0 border-2 border-yellow-600 rounded-lg opacity-30 pointer-events-none"></div>
    </div>
  );
}; 