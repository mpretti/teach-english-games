import React from 'react';

interface Game {
  id: string;
  title: string;
  titleKorean: string;
  theme: string;
  themeKorean: string;
  description: string;
  descriptionKorean: string;
  skills: string[];
  vocabulary: string[];
  grammar: string[];
  emoji: string;
  color: string;
  available: boolean;
}

const games: Game[] = [
  {
    id: 'point-salad',
    title: 'Point Salad',
    titleKorean: '포인트 샐러드',
    theme: 'Making salads with vegetables',
    themeKorean: '야채로 샐러드 만들기',
    description: 'Students shop for vegetables to make a variety of salads, scoring points for efficiently using their groceries.',
    descriptionKorean: '학생들이 야채를 구매해서 다양한 샐러드를 만들며, 식료품을 효율적으로 사용해서 점수를 얻는 게임입니다.',
    skills: ['English', 'Math', 'Probability', 'Resource Management', 'Risk Management'],
    vocabulary: ['carrots', 'onions', 'lettuce', 'cabbage', 'tomatoes', 'bell peppers'],
    grammar: ['singular/plural', 'countable/uncountable nouns', 'future tense', 'articles', 'expressing quantities'],
    emoji: '🥗',
    color: 'from-green-400 to-emerald-600',
    available: true
  },
  {
    id: 'for-sale',
    title: 'For Sale',
    titleKorean: '부동산 포세일',
    theme: 'Buying and selling real estate',
    themeKorean: '부동산 매매',
    description: 'Students act as wealthy real estate brokers participating in auctions to purchase bad-to-good real estate in hopes of selling them off for a profit later.',
    descriptionKorean: '학생들이 부유한 부동산 중개인이 되어 경매에 참여하고, 나중에 이익을 위해 부동산을 사고파는 게임입니다.',
    skills: ['English', 'Math', 'Probability', 'Social Awareness', 'Resource Management', 'Risk Management', 'Budgeting'],
    vocabulary: ['house', 'apartment', 'office tower', 'condominium', 'estate', 'to bid', 'spent', 'won', 'pass', 'sold'],
    grammar: ['simple future/past', 'expressing results', 'possessive pronouns', 'expressing immediate plans', 'expressing desires'],
    emoji: '🏠',
    color: 'from-blue-400 to-indigo-600',
    available: true
  },
  {
    id: 'survive',
    title: 'Survive',
    titleKorean: '서바이브',
    theme: 'Escaping a sinking island',
    themeKorean: '가라앉는 섬에서 탈출하기',
    description: 'Students act as citizens of Atlantis which is sinking into the ocean. Students need to escape the volcanic island by getting in boats, swimming, or riding dolphins. All the while, they can impede their opponents progress by use of sharks, whales, and sea monsters.',
    descriptionKorean: '학생들이 바다로 가라앉고 있는 아틀란티스의 시민이 되어 보트를 타거나, 수영하거나, 돌고래를 타고 화산섬에서 탈출해야 합니다. 동시에 상어, 고래, 바다 괴물을 사용해서 상대방의 진행을 방해할 수 있습니다.',
    skills: ['English', 'Math', 'Probability', 'Social Awareness', 'Resource Management', 'Risk Management', 'Memory', 'Management of emotions', 'Teamwork', 'Negotiation'],
    vocabulary: ['beach', 'mountain', 'forest', 'volcano', 'boat', 'swim', 'shark', 'whale', 'sea monster', 'dolphin', 'take', 'eat'],
    grammar: ['present continuous', 'possessive pronouns', 'expressing immediate plans', 'expressing desires'],
    emoji: '🌊',
    color: 'from-cyan-400 to-blue-600',
    available: true
  },
  {
    id: 'kites',
    title: 'Kites',
    titleKorean: '연날리기',
    theme: 'Flying kites for as long as possible',
    themeKorean: '가능한 한 오랫동안 연 날리기',
    description: 'Students are kite flyers who need to work together to make sure the kites stay in the air. The kites are represented by sand timers which need to be continuously flowing.',
    descriptionKorean: '학생들이 연날리기 선수가 되어 연이 하늘에 계속 떠있도록 함께 협력해야 합니다. 연은 계속 흘러야 하는 모래시계로 표현됩니다.',
    skills: ['English', 'Communication', 'Time Management', 'Quick-Thinking', 'Social Awareness', 'Resource Management', 'Risk Management', 'Dexterity', 'Management of emotions', 'Teamwork'],
    vocabulary: ['(don\'t) have', 'Who', 'hurry', 'Does?', 'anyone', 'red', 'blue', 'purple', 'yellow', 'orange', 'white'],
    grammar: ['imperative', 'possessive pronouns', 'expressing immediate plans', 'expressing desires'],
    emoji: '🪁',
    color: 'from-sky-400 to-blue-600',
    available: true
  }
];

