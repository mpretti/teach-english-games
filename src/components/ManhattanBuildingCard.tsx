import React from 'react';
import type { ManhattanBuilding } from '../types/manhattanGame';

interface ManhattanBuildingCardProps {
  building: ManhattanBuilding;
  onClick?: () => void;
  isSelected?: boolean;
  canAfford?: boolean;
  language: 'en' | 'ko';
}

const ManhattanBuildingCard: React.FC<ManhattanBuildingCardProps> = ({ 
  building, 
  onClick, 
  isSelected = false,
  canAfford = true,
  language
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'residential': return 'bg-green-500 border-green-600';
      case 'commercial': return 'bg-blue-500 border-blue-600';
      case 'office': return 'bg-purple-500 border-purple-600';
      case 'mixed': return 'bg-orange-500 border-orange-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getHeightClass = (height: number) => {
    if (height >= 400) return 'border-l-8 border-l-yellow-400'; // Skyscraper
    if (height >= 300) return 'border-l-6 border-l-blue-400'; // High-rise
    if (height >= 200) return 'border-l-4 border-l-green-400'; // Mid-rise
    return 'border-l-2 border-l-gray-400'; // Low-rise
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-200 border-2
        ${canAfford ? 'hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
        ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-70 scale-105' : ''}
        ${getHeightClass(building.height)}
      `}
      onClick={canAfford ? onClick : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{building.emoji}</span>
          <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(building.type)}`}>
            {building.type}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-800">${building.cost}</div>
          <div className="text-sm text-gray-500">{building.points} pts</div>
        </div>
      </div>

      {/* Building Name */}
      <div className="mb-3">
        <h3 className="font-bold text-gray-800 text-lg leading-tight">
          {language === 'ko' ? building.nameKorean : building.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {language === 'ko' ? building.descriptionKorean : building.description}
        </p>
      </div>

      {/* Building Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{building.height}m</div>
          <div className="text-xs text-gray-500">Height</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{building.floors}</div>
          <div className="text-xs text-gray-500">Floors</div>
        </div>
      </div>

      {/* Resource Requirements */}
      <div className="border-t pt-3">
        <div className="text-xs text-gray-500 mb-2">Requirements:</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-sm font-bold text-gray-700">🏗️ {building.requirements.steel}</div>
            <div className="text-xs text-gray-500">Steel</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-700">🪟 {building.requirements.glass}</div>
            <div className="text-xs text-gray-500">Glass</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-700">🧱 {building.requirements.concrete}</div>
            <div className="text-xs text-gray-500">Concrete</div>
          </div>
        </div>
      </div>

      {/* Affordability Indicator */}
      {!canAfford && (
        <div className="mt-3 text-center">
          <div className="text-xs text-red-600 font-medium">
            Insufficient Resources
          </div>
        </div>
      )}
    </div>
  );
};

export default ManhattanBuildingCard; 