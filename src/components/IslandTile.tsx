import React from 'react';
import type { IslandTile as IslandTileType } from '../types/surviveGame';

interface IslandTileProps {
  tile: IslandTileType;
  position: { x: number; y: number };
  isClickable?: boolean;
  onClick?: (position: { x: number; y: number }) => void;
  showPlayer?: boolean;
  playerEmoji?: string;
}

export const IslandTile: React.FC<IslandTileProps> = ({
  tile,
  position,
  isClickable = false,
  onClick,
  showPlayer = false,
  playerEmoji = '🧑'
}) => {
  const getTileClass = () => {
    let baseClass = 'w-16 h-16 border-2 flex items-center justify-center text-2xl transition-all duration-300 relative';
    
    if (tile.isSinking) {
      baseClass += ' bg-blue-200 border-blue-400 opacity-50';
    } else {
      switch (tile.type) {
        case 'beach':
          baseClass += ' bg-yellow-100 border-yellow-300';
          break;
        case 'mountain':
          baseClass += ' bg-gray-100 border-gray-300';
          break;
        case 'forest':
          baseClass += ' bg-green-100 border-green-300';
          break;
        case 'volcano':
          baseClass += ' bg-red-100 border-red-300';
          break;
        default:
          baseClass += ' bg-gray-50 border-gray-200';
      }
    }
    
    if (isClickable) {
      baseClass += ' cursor-pointer hover:scale-110 hover:shadow-lg';
    }
    
    if (tile.hasPlayer) {
      baseClass += ' ring-2 ring-blue-500';
    }
    
    return baseClass;
  };

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(position);
    }
  };

  return (
    <div
      className={getTileClass()}
      onClick={handleClick}
      title={`${tile.name} (${tile.nameKorean})`}
    >
      {/* Tile emoji */}
      <span className={tile.isSinking ? 'opacity-50' : ''}>{tile.emoji}</span>
      
      {/* Player indicator */}
      {showPlayer && tile.hasPlayer && (
        <div className="absolute -top-1 -right-1 text-sm bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
          {playerEmoji}
        </div>
      )}
      
      {/* Sinking indicator */}
      {tile.isSinking && (
        <div className="absolute inset-0 bg-blue-400 opacity-30 flex items-center justify-center">
          <span className="text-blue-800 text-xs font-bold">💧</span>
        </div>
      )}
      
      {/* Coordinates for debugging */}
      <div className="absolute -bottom-4 left-0 text-xs text-gray-400">
        {position.x},{position.y}
      </div>
    </div>
  );
}; 