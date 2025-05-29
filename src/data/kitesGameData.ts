import type { SandTimer, Kite, WindCondition, KitesGrammarExercise, CooperationEvent } from '../types/kitesGame';

export const sandTimers: SandTimer[] = [
  {
    id: 'timer-red',
    color: 'red',
    colorKorean: '빨간색',
    duration: 30,
    remainingTime: 30,
    isActive: false,
    isFlipped: false,
    emoji: '⏳'
  },
  {
    id: 'timer-blue',
    color: 'blue',
    colorKorean: '파란색',
    duration: 45,
    remainingTime: 45,
    isActive: false,
    isFlipped: false,
    emoji: '⏳'
  },
  {
    id: 'timer-purple',
    color: 'purple',
    colorKorean: '보라색',
    duration: 60,
    remainingTime: 60,
    isActive: false,
    isFlipped: false,
    emoji: '⏳'
  },
  {
    id: 'timer-yellow',
    color: 'yellow',
    colorKorean: '노란색',
    duration: 20,
    remainingTime: 20,
    isActive: false,
    isFlipped: false,
    emoji: '⏳'
  },
  {
    id: 'timer-orange',
    color: 'orange',
    colorKorean: '주황색',
    duration: 40,
    remainingTime: 40,
    isActive: false,
    isFlipped: false,
    emoji: '⏳'
  },
  {
    id: 'timer-white',
    color: 'white',
    colorKorean: '흰색',
    duration: 90,
    remainingTime: 90,
    isActive: false,
    isFlipped: false,
    emoji: '⏳'
  }
];

export const kites: Kite[] = [
  {
    id: 'kite-dragon',
    name: 'Dragon Kite',
    nameKorean: '용 연',
    emoji: '🐉',
    color: 'red',
    requiredTimers: ['red', 'yellow'],
    isFlying: false,
    altitude: 0,
    windResistance: 8,
    description: 'A powerful dragon kite that flies high and strong',
    descriptionKorean: '높고 강하게 나는 강력한 용 연'
  },
  {
    id: 'kite-butterfly',
    name: 'Butterfly Kite',
    nameKorean: '나비 연',
    emoji: '🦋',
    color: 'purple',
    requiredTimers: ['purple', 'blue'],
    isFlying: false,
    altitude: 0,
    windResistance: 6,
    description: 'A graceful butterfly kite that dances in the wind',
    descriptionKorean: '바람에 춤추는 우아한 나비 연'
  },
  {
    id: 'kite-eagle',
    name: 'Eagle Kite',
    nameKorean: '독수리 연',
    emoji: '🦅',
    color: 'blue',
    requiredTimers: ['blue', 'white'],
    isFlying: false,
    altitude: 0,
    windResistance: 9,
    description: 'A majestic eagle kite that soars through the sky',
    descriptionKorean: '하늘을 날아다니는 장엄한 독수리 연'
  },
  {
    id: 'kite-rainbow',
    name: 'Rainbow Kite',
    nameKorean: '무지개 연',
    emoji: '🌈',
    color: 'orange',
    requiredTimers: ['orange', 'yellow', 'red'],
    isFlying: false,
    altitude: 0,
    windResistance: 5,
    description: 'A colorful rainbow kite that brings joy to the sky',
    descriptionKorean: '하늘에 기쁨을 가져다주는 다채로운 무지개 연'
  },
  {
    id: 'kite-star',
    name: 'Star Kite',
    nameKorean: '별 연',
    emoji: '⭐',
    color: 'yellow',
    requiredTimers: ['yellow', 'white'],
    isFlying: false,
    altitude: 0,
    windResistance: 7,
    description: 'A shining star kite that lights up the sky',
    descriptionKorean: '하늘을 밝히는 빛나는 별 연'
  }
];

export const windConditions: WindCondition[] = [
  {
    id: 'gentle-breeze',
    name: 'Gentle Breeze',
    nameKorean: '부드러운 바람',
    emoji: '🍃',
    strength: 1,
    effect: 'Perfect flying conditions',
    effectKorean: '완벽한 연날리기 조건',
    duration: 60,
    remainingTime: 60,
    isActive: false
  },
  {
    id: 'strong-wind',
    name: 'Strong Wind',
    nameKorean: '강한 바람',
    emoji: '💨',
    strength: 3,
    effect: 'Kites need more timers to stay up',
    effectKorean: '연이 떠있으려면 더 많은 타이머가 필요함',
    duration: 45,
    remainingTime: 45,
    isActive: false
  },
  {
    id: 'gusty-wind',
    name: 'Gusty Wind',
    nameKorean: '돌풍',
    emoji: '🌪️',
    strength: 4,
    effect: 'Timers run out faster',
    effectKorean: '타이머가 더 빨리 떨어짐',
    duration: 30,
    remainingTime: 30,
    isActive: false
  },
  {
    id: 'calm-air',
    name: 'Calm Air',
    nameKorean: '잔잔한 공기',
    emoji: '😌',
    strength: 2,
    effect: 'Kites fly slower but more stable',
    effectKorean: '연이 더 느리지만 안정적으로 날아감',
    duration: 90,
    remainingTime: 90,
    isActive: false
  },
  {
    id: 'storm-approaching',
    name: 'Storm Approaching',
    nameKorean: '폭풍 접근',
    emoji: '⛈️',
    strength: 5,
    effect: 'Emergency! All kites at risk!',
    effectKorean: '비상! 모든 연이 위험!',
    duration: 20,
    remainingTime: 20,
    isActive: false
  }
];

