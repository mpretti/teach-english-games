import type { ManhattanBuilding, ManhattanBlock, ManhattanGrammarExercise } from '../types/manhattanGame';

export const MANHATTAN_BUILDINGS: ManhattanBuilding[] = [
  {
    id: 'empire-state',
    name: 'Empire State Building',
    nameKorean: '엠파이어 스테이트 빌딩',
    height: 381,
    floors: 102,
    cost: 500,
    points: 50,
    type: 'office',
    emoji: '🏢',
    description: 'The tallest building in Manhattan',
    descriptionKorean: '맨해튼에서 가장 높은 건물',
    requirements: { steel: 8, glass: 6, concrete: 10 }
  },
  {
    id: 'chrysler-building',
    name: 'Chrysler Building',
    nameKorean: '크라이슬러 빌딩',
    height: 319,
    floors: 77,
    cost: 400,
    points: 40,
    type: 'office',
    emoji: '🏢',
    description: 'A beautiful Art Deco skyscraper',
    descriptionKorean: '아름다운 아르데코 마천루',
    requirements: { steel: 6, glass: 8, concrete: 6 }
  },
  {
    id: 'one-world-trade',
    name: 'One World Trade Center',
    nameKorean: '원 월드 트레이드 센터',
    height: 541,
    floors: 104,
    cost: 600,
    points: 60,
    type: 'office',
    emoji: '🏢',
    description: 'The newest and tallest building',
    descriptionKorean: '가장 새롭고 높은 건물',
    requirements: { steel: 10, glass: 8, concrete: 12 }
  },
  {
    id: 'central-park-tower',
    name: 'Central Park Tower',
    nameKorean: '센트럴 파크 타워',
    height: 472,
    floors: 98,
    cost: 550,
    points: 55,
    type: 'residential',
    emoji: '🏠',
    description: 'The tallest residential building',
    descriptionKorean: '가장 높은 주거용 건물',
    requirements: { steel: 7, glass: 10, concrete: 8 }
  },
  {
    id: 'times-square-tower',
    name: 'Times Square Tower',
    nameKorean: '타임스 스퀘어 타워',
    height: 200,
    floors: 45,
    cost: 250,
    points: 25,
    type: 'commercial',
    emoji: '🏬',
    description: 'A busy commercial building',
    descriptionKorean: '바쁜 상업용 건물',
    requirements: { steel: 4, glass: 6, concrete: 4 }
  },
  {
    id: 'brooklyn-bridge-tower',
    name: 'Brooklyn Bridge Tower',
    nameKorean: '브루클린 브리지 타워',
    height: 150,
    floors: 30,
    cost: 180,
    points: 18,
    type: 'mixed',
    emoji: '🏘️',
    description: 'A mixed-use development',
    descriptionKorean: '복합용도 개발',
    requirements: { steel: 3, glass: 4, concrete: 5 }
  },
  {
    id: 'wall-street-tower',
    name: 'Wall Street Tower',
    nameKorean: '월스트리트 타워',
    height: 280,
    floors: 60,
    cost: 350,
    points: 35,
    type: 'office',
    emoji: '🏢',
    description: 'A financial district building',
    descriptionKorean: '금융가 건물',
    requirements: { steel: 5, glass: 7, concrete: 6 }
  },
  {
    id: 'soho-loft',
    name: 'SoHo Loft Building',
    nameKorean: '소호 로프트 빌딩',
    height: 80,
    floors: 15,
    cost: 120,
    points: 12,
    type: 'residential',
    emoji: '🏠',
    description: 'A trendy residential building',
    descriptionKorean: '트렌디한 주거용 건물',
    requirements: { steel: 2, glass: 3, concrete: 3 }
  },
  {
    id: 'madison-square-tower',
    name: 'Madison Square Tower',
    nameKorean: '매디슨 스퀘어 타워',
    height: 220,
    floors: 50,
    cost: 280,
    points: 28,
    type: 'commercial',
    emoji: '🏬',
    description: 'A modern shopping complex',
    descriptionKorean: '현대적인 쇼핑 복합시설',
    requirements: { steel: 4, glass: 5, concrete: 5 }
  },
  {
    id: 'high-line-tower',
    name: 'High Line Tower',
    nameKorean: '하이라인 타워',
    height: 180,
    floors: 40,
    cost: 220,
    points: 22,
    type: 'mixed',
    emoji: '🏘️',
    description: 'A building near the High Line park',
    descriptionKorean: '하이라인 공원 근처 건물',
    requirements: { steel: 3, glass: 5, concrete: 4 }
  }
];

