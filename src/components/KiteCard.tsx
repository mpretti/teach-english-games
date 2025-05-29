import React from 'react';
import type { Kite } from '../types/kitesGame';

interface KiteCardProps {
  kite: Kite;
  onLaunch?: () => void;
  canLaunch?: boolean;
  requiredTimersStatus?: { [color: string]: boolean };
  showLaunchButton?: boolean;
}

export const KiteCard: React.FC<KiteCardProps> = ({
  kite,
  onLaunch,
  canLaunch = false,
  requiredTimersStatus = {},
  showLaunchButton = true
}) => {
  const getAltitudeColor = (altitude: number) => {
    if (altitude >= 80) return 'text-green-500';
    if (altitude >= 50) return 'text-yellow-500';
    if (altitude >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  const getAltitudeBackground = (altitude: number) => {
    if (altitude >= 80) return 'bg-green-100 border-green-300';
    if (altitude >= 50) return 'bg-yellow-100 border-yellow-300';
    if (altitude >= 20) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  const getTimerStatusColor = (color: string) => {
    const isActive = requiredTimersStatus[color];
    return isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600';
  };

  const getWindResistanceStars = (resistance: number) => {
    const stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(
        <span key={i} className={i < resistance ? 'text-yellow-400' : 'text-gray-300'}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`card transition-all duration-300 ${
      kite.isFlying 
        ? `${getAltitudeBackground(kite.altitude)} transform hover:scale-105 shadow-lg` 
        : 'bg-white hover:shadow-md'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">{kite.emoji}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{kite.name}</h3>
            <p className="text-gray-600">{kite.nameKorean}</p>
          </div>
        </div>
        
        {/* Flying Status */}
        {kite.isFlying && (
          <div className="text-right">
            <div className={`text-2xl font-bold ${getAltitudeColor(kite.altitude)}`}>
              {kite.altitude}m
            </div>
            <div className="text-xs text-gray-500">altitude</div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm mb-1">{kite.description}</p>
        <p className="text-gray-600 text-xs">{kite.descriptionKorean}</p>
      </div>

      {/* Wind Resistance */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Wind Resistance:</span>
          <span className="text-sm text-gray-600">{kite.windResistance}/10</span>
        </div>
        <div className="flex space-x-1">
          {getWindResistanceStars(kite.windResistance)}
        </div>
      </div>

      {/* Required Timers */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Required Timers:</h4>
        <div className="flex flex-wrap gap-2">
          {kite.requiredTimers.map((timerColor, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                getTimerStatusColor(timerColor)
              }`}
            >
              {timerColor}
            </span>
          ))}
        </div>
      </div>

      {/* Altitude Progress Bar (for flying kites) */}
      {kite.isFlying && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Altitude:</span>
            <span className="text-sm text-gray-600">{kite.altitude}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                kite.altitude >= 80 ? 'bg-green-500' :
                kite.altitude >= 50 ? 'bg-yellow-500' :
                kite.altitude >= 20 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${kite.altitude}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      {showLaunchButton && !kite.isFlying && (
        <button
          onClick={onLaunch}
          disabled={!canLaunch}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            canLaunch
              ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canLaunch ? '🚀 Launch Kite!' : '❌ Missing Timers'}
        </button>
      )}

      {/* Flying Status */}
      {kite.isFlying && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full">
            <span className="animate-bounce">🪁</span>
            <span className="font-medium">Flying High!</span>
            <span className="animate-bounce">🪁</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">하늘을 날고 있습니다!</p>
        </div>
      )}

      {/* Emergency Warning */}
      {kite.isFlying && kite.altitude <= 20 && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
          <div className="flex items-center space-x-2 text-red-700">
            <span className="animate-pulse">⚠️</span>
            <span className="font-bold text-sm">EMERGENCY!</span>
            <span className="animate-pulse">⚠️</span>
          </div>
          <p className="text-red-600 text-xs mt-1">
            Kite is losing altitude! Check timers!
          </p>
          <p className="text-red-600 text-xs">
            연이 고도를 잃고 있습니다! 타이머를 확인하세요!
          </p>
        </div>
      )}
    </div>
  );
}; 