import type { IslandTile, Boat, SeaCreature, SurviveGrammarExercise } from '../types/surviveGame';

export const islandTileTypes = [
  {
    type: 'beach' as const,
    emoji: '🏖️',
    name: 'Beach',
    nameKorean: '해변',
    baseCount: 8
  },
  {
    type: 'mountain' as const,
    emoji: '⛰️',
    name: 'Mountain',
    nameKorean: '산',
    baseCount: 6
  },
  {
    type: 'forest' as const,
    emoji: '🌲',
    name: 'Forest',
    nameKorean: '숲',
    baseCount: 6
  },
  {
    type: 'volcano' as const,
    emoji: '🌋',
    name: 'Volcano',
    nameKorean: '화산',
    baseCount: 4
  }
];

export const boats: Boat[] = [
  {
    id: 'boat-1',
    name: 'Fishing Boat',
    nameKorean: '어선',
    emoji: '🚤',
    capacity: 2,
    currentPassengers: [],
    position: { x: 0, y: 2 },
    isMoving: false
  },
  {
    id: 'boat-2',
    name: 'Sailboat',
    nameKorean: '범선',
    emoji: '⛵',
    capacity: 3,
    currentPassengers: [],
    position: { x: 4, y: 0 },
    isMoving: false
  },
  {
    id: 'boat-3',
    name: 'Motor Boat',
    nameKorean: '모터보트',
    emoji: '🛥️',
    capacity: 2,
    currentPassengers: [],
    position: { x: 2, y: 4 },
    isMoving: false
  }
];

export const seaCreatures: SeaCreature[] = [
  {
    id: 'shark-1',
    type: 'shark',
    name: 'Great White Shark',
    nameKorean: '백상아리',
    emoji: '🦈',
    position: { x: 1, y: 1 },
    isActive: false,
    effect: 'harmful',
    description: 'This shark is going to eat swimmers!',
    descriptionKorean: '이 상어가 수영하는 사람을 잡아먹을 것입니다!'
  },
  {
    id: 'whale-1',
    type: 'whale',
    name: 'Blue Whale',
    nameKorean: '대왕고래',
    emoji: '🐋',
    position: { x: 3, y: 1 },
    isActive: false,
    effect: 'harmful',
    description: 'This whale is going to destroy boats!',
    descriptionKorean: '이 고래가 보트를 파괴할 것입니다!'
  },
  {
    id: 'sea-monster-1',
    type: 'sea-monster',
    name: 'Kraken',
    nameKorean: '크라켄',
    emoji: '🐙',
    position: { x: 2, y: 3 },
    isActive: false,
    effect: 'harmful',
    description: 'This sea monster is going to attack everything!',
    descriptionKorean: '이 바다 괴물이 모든 것을 공격할 것입니다!'
  },
  {
    id: 'dolphin-1',
    type: 'dolphin',
    name: 'Friendly Dolphin',
    nameKorean: '친근한 돌고래',
    emoji: '🐬',
    position: { x: 0, y: 3 },
    isActive: false,
    effect: 'helpful',
    description: 'This dolphin is going to help you swim faster!',
    descriptionKorean: '이 돌고래가 더 빨리 수영할 수 있게 도와줄 것입니다!'
  },
  {
    id: 'dolphin-2',
    type: 'dolphin',
    name: 'Rescue Dolphin',
    nameKorean: '구조 돌고래',
    emoji: '🐬',
    position: { x: 4, y: 2 },
    isActive: false,
    effect: 'helpful',
    description: 'This dolphin is going to carry you to safety!',
    descriptionKorean: '이 돌고래가 안전한 곳으로 데려다 줄 것입니다!'
  }
];

