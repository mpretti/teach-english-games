import React, { useState } from 'react';
import { ArrowLeft, Book, Users, Target, MessageSquare, Search, Filter } from 'lucide-react';

interface Synopsis {
  id: string;
  title: string;
  theme: string;
  description: string;
  skills: string[];
  vocabulary: string[];
  grammar: string[];
  expressions: string[];
  emoji: string;
  color: string;
}

const synopses: Synopsis[] = [
  {
    id: 'century-spice-road',
    title: 'Century: Spice Road',
    theme: 'Trading spices along ancient trade routes',
    description: 'Students act as spice merchants traveling the Silk Road, collecting and converting spices to fulfill valuable contracts and build their trading empire.',
    skills: ['English', 'Math', 'Resource Management', 'Strategic Planning', 'Economic Thinking', 'Pattern Recognition'],
    vocabulary: ['turmeric', 'saffron', 'cardamom', 'cinnamon', 'merchant', 'trade', 'convert', 'acquire', 'caravan', 'spice', 'market', 'contract'],
    grammar: ['present continuous', 'expressing transactions', 'comparative adjectives', 'expressing quantities', 'future plans', 'conditional statements', 'expressing preferences', 'superlatives (most valuable, least expensive)'],
    expressions: ['I will acquire this card.', 'I\'m converting two turmeric into one saffron.', 'I need three more cardamom.', 'This spice is more valuable than that one.'],
    emoji: '🌶️',
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 'ticket-to-ride',
    title: 'Ticket to Ride',
    theme: 'Building railway routes across North America',
    description: 'Students become railway tycoons in the early 1900s, collecting train cards and claiming railway routes to connect cities across the continent.',
    skills: ['English', 'Geography', 'Strategic Planning', 'Route Planning', 'Resource Management', 'Risk Assessment'],
    vocabulary: ['railway', 'locomotive', 'destination', 'route', 'station', 'track', 'passenger', 'freight', 'ticket', 'journey', 'connection', 'railroad'],
    grammar: ['expressing direction and movement', 'prepositions of place', 'future tense', 'expressing plans and intentions', 'comparative and superlative forms', 'expressing distance', 'past tense for completed actions'],
    expressions: ['I\'m going to claim this route.', 'This train goes from New York to Boston.', 'I need five blue cards to complete this route.', 'The longest route connects Seattle to Miami.'],
    emoji: '🚂',
    color: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'splendor',
    title: 'Splendor',
    theme: 'Renaissance gem merchants building jewelry empires',
    description: 'Students become wealthy gem merchants, collecting precious stones and building mines, transportation, and shops to attract noble patrons.',
    skills: ['English', 'Math', 'Economic Planning', 'Pattern Recognition', 'Resource Management', 'Strategic Thinking'],
    vocabulary: ['emerald', 'sapphire', 'ruby', 'diamond', 'onyx', 'merchant', 'noble', 'prestige', 'development', 'mine', 'jeweler', 'bonus', 'reserve'],
    grammar: ['expressing possession', 'present perfect tense', 'expressing achievements', 'comparative forms', 'expressing preferences', 'conditional statements', 'expressing quantities', 'superlatives'],
    expressions: ['I have enough gems to buy this card.', 'This development gives me a bonus.', 'I\'m reserving this card for later.', 'The noble requires four emeralds and three sapphires.'],
    emoji: '💎',
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'downforce',
    title: 'Downforce',
    theme: 'High-speed car racing with betting and strategy',
    description: 'Students become race car drivers and spectators, racing cars around a track while placing bets on which cars will win, place, and show.',
    skills: ['English', 'Math', 'Probability', 'Risk Assessment', 'Quick Decision Making', 'Prediction Skills'],
    vocabulary: ['race', 'speed', 'accelerate', 'overtake', 'bet', 'odds', 'finish line', 'lap', 'driver', 'mechanic', 'pit stop', 'victory'],
    grammar: ['expressing movement and speed', 'future predictions', 'expressing probability', 'comparative and superlative forms', 'expressing results', 'conditional statements'],
    expressions: ['The red car is going to win.', 'I bet five dollars on the blue car.', 'This car is faster than that one.', 'I\'m moving three spaces forward.'],
    emoji: '🏎️',
    color: 'from-red-400 to-orange-600'
  },
  {
    id: 'deep-sea-adventure',
    title: 'Deep Sea Adventure',
    theme: 'Underwater treasure hunting with limited oxygen',
    description: 'Students are deep-sea divers sharing oxygen while exploring the ocean floor for treasure, balancing greed with survival as they race back to the submarine.',
    skills: ['English', 'Math', 'Risk Management', 'Pressure Management', 'Resource Sharing', 'Strategic Thinking'],
    vocabulary: ['submarine', 'oxygen', 'treasure', 'dive', 'surface', 'pressure', 'depth', 'artifact', 'breathe', 'explore', 'danger', 'rescue'],
    grammar: ['expressing necessity and urgency', 'present continuous', 'expressing warnings', 'conditional statements', 'expressing concern', 'imperative for commands', 'expressing time pressure'],
    expressions: ['We\'re running out of oxygen!', 'I need to surface now.', 'This treasure is too heavy.', 'We must share the oxygen tank.'],
    emoji: '🤿',
    color: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'alhambra',
    title: 'Alhambra',
    theme: 'Building the most beautiful palace in medieval Spain',
    description: 'Students are master builders constructing the famous Alhambra palace, purchasing building tiles with different currencies and arranging them to create the most magnificent structure.',
    skills: ['English', 'Math', 'Architecture Concepts', 'Cultural Awareness', 'Resource Management', 'Spatial Planning'],
    vocabulary: ['palace', 'tower', 'garden', 'pavilion', 'architect', 'currency', 'construction', 'wall', 'beautiful', 'magnificent', 'design', 'structure'],
    grammar: ['expressing preferences', 'comparative and superlative forms', 'expressing opinions', 'describing appearance', 'expressing plans', 'possessive forms', 'expressing value and worth'],
    expressions: ['This tower is more beautiful than that one.', 'I\'m building a magnificent garden.', 'This costs exactly the right amount.', 'My palace has the longest wall.'],
    emoji: '🏰',
    color: 'from-yellow-400 to-red-600'
  },
  {
    id: 'bohnanza',
    title: 'Bohnanza',
    theme: 'Bean farming and trading for profit',
    description: 'Students become bean farmers, planting different types of beans in their fields and trading with other players to maximize their harvest profits.',
    skills: ['English', 'Math', 'Negotiation', 'Social Interaction', 'Economic Thinking', 'Trading Skills'],
    vocabulary: ['bean', 'plant', 'harvest', 'field', 'trade', 'profit', 'farmer', 'crop', 'grow', 'sell', 'exchange', 'negotiate'],
    grammar: ['expressing offers and requests', 'negotiation language', 'expressing agreement and disagreement', 'future tense', 'expressing quantities', 'conditional statements', 'expressing preferences'],
    expressions: ['I\'ll trade you two red beans for one blue bean.', 'Do you want to make a deal?', 'I\'m planting these beans in my field.', 'This harvest will give me three coins.'],
    emoji: '🫘',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 'karuba',
    title: 'Karuba',
    theme: 'Exploring a mysterious jungle island for treasure',
    description: 'Students are adventurers exploring the island of Karuba, laying path tiles to guide their explorers through the jungle to reach ancient temples and collect treasures.',
    skills: ['English', 'Spatial Reasoning', 'Path Planning', 'Quick Thinking', 'Pattern Recognition', 'Decision Making'],
    vocabulary: ['jungle', 'temple', 'treasure', 'explorer', 'path', 'adventure', 'crystal', 'gold', 'navigate', 'discover', 'ancient', 'mysterious'],
    grammar: ['expressing direction and movement', 'prepositions of place', 'expressing discovery', 'past tense for achievements', 'expressing location', 'imperative for directions', 'expressing success and failure'],
    expressions: ['I\'m placing this path tile here.', 'My explorer reached the temple!', 'This path leads to the treasure.', 'I discovered a golden crystal.'],
    emoji: '🗺️',
    color: 'from-emerald-400 to-green-600'
  },
  {
    id: 'skull-king',
    title: 'Skull King',
    theme: 'Pirate captains bidding on treasure-hunting tricks',
    description: 'Students become pirate captains, bidding on how many tricks they can win in each round while managing special pirate cards and avoiding the fearsome Skull King.',
    skills: ['English', 'Math', 'Prediction', 'Risk Assessment', 'Probability', 'Strategic Thinking'],
    vocabulary: ['pirate', 'captain', 'treasure', 'trick', 'bid', 'skull', 'sword', 'parrot', 'win', 'lose', 'predict', 'challenge'],
    grammar: ['expressing predictions', 'future tense', 'expressing confidence levels', 'conditional statements', 'expressing results', 'comparative forms', 'expressing success and failure'],
    expressions: ['I bid three tricks this round.', 'I think I can win this trick.', 'The Skull King beats all other cards.', 'I made exactly my bid!'],
    emoji: '☠️',
    color: 'from-slate-400 to-gray-600'
  },
  {
    id: 'avenue',
    title: 'Avenue',
    theme: 'Creating the longest roads through countryside landscapes',
    description: 'Students are road planners, simultaneously drawing roads on their maps to connect farms and create the longest possible routes through beautiful countryside.',
    skills: ['English', 'Spatial Planning', 'Pattern Recognition', 'Quick Thinking', 'Visual Processing', 'Strategic Planning'],
    vocabulary: ['road', 'farm', 'countryside', 'connect', 'route', 'landscape', 'path', 'village', 'draw', 'extend', 'longest', 'shortest'],
    grammar: ['expressing direction and connection', 'comparative and superlative forms', 'expressing location', 'present continuous', 'expressing completion', 'describing paths', 'expressing measurement'],
    expressions: ['I\'m drawing a road to the farm.', 'This route is longer than yours.', 'My road connects all the villages.', 'I\'m extending this path here.'],
    emoji: '🛣️',
    color: 'from-lime-400 to-green-600'
  },
  {
    id: 'survive-atlantis',
    title: 'Survive: Escape from Atlantis',
    theme: 'Escaping the sinking island of Atlantis',
    description: 'Students are citizens of the legendary Atlantis, racing to evacuate their people as the island sinks into the ocean, using boats, swimming, and sea creatures while avoiding sharks and whales.',
    skills: ['English', 'Strategic Planning', 'Risk Management', 'Survival Skills', 'Resource Management', 'Emergency Response'],
    vocabulary: ['island', 'sink', 'escape', 'boat', 'swim', 'shark', 'whale', 'dolphin', 'rescue', 'survive', 'ocean', 'volcano'],
    grammar: ['expressing urgency', 'imperative commands', 'expressing movement', 'present continuous', 'expressing danger', 'expressing help and rescue', 'expressing survival', 'conditional statements'],
    expressions: ['The island is sinking!', 'I\'m swimming to the boat.', 'Help! There\'s a shark!', 'We need to escape now.'],
    emoji: '🌊',
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'archaeology',
    title: 'Archaeology: The Lost Expedition',
    theme: 'Archaeological expeditions searching for ancient artifacts',
    description: 'Students are archaeologists on expeditions, carefully excavating sites to discover valuable artifacts while managing limited time and avoiding dangerous sandstorms.',
    skills: ['English', 'Historical Thinking', 'Risk Management', 'Scientific Method', 'Pattern Recognition', 'Cultural Awareness'],
    vocabulary: ['archaeology', 'artifact', 'excavate', 'expedition', 'ancient', 'discovery', 'museum', 'fossil', 'dig', 'uncover', 'valuable', 'historical'],
    grammar: ['expressing discovery', 'past tense for findings', 'expressing scientific processes', 'expressing value', 'expressing time periods', 'expressing careful actions', 'expressing historical significance'],
    expressions: ['I discovered an ancient artifact.', 'This fossil is very valuable.', 'I\'m carefully excavating this site.', 'We found something important here.'],
    emoji: '🏺',
    color: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'azul',
    title: 'Azul',
    theme: 'Creating beautiful tile mosaics for the royal palace',
    description: 'Students are artisan tile-layers, collecting colorful tiles and arranging them in patterns to create the most beautiful wall decorations for the Portuguese royal palace.',
    skills: ['English', 'Pattern Recognition', 'Spatial Planning', 'Artistic Thinking', 'Strategic Planning', 'Visual Processing'],
    vocabulary: ['tile', 'mosaic', 'pattern', 'wall', 'artisan', 'palace', 'beautiful', 'colorful', 'arrange', 'decorate', 'design', 'royal'],
    grammar: ['expressing artistic preferences', 'comparative and superlative forms', 'expressing visual descriptions', 'expressing completion', 'expressing patterns', 'expressing beauty and aesthetics', 'expressing arrangement'],
    expressions: ['I\'m taking these blue tiles.', 'This pattern is more beautiful.', 'I\'m placing this tile on my wall.', 'My mosaic is almost complete.'],
    emoji: '🎨',
    color: 'from-indigo-400 to-purple-600'
  },
  {
    id: 'stone-age',
    title: 'Stone Age',
    theme: 'Developing civilization from primitive beginnings',
    description: 'Students guide their tribes from the Stone Age to civilization, gathering resources, developing tools, building huts, and advancing their society through technological progress.',
    skills: ['English', 'Historical Thinking', 'Resource Management', 'Civilization Building', 'Strategic Planning', 'Cultural Development'],
    vocabulary: ['tribe', 'civilization', 'tools', 'resources', 'hunt', 'gather', 'build', 'develop', 'stone', 'wood', 'food', 'progress'],
    grammar: ['expressing development and progress', 'past tense for historical events', 'expressing needs and requirements', 'expressing advancement', 'expressing primitive vs. advanced', 'expressing survival', 'expressing technological progress'],
    expressions: ['My tribe is developing new tools.', 'We need more food to survive.', 'I\'m building a hut for my people.', 'Our civilization is advancing.'],
    emoji: '🪨',
    color: 'from-gray-400 to-slate-600'
  },
  {
    id: 'lost-cities',
    title: 'Lost Cities: The Board Game',
    theme: 'Mounting expeditions to discover lost civilizations',
    description: 'Students are explorers organizing expeditions to five mysterious lost cities, carefully managing their resources and timing to make the most profitable discoveries.',
    skills: ['English', 'Risk Management', 'Economic Planning', 'Adventure Planning', 'Strategic Thinking', 'Resource Allocation'],
    vocabulary: ['expedition', 'explorer', 'civilization', 'discovery', 'ancient', 'mysterious', 'profit', 'investment', 'journey', 'adventure', 'risk', 'reward'],
    grammar: ['expressing adventure and exploration', 'expressing risk and reward', 'expressing investment decisions', 'expressing discovery', 'expressing ancient history', 'expressing profit and loss', 'expressing expedition planning'],
    expressions: ['I\'m starting an expedition to the lost city.', 'This journey is very risky.', 'We discovered an ancient civilization.', 'My expedition made a huge profit.'],
    emoji: '🗿',
    color: 'from-teal-400 to-cyan-600'
  }
];

