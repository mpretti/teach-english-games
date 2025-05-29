import type { ScotlandYardLocation, ScotlandYardGrammarExercise, TransportRoute, DeductionClue } from '../types/scotlandYardGame';

export const londonLocations: ScotlandYardLocation[] = [
  // Central London
  { id: 'trafalgar-square', name: 'Trafalgar Square', nameKorean: '트라팔가 광장', type: 'taxi', emoji: '🏛️', connections: ['piccadilly-circus', 'charing-cross', 'whitehall'], isRevealed: false },
  { id: 'piccadilly-circus', name: 'Piccadilly Circus', nameKorean: '피카딜리 서커스', type: 'subway', emoji: '🎭', connections: ['trafalgar-square', 'oxford-street', 'regent-street'], isRevealed: false },
  { id: 'oxford-street', name: 'Oxford Street', nameKorean: '옥스퍼드 스트리트', type: 'bus', emoji: '🛍️', connections: ['piccadilly-circus', 'marble-arch', 'tottenham-court'], isRevealed: false },
  { id: 'covent-garden', name: 'Covent Garden', nameKorean: '코벤트 가든', type: 'taxi', emoji: '🎪', connections: ['leicester-square', 'holborn', 'strand'], isRevealed: false },
  { id: 'leicester-square', name: 'Leicester Square', nameKorean: '레스터 스퀘어', type: 'subway', emoji: '🎬', connections: ['covent-garden', 'piccadilly-circus', 'charing-cross'], isRevealed: false },
  
  // Thames Area
  { id: 'tower-bridge', name: 'Tower Bridge', nameKorean: '타워 브리지', type: 'boat', emoji: '🌉', connections: ['tower-of-london', 'london-bridge', 'bermondsey'], isRevealed: false },
  { id: 'london-bridge', name: 'London Bridge', nameKorean: '런던 브리지', type: 'subway', emoji: '🌁', connections: ['tower-bridge', 'southwark', 'borough'], isRevealed: false },
  { id: 'westminster', name: 'Westminster', nameKorean: '웨스트민스터', type: 'boat', emoji: '🏛️', connections: ['big-ben', 'parliament', 'lambeth'], isRevealed: false },
  { id: 'big-ben', name: 'Big Ben', nameKorean: '빅벤', type: 'taxi', emoji: '🕰️', connections: ['westminster', 'parliament', 'whitehall'], isRevealed: false },
  
  // North London
  { id: 'kings-cross', name: "King's Cross", nameKorean: '킹스 크로스', type: 'subway', emoji: '🚂', connections: ['euston', 'angel', 'russell-square'], isRevealed: false },
  { id: 'camden', name: 'Camden', nameKorean: '캠든', type: 'bus', emoji: '🎸', connections: ['regent-park', 'chalk-farm', 'mornington-crescent'], isRevealed: false },
  { id: 'regent-park', name: 'Regent Park', nameKorean: '리젠트 파크', type: 'taxi', emoji: '🌳', connections: ['camden', 'baker-street', 'great-portland'], isRevealed: false },
  
  // East London
  { id: 'canary-wharf', name: 'Canary Wharf', nameKorean: '카나리 워프', type: 'subway', emoji: '🏢', connections: ['isle-of-dogs', 'poplar', 'greenwich'], isRevealed: false },
  { id: 'greenwich', name: 'Greenwich', nameKorean: '그리니치', type: 'boat', emoji: '⛵', connections: ['canary-wharf', 'cutty-sark', 'royal-observatory'], isRevealed: false },
  
  // West London
  { id: 'hyde-park', name: 'Hyde Park', nameKorean: '하이드 파크', type: 'taxi', emoji: '🌲', connections: ['marble-arch', 'knightsbridge', 'paddington'], isRevealed: false },
  { id: 'notting-hill', name: 'Notting Hill', nameKorean: '노팅힐', type: 'bus', emoji: '🎨', connections: ['portobello', 'bayswater', 'holland-park'], isRevealed: false },
  
  // South London
  { id: 'clapham', name: 'Clapham', nameKorean: '클래펌', type: 'subway', emoji: '🏘️', connections: ['brixton', 'stockwell', 'wandsworth'], isRevealed: false },
  { id: 'brixton', name: 'Brixton', nameKorean: '브릭스턴', type: 'bus', emoji: '🎵', connections: ['clapham', 'streatham', 'herne-hill'], isRevealed: false }
];

export const transportRoutes: TransportRoute[] = [
  // Taxi routes (short distance, cheap)
  { from: 'trafalgar-square', to: 'piccadilly-circus', type: 'taxi', cost: 1 },
  { from: 'trafalgar-square', to: 'charing-cross', type: 'taxi', cost: 1 },
  { from: 'big-ben', to: 'westminster', type: 'taxi', cost: 1 },
  { from: 'covent-garden', to: 'leicester-square', type: 'taxi', cost: 1 },
  { from: 'hyde-park', to: 'marble-arch', type: 'taxi', cost: 1 },
  
  // Bus routes (medium distance, medium cost)
  { from: 'oxford-street', to: 'marble-arch', type: 'bus', cost: 1 },
  { from: 'camden', to: 'regent-park', type: 'bus', cost: 1 },
  { from: 'notting-hill', to: 'bayswater', type: 'bus', cost: 1 },
  { from: 'brixton', to: 'clapham', type: 'bus', cost: 1 },
  
  // Subway routes (long distance, expensive)
  { from: 'piccadilly-circus', to: 'leicester-square', type: 'subway', cost: 2 },
  { from: 'kings-cross', to: 'euston', type: 'subway', cost: 2 },
  { from: 'london-bridge', to: 'tower-bridge', type: 'subway', cost: 2 },
  { from: 'canary-wharf', to: 'greenwich', type: 'subway', cost: 2 },
  { from: 'clapham', to: 'brixton', type: 'subway', cost: 2 },
  
  // Boat routes (Thames only, special)
  { from: 'tower-bridge', to: 'london-bridge', type: 'boat', cost: 1 },
  { from: 'westminster', to: 'big-ben', type: 'boat', cost: 1 },
  { from: 'greenwich', to: 'canary-wharf', type: 'boat', cost: 1 }
];