export const grammarExercises: SurviveGrammarExercise[] = [
  {
    id: 'present-continuous-1',
    type: 'present-continuous',
    question: 'Complete: "I _____ swimming to the boat right now."',
    questionKorean: '빈칸을 채우세요: "나는 지금 보트로 _____ 있습니다."',
    options: ['am', 'is', 'are', 'was'],
    correctAnswer: 0,
    explanation: 'Use "am" with "I" for present continuous actions happening now.',
    explanationKorean: '"I"와 함께 현재 진행 중인 동작에는 "am"을 사용합니다.',
    points: 5,
    context: 'swimming'
  },
  {
    id: 'possessive-pronouns-1',
    type: 'possessive-pronouns',
    question: 'Complete: "This is _____ boat, not yours!"',
    questionKorean: '빈칸을 채우세요: "이것은 _____ 보트입니다, 당신 것이 아니에요!"',
    options: ['my', 'mine', 'me', 'I'],
    correctAnswer: 0,
    explanation: 'Use "my" before a noun to show possession.',
    explanationKorean: '소유를 나타낼 때 명사 앞에 "my"를 사용합니다.',
    points: 5,
    context: 'boat'
  },
  {
    id: 'immediate-plans-1',
    type: 'immediate-plans',
    question: 'Express your escape plan:',
    questionKorean: '탈출 계획을 표현하세요:',
    options: ['I will take this boat', 'I am going to take this boat', 'I took this boat yesterday', 'I might take a boat'],
    correctAnswer: 1,
    explanation: 'Use "going to" for immediate plans and intentions.',
    explanationKorean: '즉각적인 계획과 의도에는 "going to"를 사용합니다.',
    points: 5,
    context: 'escape'
  },
  {
    id: 'expressing-desires-1',
    type: 'expressing-desires',
    question: 'How do you express wanting to ride a dolphin?',
    questionKorean: '돌고래를 타고 싶다는 것을 어떻게 표현하나요?',
    options: ['I need to ride the dolphin', 'I want to ride the dolphin', 'I will ride the dolphin', 'I got the dolphin'],
    correctAnswer: 1,
    explanation: 'Use "want to" to express desires for specific actions.',
    explanationKorean: '특정 행동에 대한 욕구를 표현할 때 "want to"를 사용합니다.',
    points: 5,
    context: 'dolphin'
  },
  {
    id: 'present-continuous-2',
    type: 'present-continuous',
    question: 'Complete: "The shark _____ eating the swimmer!"',
    questionKorean: '빈칸을 채우세요: "상어가 수영하는 사람을 _____ 있습니다!"',
    options: ['am', 'is', 'are', 'was'],
    correctAnswer: 1,
    explanation: 'Use "is" with singular subjects like "shark" for present continuous.',
    explanationKorean: '"shark"와 같은 단수 주어에는 현재 진행형에서 "is"를 사용합니다.',
    points: 5,
    context: 'danger'
  }
];

export const keyExpressions = [
  {
    english: "I'm going to take this boat",
    korean: '나는 이 보트를 탈 것입니다',
    usage: 'Expressing immediate escape plans'
  },
  {
    english: "I'm going to swim here",
    korean: '나는 여기서 수영할 것입니다',
    usage: 'Expressing movement plans'
  },
  {
    english: 'This shark/whale/sea monster is going eat ____',
    korean: '이 상어/고래/바다 괴물이 ____을/를 잡아먹을 것입니다',
    usage: 'Describing threats and dangers'
  },
  {
    english: "I'm going to move my guy here.",
    korean: '나는 내 말을 여기로 움직일 것입니다.',
    usage: 'Describing game moves'
  }
];

export const createIslandGrid = (size: number): IslandTile[][] => {
  const grid: IslandTile[][] = [];
  let tileId = 0;
  let sinkOrder = 1;
  
  for (let y = 0; y < size; y++) {
    const row: IslandTile[] = [];
    for (let x = 0; x < size; x++) {
      // Center tiles are volcano, outer ring is beach, middle areas are forest/mountain
      let tileType: 'beach' | 'mountain' | 'forest' | 'volcano';
      const distanceFromCenter = Math.max(Math.abs(x - Math.floor(size/2)), Math.abs(y - Math.floor(size/2)));
      
      if (distanceFromCenter === 0) {
        tileType = 'volcano';
      } else if (distanceFromCenter === Math.floor(size/2)) {
        tileType = 'beach';
      } else if (Math.random() > 0.5) {
        tileType = 'forest';
      } else {
        tileType = 'mountain';
      }
      
      const typeInfo = islandTileTypes.find(t => t.type === tileType)!;
      
      row.push({
        id: `tile-${tileId++}`,
        type: tileType,
        emoji: typeInfo.emoji,
        name: typeInfo.name,
        nameKorean: typeInfo.nameKorean,
        isSinking: false,
        sinkOrder: sinkOrder++,
        hasPlayer: false
      });
    }
    grid.push(row);
  }
  
  return grid;
}; 