interface GameSynopsesProps {
  onBack: () => void;
}

export const GameSynopses: React.FC<GameSynopsesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Get all unique skills for filter
  const allSkills = Array.from(new Set(synopses.flatMap(s => s.skills))).sort();

  // Filter synopses based on search and skill filter
  const filteredSynopses = synopses.filter(synopsis => {
    const matchesSearch = synopsis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         synopsis.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         synopsis.vocabulary.some(word => word.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === '' || synopsis.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Games</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                <Book className="text-indigo-600" size={40} />
                Game Synopses
              </h1>
              <p className="text-xl text-gray-600">게임 시놉시스</p>
              <p className="text-gray-500 mt-2">Educational game synopses for English learning</p>
            </div>
            
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search games, themes, or vocabulary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Skill Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredSynopses.length} of {synopses.length} games
          </div>
        </div>

        {/* Synopses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSynopses.map((synopsis) => (
            <div
              key={synopsis.id}
              className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 ${
                expandedCard === synopsis.id ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
              onClick={() => setExpandedCard(expandedCard === synopsis.id ? null : synopsis.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${synopsis.color} opacity-90`}></div>
              
              {/* Content */}
              <div className="relative p-6 text-white">
                {/* Game Icon */}
                <div className="text-6xl mb-4 text-center">{synopsis.emoji}</div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-center">{synopsis.title}</h3>
                
                {/* Theme */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-1 text-lg">Theme:</h4>
                  <p className="text-sm opacity-90">{synopsis.theme}</p>
                </div>
                
                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm opacity-90 leading-relaxed">{synopsis.description}</p>
                </div>
                
                {/* Skills Preview */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <Target size={16} />
                    Skills Developed:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {synopsis.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {synopsis.skills.length > 4 && (
                      <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                        +{synopsis.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCard === synopsis.id && (
                  <div className="mt-6 space-y-6 border-t border-white border-opacity-30 pt-6">
                    {/* Key Vocabulary */}
                    <div>
                      <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <Book size={18} />
                        Key Vocabulary:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {synopsis.vocabulary.map((word, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full text-center"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Grammar Points */}
                    <div>
                      <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <Users size={18} />
                        Key Grammatical Points:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {synopsis.grammar.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="bg-green-100 text-green-800 text-sm px-3 py-2 rounded-lg"
                          >
                            • {point}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Expressions */}
                    <div>
                      <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                        <MessageSquare size={18} />
                        Key Expressions:
                      </h4>
                      <div className="space-y-2">
                        {synopsis.expressions.map((expression, expIndex) => (
                          <div
                            key={expIndex}
                            className="bg-purple-100 text-purple-800 text-sm px-4 py-2 rounded-lg italic"
                          >
                            "{expression}"
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Click to expand indicator */}
                <div className="text-center mt-4">
                  <span className="text-xs opacity-75">
                    {expandedCard === synopsis.id ? 'Click to collapse' : 'Click to view details'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About These Synopses</h2>
            <p className="text-gray-600 mb-4">
              These educational game synopses are designed specifically for Korean students learning English. 
              Each synopsis outlines how board games can be used as powerful tools for language acquisition, 
              combining strategic thinking with practical English communication skills.
            </p>
            <p className="text-gray-500 text-sm">
              이 교육용 게임 시놉시스는 영어를 배우는 한국 학생들을 위해 특별히 설계되었습니다. 
              각 시놉시스는 보드게임을 언어 습득의 강력한 도구로 활용하는 방법을 설명하며, 
              전략적 사고와 실용적인 영어 의사소통 기술을 결합합니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800">Comprehensive Learning</h3>
                <p className="text-sm text-gray-600">Vocabulary, grammar, and expressions integrated into gameplay</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-800">Skill Development</h3>
                <p className="text-sm text-gray-600">Multiple skills practiced simultaneously through strategic play</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-800">Cultural Context</h3>
                <p className="text-sm text-gray-600">Games provide rich cultural and thematic backgrounds for learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 