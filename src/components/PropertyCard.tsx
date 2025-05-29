import React from 'react';
import type { Property } from '../types/forSaleGame';
import { formatCurrency } from '../utils/forSaleGameUtils';

interface PropertyCardProps {
  property: Property;
  isAuctionActive?: boolean;
  currentBid?: number;
  onBid?: (amount: number) => void;
  onPass?: () => void;
  playerMoney?: number;
  showBidControls?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isAuctionActive = false,
  currentBid = 0,
  onBid,
  onPass,
  playerMoney = 0,
  showBidControls = false
}) => {
  const getQualityColor = (quality: number): string => {
    if (quality <= 3) return 'text-red-600';
    if (quality <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getQualityText = (quality: number): string => {
    if (quality <= 3) return 'Poor';
    if (quality <= 6) return 'Average';
    return 'Excellent';
  };

  const getQualityTextKorean = (quality: number): string => {
    if (quality <= 3) return '나쁨';
    if (quality <= 6) return '보통';
    return '우수';
  };

  const nextBidAmount = Math.max(currentBid + 1, property.minBid);
  const canAffordBid = playerMoney >= nextBidAmount;

  return (
    <div className={`card transition-all duration-300 ${
      isAuctionActive ? 'border-blue-400 shadow-xl scale-105' : 'border-gray-200'
    }`}>
      <div className="text-center">
        {/* Property Icon */}
        <div className="text-6xl mb-4">{property.emoji}</div>
        
        {/* Property Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">{property.name}</h3>
        <p className="text-gray-600 mb-3">{property.nameKorean}</p>
        
        {/* Property Type */}
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-2">{property.description}</p>
        <p className="text-xs text-gray-500 mb-4">{property.descriptionKorean}</p>
        
        {/* Quality Rating */}
        <div className="mb-4">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Quality:</span>
            <span className={`font-bold ${getQualityColor(property.quality)}`}>
              {property.quality}/10
            </span>
          </div>
          <div className="flex justify-center space-x-1 mb-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < property.quality ? 'bg-yellow-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className={`text-xs ${getQualityColor(property.quality)}`}>
            {getQualityText(property.quality)} / {getQualityTextKorean(property.quality)}
          </p>
        </div>
        
        {/* Minimum Bid */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Minimum Bid:</span>
          <div className="text-lg font-bold text-blue-600">{formatCurrency(property.minBid)}</div>
        </div>
        
        {/* Current Auction Status */}
        {isAuctionActive && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">🔨 Active Auction</h4>
            <div className="text-lg font-bold text-blue-600">
              Current Bid: {formatCurrency(currentBid)}
            </div>
            <p className="text-xs text-blue-600 mt-1">현재 입찰가: {formatCurrency(currentBid)}</p>
          </div>
        )}
        
        {/* Bidding Controls */}
        {showBidControls && isAuctionActive && onBid && onPass && (
          <div className="space-y-3">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => onBid(nextBidAmount)}
                disabled={!canAffordBid}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  canAffordBid
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Bid {formatCurrency(nextBidAmount)}
              </button>
              <button
                onClick={onPass}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Pass
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Your money: {formatCurrency(playerMoney)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 