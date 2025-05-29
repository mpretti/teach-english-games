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
  skillsKorean?: string[];
  vocabulary?: string[];
  grammar?: string[];
  difficulty?: string;
  difficultyKorean?: string;
  players?: string;
  time?: string;
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
    description: 'Create the perfect salad by collecting vegetables and scoring points with different combinations.',
    descriptionKorean: '다양한 야채를 모아서 완벽한 샐러드를 만들고 조합으로 점수를 얻으세요.',
    skills: ['Vocabulary', 'Decision Making', 'Strategy'],
    skillsKorean: ['어휘', '의사결정', '전략'],
    difficulty: 'Easy',
    difficultyKorean: '쉬움',
    players: '1-4',
    time: '15-30 min',
    emoji: '🥗',
    color: 'from-green-400 to-emerald-600',
    available: true
  },
  {
    id: 'for-sale',
    title: 'For Sale',
    titleKorean: '포 세일',
    theme: 'Buying and selling real estate',
    themeKorean: '부동산 매매',
    description: 'Buy and sell properties in this exciting real estate auction game.',
    descriptionKorean: '흥미진진한 부동산 경매 게임에서 부동산을 사고 파세요.',
    skills: ['Negotiation', 'Math', 'Risk Assessment'],
    skillsKorean: ['협상', '수학', '위험 평가'],
    difficulty: 'Medium',
    difficultyKorean: '보통',
    players: '1-6',
    time: '20-30 min',
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
    description: 'Escape the sinking island while avoiding sharks and managing limited resources.',
    descriptionKorean: '상어를 피하고 제한된 자원을 관리하며 가라앉는 섬에서 탈출하세요.',
    skills: ['Survival', 'Planning', 'Resource Management'],
    skillsKorean: ['생존', '계획', '자원 관리'],
    difficulty: 'Hard',
    difficultyKorean: '어려움',
    players: '1-4',
    time: '45-75 min',
    emoji: '🌊',
    color: 'from-cyan-400 to-blue-600',
    available: true
  },
  {
    id: 'kites',
    title: 'Kites',
    titleKorean: '카이트',
    theme: 'Flying kites for as long as possible',
    themeKorean: '가능한 한 오랫동안 연 날리기',
    description: 'Work together to keep colorful kites flying using sand timers and cooperation.',
    descriptionKorean: '모래시계와 협력을 이용해 화려한 연을 함께 날리세요.',
    skills: ['Cooperation', 'Time Management', 'Communication'],
    skillsKorean: ['협력', '시간 관리', '의사소통'],
    difficulty: 'Medium',
    difficultyKorean: '보통',
    players: '2-6',
    time: '10-15 min',
    emoji: '🪁',
    color: 'from-sky-400 to-blue-600',
    available: true
  },
  {
    id: 'twin-it',
    title: 'Twin It',
    titleKorean: '트윈 잇',
    theme: 'Fast pattern matching game',
    themeKorean: '빠른 패턴 매칭 게임',
    description: 'Fast-paced pattern matching game that improves reaction time and English fluency.',
    descriptionKorean: '반응 시간과 영어 유창성을 향상시키는 빠른 패턴 매칭 게임.',
    skills: ['Pattern Recognition', 'Speed', 'Observation'],
    skillsKorean: ['패턴 인식', '속도', '관찰력'],
    difficulty: 'Easy',
    difficultyKorean: '쉬움',
    players: '2-8',
    time: '10-15 min',
    emoji: '🎯',
    color: 'from-orange-400 to-pink-600',
    available: true
  },
  {
    id: 'scotland-yard',
    title: 'Scotland Yard',
    titleKorean: '스코틀랜드 야드',
    theme: 'Cooperative detective game',
    themeKorean: '협동 수사 게임',
    description: 'Cooperative detective game where players work together to catch the criminal in London.',
    descriptionKorean: '플레이어들이 협력하여 런던에서 범죄자를 잡는 협동 탐정 게임.',
    skills: ['Deduction', 'Cooperation', 'Logic'],
    skillsKorean: ['추론', '협력', '논리'],
    difficulty: 'Hard',
    difficultyKorean: '어려움',
    players: '2-6',
    time: '45-60 min',
    emoji: '🕵️',
    color: 'from-slate-400 to-blue-600',
    available: true
  },
  {
    id: 'dutch-blitz',
    title: 'Dutch Blitz',
    titleKorean: '더치 블리츠',
    theme: 'Real-time card game focused on speed and English fluency with imperative commands.',
    themeKorean: '명령문과 함께 속도와 영어 유창성에 중점을 둔 실시간 카드 게임.',
    description: 'Real-time card game focused on speed and English fluency with imperative commands.',
    descriptionKorean: '명령문과 함께 속도와 영어 유창성에 중점을 둔 실시간 카드 게임.',
    skills: ['Speed', 'Fluency', 'Hand-eye Coordination'],
    skillsKorean: ['속도', '유창성', '손과 눈의 협응'],
    difficulty: 'Medium',
    difficultyKorean: '보통',
    players: '2-4',
    time: '10-15 min',
    emoji: '🃏',
    color: 'from-pink-400 to-red-600',
    available: true
  },
  {
    id: 'manhattan',
    title: 'Manhattan',
    titleKorean: '맨해튼',
    theme: 'Strategic building game in NYC focused on superlatives and resource management.',
    themeKorean: '최상급과 자원 관리에 중점을 둔 뉴욕의 전략적 건설 게임.',
    description: 'Strategic building game in NYC focused on superlatives and resource management.',
    descriptionKorean: '최상급과 자원 관리에 중점을 둔 뉴욕의 전략적 건설 게임.',
    skills: ['Strategy', 'Resource Management', 'Superlatives'],
    skillsKorean: ['전략', '자원 관리', '최상급'],
    difficulty: 'Hard',
    difficultyKorean: '어려움',
    players: '2-4',
    time: '60-90 min',
    emoji: '🏙️',
    color: 'from-yellow-400 to-orange-600',
    available: true
  },
  {
    id: 'taco-cat',
    title: 'Taco Cat Goat Cheese Pizza',
    titleKorean: '타코 캣 고트 치즈 피자',
    theme: 'Fast pattern matching game with English vocabulary',
    themeKorean: '영어 어휘를 활용한 빠른 패턴 매칭 게임',
    description: 'Match words to pictures and sounds in this fast-paced pattern recognition game that improves English fluency.',
    descriptionKorean: '빠른 패턴 인식 게임에서 단어를 그림과 소리에 맞춰 영어 유창성을 향상시키세요.',
    skills: ['Vocabulary', 'Pattern Recognition', 'Quick Thinking', 'Listening'],
    skillsKorean: ['어휘', '패턴 인식', '빠른 사고', '듣기'],
    vocabulary: ['taco', 'cat', 'goat', 'cheese', 'pizza', 'gorilla', 'groundhog', 'narwhal'],
    grammar: ['Simple past tense', 'Expressing accomplishments', 'Quick responses'],
    difficulty: 'Easy',
    difficultyKorean: '쉬움',
    players: '2-8',
    time: '10-15 min',
    emoji: '🌮',
    color: 'from-orange-400 to-red-600',
    available: true
  },
  {
    id: 'no-mercy',
    title: 'No Mercy',
    titleKorean: '노 머시',
    theme: 'Western-themed risk management game',
    themeKorean: '서부 테마의 위험 관리 게임',
    description: 'Recruit Western characters while managing risk in this probability-based card game that teaches decision making.',
    descriptionKorean: '의사결정을 가르치는 확률 기반 카드 게임에서 위험을 관리하며 서부 캐릭터를 모집하세요.',
    skills: ['Risk Management', 'Probability', 'Decision Making', 'Present Continuous'],
    skillsKorean: ['위험 관리', '확률', '의사결정', '현재진행형'],
    vocabulary: ['banking', 'stopping', 'stealing', 'sheriff', 'outlaw', 'deputy', 'bandit', 'renegade'],
    grammar: ['Present continuous tense', 'Declarative statements', 'Expressing cessation'],
    difficulty: 'Medium',
    difficultyKorean: '보통',
    players: '2-6',
    time: '20-30 min',
    emoji: '🤠',
    color: 'from-amber-400 to-orange-600',
    available: true
  }
];