export const grammarExercises: KitesGrammarExercise[] = [
  {
    id: 'imperative-1',
    type: 'imperative',
    question: 'Give an urgent command to flip the timer:',
    questionKorean: '타이머를 뒤집으라는 긴급 명령을 하세요:',
    options: ['Please flip the timer', 'Flip the timer!', 'You should flip the timer', 'Can you flip the timer?'],
    correctAnswer: 1,
    explanation: 'Use imperative form for urgent commands without "please" for emphasis.',
    explanationKorean: '긴급한 명령에는 강조를 위해 "please" 없이 명령형을 사용합니다.',
    points: 5,
    context: 'urgency'
  },
  {
    id: 'possessive-pronouns-1',
    type: 'possessive-pronouns',
    question: 'Complete: "Who has _____ red timer?"',
    questionKorean: '빈칸을 채우세요: "누가 _____ 빨간 타이머를 가지고 있나요?"',
    options: ['the', 'a', 'an', 'some'],
    correctAnswer: 0,
    explanation: 'Use "the" when referring to a specific timer that everyone knows about.',
    explanationKorean: '모든 사람이 알고 있는 특정 타이머를 언급할 때 "the"를 사용합니다.',
    points: 5,
    context: 'timer'
  },
  {
    id: 'questions-1',
    type: 'questions',
    question: 'Ask if someone has a specific colored timer:',
    questionKorean: '누군가가 특정 색깔의 타이머를 가지고 있는지 물어보세요:',
    options: ['Who has blue timer?', 'Does anyone have blue timer?', 'Anyone have blue timer?', 'Blue timer who has?'],
    correctAnswer: 1,
    explanation: 'Use "Does anyone have..." for asking about possession in a group.',
    explanationKorean: '그룹에서 소유에 대해 물어볼 때 "Does anyone have..."를 사용합니다.',
    points: 5,
    context: 'cooperation'
  },
  {
    id: 'immediate-plans-1',
    type: 'immediate-plans',
    question: 'Express your immediate plan to help:',
    questionKorean: '도움을 주려는 즉각적인 계획을 표현하세요:',
    options: ['I will help you', 'I am going to help you', 'I help you', 'I helped you'],
    correctAnswer: 1,
    explanation: 'Use "going to" for immediate plans and intentions.',
    explanationKorean: '즉각적인 계획과 의도에는 "going to"를 사용합니다.',
    points: 5,
    context: 'cooperation'
  },
  {
    id: 'expressing-desires-1',
    type: 'expressing-desires',
    question: 'Express urgent need for help:',
    questionKorean: '긴급한 도움의 필요성을 표현하세요:',
    options: ['I want help', 'I need help!', 'I like help', 'I have help'],
    correctAnswer: 1,
    explanation: 'Use "need" for urgent requirements, with exclamation for emphasis.',
    explanationKorean: '긴급한 요구사항에는 "need"를 사용하고, 강조를 위해 느낌표를 붙입니다.',
    points: 5,
    context: 'urgency'
  }
];

export const cooperationEvents: CooperationEvent[] = [
  {
    id: 'timer-emergency',
    type: 'emergency-flip',
    description: 'Multiple timers are about to run out! Work together!',
    descriptionKorean: '여러 타이머가 곧 떨어집니다! 함께 일하세요!',
    playersInvolved: [],
    successBonus: 15,
    timeWindow: 10,
    isCompleted: false
  },
  {
    id: 'kite-rescue',
    type: 'kite-rescue',
    description: 'A kite is falling! Share timers to save it!',
    descriptionKorean: '연이 떨어지고 있습니다! 타이머를 공유해서 구하세요!',
    playersInvolved: [],
    successBonus: 20,
    timeWindow: 15,
    isCompleted: false
  },
  {
    id: 'wind-coordination',
    type: 'wind-coordination',
    description: 'Strong winds coming! Coordinate timer usage!',
    descriptionKorean: '강한 바람이 옵니다! 타이머 사용을 조정하세요!',
    playersInvolved: [],
    successBonus: 10,
    timeWindow: 20,
    isCompleted: false
  }
];

export const keyExpressions = [
  {
    english: 'Who has ____?',
    korean: '누가 ____을/를 가지고 있나요?',
    usage: 'Asking about timer possession'
  },
  {
    english: "I don't have ____",
    korean: '나는 ____이/가 없습니다',
    usage: 'Stating what you lack'
  },
  {
    english: 'Does anyone have ____?',
    korean: '누구든지 ____을/를 가지고 있나요?',
    usage: 'Asking the group for help'
  },
  {
    english: 'We need ____',
    korean: '우리는 ____이/가 필요합니다',
    usage: 'Expressing group needs'
  },
  {
    english: 'Hurry!',
    korean: '서둘러요!',
    usage: 'Urgent situations'
  }
];

export const difficultySettings = {
  easy: {
    timeLimit: 300, // 5 minutes
    windEventFrequency: 60, // every 60 seconds
    timerSpeedMultiplier: 1.0,
    cooperationEventsEnabled: false
  },
  medium: {
    timeLimit: 240, // 4 minutes
    windEventFrequency: 45, // every 45 seconds
    timerSpeedMultiplier: 1.2,
    cooperationEventsEnabled: true
  },
  hard: {
    timeLimit: 180, // 3 minutes
    windEventFrequency: 30, // every 30 seconds
    timerSpeedMultiplier: 1.5,
    cooperationEventsEnabled: true
  }
}; 