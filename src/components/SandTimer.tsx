import React from 'react';
import type { SandTimer as SandTimerType } from '../types/kitesGame';

interface SandTimerProps {
  timer: SandTimerType;
  onFlip?: () => void;
  isClickable?: boolean;
  showDetails?: boolean;
}

export const SandTimer: React.FC<SandTimerProps> = ({
  timer,
  onFlip,
  isClickable = false,
  showDetails = true
}) => {
  const getTimerColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500 border-red-600 text-white';
      case 'blue': return 'bg-blue-500 border-blue-600 text-white';
      case 'purple': return 'bg-purple-500 border-purple-600 text-white';
      case 'yellow': return 'bg-yellow-400 border-yellow-500 text-gray-800';
      case 'orange': return 'bg-orange-500 border-orange-600 text-white';
      case 'white': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-500 border-gray-600 text-white';
    }
  };

  const getProgressPercentage = () => {
    if (!timer.isActive) return 0;
    return (timer.remainingTime / timer.duration) * 100;
  };

  const formatTime = (seconds: number) => {
    return Math.ceil(seconds).toString();
  };

  const getTimerStatus = () => {
    if (!timer.isFlipped) return 'Ready to flip';
    if (timer.isActive) return 'Running';
    return 'Finished';
  };

  const getTimerStatusKorean = () => {
    if (!timer.isFlipped) return '뒤집을 준비';
    if (timer.isActive) return '작동 중';
    return '완료';
  };

  const handleClick = () => {
    if (isClickable && onFlip && !timer.isActive) {
      onFlip();
    }
  };

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        getTimerColorClass(timer.color)
      } ${
        isClickable && !timer.isActive 
          ? 'cursor-pointer hover:scale-105 hover:shadow-lg transform' 
          : ''
      } ${
        timer.isActive ? 'animate-pulse' : ''
      }`}
      onClick={handleClick}
      title={`${timer.color} timer (${timer.colorKorean})`}
    >
      {/* Timer Icon and Flip Animation */}
      <div className="text-center mb-3">
        <div className={`text-4xl transition-transform duration-500 ${
          timer.isFlipped ? 'rotate-180' : ''
        }`}>
          {timer.emoji}
        </div>
        <div className="text-sm font-bold mt-1">
          {timer.color.toUpperCase()}
        </div>
        <div className="text-xs opacity-75">
          {timer.colorKorean}
        </div>
      </div>

      {/* Progress Bar */}
      {timer.isActive && (
        <div className="mb-3">
          <div className="w-full bg-black bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}

      {/* Time Display */}
      <div className="text-center">
        <div className="text-2xl font-bold">
          {timer.isActive ? formatTime(timer.remainingTime) : timer.duration}
        </div>
        <div className="text-xs opacity-75">
          {timer.isActive ? 'seconds left' : 'seconds total'}
        </div>
      </div>

      {/* Status */}
      {showDetails && (
        <div className="mt-3 text-center">
          <div className="text-sm font-medium">
            {getTimerStatus()}
          </div>
          <div className="text-xs opacity-75">
            {getTimerStatusKorean()}
          </div>
        </div>
      )}

      {/* Click Hint */}
      {isClickable && !timer.isActive && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
          FLIP!
        </div>
      )}

      {/* Warning for Low Time */}
      {timer.isActive && timer.remainingTime <= 5 && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-30 rounded-xl flex items-center justify-center">
          <div className="text-white font-bold text-lg animate-pulse">
            ⚠️ LOW TIME!
          </div>
        </div>
      )}

      {/* Finished Overlay */}
      {timer.isFlipped && !timer.isActive && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="text-white font-bold text-lg">
            ✅ DONE
          </div>
        </div>
      )}
    </div>
  );
}; 