interface LandingPageProps {
  onGameSelect: (gameId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGameSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">English Learning Games</h1>
            <p className="text-xl text-gray-600">영어 학습 게임 컬렉션</p>
            <p className="text-gray-500 mt-2">Interactive games designed to help Korean students learn English through play</p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game) => (
            <div
              key={game.id}
              className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                game.available 
                  ? 'cursor-pointer transform hover:-translate-y-2' 
                  : 'opacity-75 cursor-not-allowed'
              }`}
              onClick={() => game.available && onGameSelect(game.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-90`}></div>
              
              {/* Content */}
              <div className="relative p-6 text-white">
                {/* Game Icon */}
                <div className="text-6xl mb-4 text-center">{game.emoji}</div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-center">{game.title}</h3>
                <p className="text-lg text-center mb-4 opacity-90">{game.titleKorean}</p>
                
                {/* Theme */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Theme:</h4>
                  <p className="text-sm opacity-90">{game.theme}</p>
                  <p className="text-xs opacity-75">{game.themeKorean}</p>
                </div>
                
                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm opacity-90 leading-relaxed">{game.description}</p>
                </div>
                
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Skills Developed:</h4>
                  <div className="flex flex-wrap gap-1">
                    {game.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {game.skills.length > 4 && (
                      <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                        +{game.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Key Vocabulary Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-sm">Key Vocabulary:</h4>
                  <div className="flex flex-wrap gap-1">
                    {game.vocabulary.slice(0, 3).map((word, index) => (
                      <span
                        key={index}
                        className="bg-white bg-opacity-30 text-xs px-2 py-1 rounded"
                      >
                        {word}
                      </span>
                    ))}
                    <span className="text-xs opacity-75">+{game.vocabulary.length - 3} more</span>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="text-center">
                  {game.available ? (
                    <button className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                      Play Game
                    </button>
                  ) : (
                    <div className="bg-white bg-opacity-30 text-white font-semibold py-3 px-6 rounded-lg">
                      Coming Soon
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                {!game.available && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Info */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Our Games</h2>
            <p className="text-gray-600 mb-4">
              Our educational games are designed specifically for Korean students learning English. 
              Each game combines language learning with strategic thinking, math skills, and cultural awareness.
            </p>
            <p className="text-gray-500 text-sm">
              우리의 교육 게임은 영어를 배우는 한국 학생들을 위해 특별히 설계되었습니다. 
              각 게임은 언어 학습과 전략적 사고, 수학 능력, 문화적 인식을 결합합니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-800">Educational Focus</h3>
                <p className="text-sm text-gray-600">Grammar, vocabulary, and practical English usage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎮</div>
                <h3 className="font-semibold text-gray-800">Interactive Learning</h3>
                <p className="text-sm text-gray-600">Engaging gameplay that makes learning fun</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌏</div>
                <h3 className="font-semibold text-gray-800">Cultural Bridge</h3>
                <p className="text-sm text-gray-600">Korean language support and cultural context</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 