interface LandingPageProps {
  onGameSelect: (gameId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGameSelect }) => {
  // Keyboard event handler
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Prevent default behavior for our game keys
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(key)) {
        event.preventDefault();
      }

      // Map number keys to games
      const gameIndex = parseInt(key) - 1;
      if (gameIndex >= 0 && gameIndex < games.length) {
        const selectedGame = games[gameIndex];
        if (selectedGame && selectedGame.available) {
          onGameSelect(selectedGame.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onGameSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">English Learning Games</h1>
            <p className="text-xl text-gray-600">영어 학습 게임 컬렉션</p>
            <p className="text-gray-500 mt-2">Interactive games designed to help Korean students learn English through play</p>
            
            {/* Navigation Links */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => onGameSelect('synopses')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                📚 View Game Synopses
              </button>
            </div>
            
            <div className="mt-4 bg-indigo-50 rounded-lg p-3 max-w-md mx-auto">
              <p className="text-sm text-indigo-700 font-medium">⌨️ Keyboard Shortcuts:</p>
              <p className="text-xs text-indigo-600">Press <kbd className="bg-indigo-200 px-1 rounded">1</kbd>-<kbd className="bg-indigo-200 px-1 rounded">0</kbd> to select games</p>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
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
              
              {/* Keyboard shortcut indicator */}
              <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                {index + 1}
              </div>
              
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
                    {game.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
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
                <div className="mb-3">
                  <h4 className="font-semibold mb-2 text-sm">Key Vocabulary:</h4>
                  <div className="flex flex-wrap gap-1">
                    {game.vocabulary?.slice(0, 3).map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {word}
                      </span>
                    ))}
                    {game.vocabulary && game.vocabulary.length > 3 && (
                      <span className="text-xs opacity-75">+{game.vocabulary.length - 3} more</span>
                    )}
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