export const MANHATTAN_GRID: ManhattanBlock[][] = [
  [
    { id: 'a1', x: 0, y: 0, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 10, bonuses: ['corner'] },
    { id: 'a2', x: 1, y: 0, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 8, bonuses: [] },
    { id: 'a3', x: 2, y: 0, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 12, bonuses: ['park-view'] },
    { id: 'a4', x: 3, y: 0, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 10, bonuses: ['corner'] }
  ],
  [
    { id: 'b1', x: 0, y: 1, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 8, bonuses: [] },
    { id: 'b2', x: 1, y: 1, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 15, bonuses: ['central'] },
    { id: 'b3', x: 2, y: 1, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 15, bonuses: ['central'] },
    { id: 'b4', x: 3, y: 1, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 8, bonuses: [] }
  ],
  [
    { id: 'c1', x: 0, y: 2, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 12, bonuses: ['river-view'] },
    { id: 'c2', x: 1, y: 2, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 15, bonuses: ['central'] },
    { id: 'c3', x: 2, y: 2, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 15, bonuses: ['central'] },
    { id: 'c4', x: 3, y: 2, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 12, bonuses: ['river-view'] }
  ],
  [
    { id: 'd1', x: 0, y: 3, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 10, bonuses: ['corner'] },
    { id: 'd2', x: 1, y: 3, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 8, bonuses: [] },
    { id: 'd3', x: 2, y: 3, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 12, bonuses: ['park-view'] },
    { id: 'd4', x: 3, y: 3, buildings: [], totalHeight: 0, owner: null, isAvailable: true, baseValue: 10, bonuses: ['corner'] }
  ]
];

export const MANHATTAN_GRAMMAR_EXERCISES: ManhattanGrammarExercise[] = [
  {
    id: 'mn-grammar-1',
    type: 'superlatives',
    question: "Which building is the tallest in Manhattan?",
    questionKorean: "맨해튼에서 가장 높은 건물은?",
    options: [
      "Empire State Building is taller",
      "One World Trade Center is the tallest",
      "Chrysler Building is tall",
      "Central Park Tower is more tall"
    ],
    correctAnswer: 1,
    explanation: "Use 'the tallest' for superlatives with one syllable adjectives.",
    explanationKorean: "한 음절 형용사의 최상급은 'the tallest'를 사용합니다.",
    points: 15,
    context: 'height'
  },
  {
    id: 'mn-grammar-2',
    type: 'comparatives',
    question: "How do you compare two buildings?",
    questionKorean: "두 건물을 어떻게 비교하나요?",
    options: [
      "This building is more tall than that one",
      "This building is taller than that one",
      "This building is the tallest than that one",
      "This building is most tall than that one"
    ],
    correctAnswer: 1,
    explanation: "Use 'taller than' to compare two things.",
    explanationKorean: "두 가지를 비교할 때는 'taller than'을 사용합니다.",
    points: 10,
    context: 'building'
  },
  {
    id: 'mn-grammar-3',
    type: 'spatial',
    question: "Where should you put the building?",
    questionKorean: "건물을 어디에 놓아야 하나요?",
    options: [
      "I'm putting this building here",
      "I'm taking this building here",
      "I'm building this putting here",
      "I'm here putting this building"
    ],
    correctAnswer: 0,
    explanation: "Use 'putting [object] here/there' for placement.",
    explanationKorean: "배치할 때는 'putting [물체] here/there'를 사용합니다.",
    points: 10,
    context: 'building'
  },
  {
    id: 'mn-grammar-4',
    type: 'resources',
    question: "How do you describe what you need to build?",
    questionKorean: "건설에 필요한 것을 어떻게 설명하나요?",
    options: [
      "I need most steel for this building",
      "I need the most steel for this building",
      "I need more steel for this building",
      "I need steel most for this building"
    ],
    correctAnswer: 1,
    explanation: "Use 'the most' when comparing three or more quantities.",
    explanationKorean: "세 개 이상의 양을 비교할 때는 'the most'를 사용합니다.",
    points: 15,
    context: 'resources'
  },
  {
    id: 'mn-grammar-5',
    type: 'superlatives',
    question: "Which player has the majority control?",
    questionKorean: "어느 플레이어가 과반수 통제권을 가지고 있나요?",
    options: [
      "Player A has more buildings",
      "Player A has the most buildings",
      "Player A has most buildings",
      "Player A has the more buildings"
    ],
    correctAnswer: 1,
    explanation: "Use 'the most' for superlatives with countable nouns.",
    explanationKorean: "셀 수 있는 명사의 최상급은 'the most'를 사용합니다.",
    points: 15,
    context: 'majority'
  },
  {
    id: 'mn-grammar-6',
    type: 'spatial',
    question: "How do you describe building placement?",
    questionKorean: "건물 배치를 어떻게 설명하나요?",
    options: [
      "I'm building the tallest building on this block",
      "I'm building the taller building on this block",
      "I'm building the tall building on this block",
      "I'm building the most tall building on this block"
    ],
    correctAnswer: 0,
    explanation: "Use superlatives when describing the best choice among many options.",
    explanationKorean: "여러 선택지 중 최고를 설명할 때는 최상급을 사용합니다.",
    points: 20,
    context: 'building'
  }
];

export const RESOURCE_MARKET = {
  steel: { basePrice: 5, volatility: 0.2 },
  glass: { basePrice: 4, volatility: 0.3 },
  concrete: { basePrice: 3, volatility: 0.1 }
};

export const DIFFICULTY_SETTINGS = {
  easy: {
    startingResources: { steel: 10, glass: 10, concrete: 10, money: 100 },
    buildingCostMultiplier: 0.8,
    grammarFrequency: 0.3,
    maxRounds: 8
  },
  medium: {
    startingResources: { steel: 8, glass: 8, concrete: 8, money: 80 },
    buildingCostMultiplier: 1.0,
    grammarFrequency: 0.5,
    maxRounds: 10
  },
  hard: {
    startingResources: { steel: 6, glass: 6, concrete: 6, money: 60 },
    buildingCostMultiplier: 1.2,
    grammarFrequency: 0.7,
    maxRounds: 12
  }
}; 