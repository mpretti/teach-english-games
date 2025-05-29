import React from 'react';
import type { ScotlandYardLocation } from '../types/scotlandYardGame';

interface LocationCardProps {
  location: ScotlandYardLocation;
  onClick?: () => void;
  isPlayerHere?: boolean;
  isCriminalHere?: boolean;
  isClickable?: boolean;
  showConnections?: boolean;
  isSelected?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onClick,
  isPlayerHere = false,
  isCriminalHere = false,
  isClickable = true,
  showConnections = false,
  isSelected = false
}) => {
  const getTransportColor = (type: string) => {
    switch (type) {
      case 'taxi': return 'bg-yellow-500 border-yellow-600';
      case 'bus': return 'bg-blue-500 border-blue-600';
      case 'subway': return 'bg-red-500 border-red-600';
      case 'boat': return 'bg-cyan-500 border-cyan-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'taxi': return '🚕';
      case 'bus': return '🚌';
      case 'subway': return '🚇';
      case 'boat': return '🚤';
      default: return '🚶';
    }
  };

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        getTransportColor(location.type)
      } ${
        isClickable 
          ? 'cursor-pointer hover:scale-105 hover:shadow-lg transform' 
          : ''
      } ${
        isSelected ? 'ring-4 ring-white ring-opacity-80 scale-105' : ''
      } ${
        isCriminalHere ? 'animate-pulse ring-4 ring-red-500' : ''
      }`}
      onClick={handleClick}
      title={`${location.name} (${location.nameKorean}) - ${location.type}`}
    >
      {/* Location Icon and Transport Type */}
      <div className="text-center mb-3">
        <div className="text-4xl mb-1">{location.emoji}</div>
        <div className="text-lg font-bold text-white">
          {getTransportIcon(location.type)}
        </div>
      </div>

      {/* Location Name */}
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-white mb-1">{location.name}</h3>
        <p className="text-sm text-white opacity-90">{location.nameKorean}</p>
      </div>

      {/* Transport Type Badge */}
      <div className="text-center mb-3">
        <span className="bg-white bg-opacity-20 text-white text-xs font-bold px-2 py-1 rounded-full">
          {location.type.toUpperCase()}
        </span>
      </div>

      {/* Player Indicators */}
      <div className="flex justify-center space-x-2 mb-2">
        {isPlayerHere && (
          <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            🕵️ DETECTIVE
          </div>
        )}
        {isCriminalHere && (
          <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            🦹 CRIMINAL
          </div>
        )}
      </div>

      {/* Connections Count */}
      {showConnections && (
        <div className="text-center">
          <div className="bg-white bg-opacity-30 text-white text-xs font-bold px-2 py-1 rounded">
            {location.connections.length} connections
          </div>
        </div>
      )}

      {/* Last Visited Indicator */}
      {location.lastVisited && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          T{location.lastVisited}
        </div>
      )}

      {/* Revealed Indicator */}
      {location.isRevealed && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          👁️
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          ✓
        </div>
      )}

      {/* Hover Effect */}
      {isClickable && (
        <div className="absolute inset-0 bg-white bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-200" />
      )}
    </div>
  );
}; 