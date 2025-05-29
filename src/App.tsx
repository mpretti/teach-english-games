import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Game } from './components/Game';
import { ForSaleGame } from './components/ForSaleGame';
import { KitesGame } from './components/KitesGame';
import { SurviveGame } from './components/SurviveGame';
import { TwinItGame } from './components/TwinItGame';
import { ScotlandYardGame } from './components/ScotlandYardGame';
import DutchBlitzGame from './components/DutchBlitzGame';
import ManhattanGame from './components/ManhattanGame';

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const handleGameSelect = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleBackToHome = () => {
    setCurrentGame(null);
  };

  if (currentGame === 'point-salad') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back to Home Button */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Games</span>
            </button>
          </div>
        </div>
        <Game />
      </div>
    );
  }

  if (currentGame === 'for-sale') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back to Home Button */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Games</span>
            </button>
          </div>
        </div>
        <ForSaleGame />
      </div>
    );
  }

  if (currentGame === 'survive') {
    return <SurviveGame onBack={handleBackToHome} />;
  }

  if (currentGame === 'kites') {
    return <KitesGame onBack={handleBackToHome} />;
  }

  if (currentGame === 'twin-it') {
    return <TwinItGame onBack={handleBackToHome} />;
  }

  if (currentGame === 'scotland-yard') {
    return <ScotlandYardGame onBack={handleBackToHome} />;
  }

  if (currentGame === 'dutch-blitz') {
    return <DutchBlitzGame difficulty="medium" language="en" onGameEnd={handleBackToHome} />;
  }

  if (currentGame === 'manhattan') {
    return <ManhattanGame difficulty="medium" language="en" onGameEnd={handleBackToHome} />;
  }

  return <LandingPage onGameSelect={handleGameSelect} />;
}

export default App;
