import React from 'react';
import type { TacoCatCard } from '../types/tacoCatGame';

interface TacoCatCardProps {
  card: TacoCatCard;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const TacoCatCardComponent: React.FC<TacoCatCardProps> = ({
  card,
  isSelected = false,
  onClick,
  disabled = false,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-16 h-24 text-xs',
    medium: 'w-20 h-32 text-sm',
    large: 'w-24 h-36 text-base'
  };

  const baseClasses = `
    ${sizeClasses[size]}
    bg-white border-2 rounded-lg shadow-md
    flex flex-col items-center justify-center
    transition-all duration-200
    ${onClick && !disabled ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''}
    ${isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${card.isSpecial ? 'bg-gradient-to-br from-yellow-100 to-orange-100' : ''}
  `;

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <div className={baseClasses} onClick={handleClick}>
      {/* Card Image/Emoji */}
      <div className="text-2xl mb-1">
        {card.emoji}
      </div>
      
      {/* Card Word */}
      <div className="font-bold text-gray-800 text-center px-1">
        {card.word}
      </div>
      
      {/* Korean Translation */}
      <div className="text-xs text-gray-600 text-center px-1">
        {card.wordKorean}
      </div>
      
      {/* Special Card Indicator */}
      {card.isSpecial && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
      )}
    </div>
  );
}; 