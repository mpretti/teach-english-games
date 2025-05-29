import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Game } from './components/Game';
import { ForSaleGame } from './components/ForSaleGame';
import { KitesGame } from './components/KitesGame';

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

  if (currentGame === 'kites') {
    return <KitesGame onBack={handleBackToHome} />;
  }

  return <LandingPage onGameSelect={handleGameSelect} />;
}

export default App;