export const grammarExercises: ScotlandYardGrammarExercise[] = [
  {
    id: 'imperative-1',
    type: 'imperative',
    question: 'Give a command to your team: "_____ you should go here"',
    questionKorean: '팀에게 명령하세요: "_____ 여기로 가야 합니다"',
    options: ['I think', 'You think', 'We think', 'They think'],
    correctAnswer: 0,
    explanation: 'Use "I think" to give suggestions politely.',
    explanationKorean: '정중하게 제안할 때 "I think"를 사용합니다.',
    points: 5,
    context: 'planning'
  },
  {
    id: 'declarative-1',
    type: 'declarative',
    question: 'State your plan: "I\'m taking a _____ to _____"',
    questionKorean: '계획을 말하세요: "나는 _____로 _____에 갑니다"',
    options: ['taxi, Westminster', 'bus, Westminster', 'subway, Westminster', 'boat, Westminster'],
    correctAnswer: 0,
    explanation: 'Choose appropriate transport for the destination.',
    explanationKorean: '목적지에 적합한 교통수단을 선택하세요.',
    points: 5,
    context: 'movement'
  },
  {
    id: 'expressing-ideas-1',
    type: 'expressing-ideas',
    question: 'Share your deduction: "Where do you think I should go?"',
    questionKorean: '추론을 공유하세요: "어디로 가야 한다고 생각하세요?"',
    options: ['Where do you think I should go?', 'Where I should go?', 'Where should I go you think?', 'You think where should I go?'],
    correctAnswer: 0,
    explanation: 'Use proper question word order for asking opinions.',
    explanationKorean: '의견을 물을 때 올바른 의문문 어순을 사용하세요.',
    points: 5,
    context: 'deduction'
  },
  {
    id: 'expressing-opinions-1',
    type: 'expressing-opinions',
    question: 'Give your opinion: "He could be here, _____."',
    questionKorean: '의견을 말하세요: "그는 여기 있을 수 있습니다, _____."',
    options: ['I think', 'you think', 'he thinks', 'we thinks'],
    correctAnswer: 0,
    explanation: 'Use "I think" to express your personal opinion.',
    explanationKorean: '개인적인 의견을 표현할 때 "I think"를 사용합니다.',
    points: 5,
    context: 'cooperation'
  },
  {
    id: 'imperative-2',
    type: 'imperative',
    question: 'Suggest a strategy: "_____ we should check the subway stations"',
    questionKorean: '전략을 제안하세요: "_____ 지하철역들을 확인해야 합니다"',
    options: ['I think', 'You think', 'He think', 'They thinks'],
    correctAnswer: 0,
    explanation: 'Use "I think" for making strategic suggestions.',
    explanationKorean: '전략적 제안을 할 때 "I think"를 사용합니다.',
    points: 5,
    context: 'planning'
  }
];

export const deductionClues: DeductionClue[] = [
  {
    id: 'clue-1',
    type: 'transport',
    description: 'The criminal used a taxi recently',
    descriptionKorean: '범인이 최근에 택시를 이용했습니다',
    isRevealed: false,
    turn: 0
  },
  {
    id: 'clue-2',
    type: 'location',
    description: 'Someone saw a suspicious person near the Thames',
    descriptionKorean: '누군가 템즈강 근처에서 수상한 사람을 봤습니다',
    isRevealed: false,
    turn: 0
  },
  {
    id: 'clue-3',
    type: 'timing',
    description: 'The criminal was spotted 2 turns ago',
    descriptionKorean: '범인이 2턴 전에 목격되었습니다',
    isRevealed: false,
    turn: 0
  }
];

export const keyExpressions = [
  {
    english: 'I think you should go here',
    korean: '여기로 가야 한다고 생각합니다',
    usage: 'Making suggestions'
  },
  {
    english: "I'm taking a ____ to ____",
    korean: '____로 ____에 갑니다',
    usage: 'Stating travel plans'
  },
  {
    english: 'Where do you think I should go?',
    korean: '어디로 가야 한다고 생각하세요?',
    usage: 'Asking for advice'
  },
  {
    english: 'He could be here, ____.',
    korean: '그는 여기 있을 수 있습니다, ____.',
    usage: 'Expressing possibilities'
  }
];

export const difficultySettings = {
  easy: {
    maxTurns: 20,
    startingTickets: { taxi: 10, bus: 8, subway: 4, boat: 3 },
    revealFrequency: 3, // reveal criminal every 3 turns
    deductionTimeLimit: 60 // seconds
  },
  medium: {
    maxTurns: 15,
    startingTickets: { taxi: 8, bus: 6, subway: 3, boat: 2 },
    revealFrequency: 4, // reveal criminal every 4 turns
    deductionTimeLimit: 45 // seconds
  },
  hard: {
    maxTurns: 12,
    startingTickets: { taxi: 6, bus: 4, subway: 2, boat: 1 },
    revealFrequency: 5, // reveal criminal every 5 turns
    deductionTimeLimit: 30 // seconds
  }
}; 