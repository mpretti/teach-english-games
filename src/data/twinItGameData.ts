import type { TwinItCard, TwinItGrammarExercise } from '../types/twinItGame';

export const twinItCards: TwinItCard[] = [
  // Geometric patterns
  { id: 'card-1', pattern: 'circles', color: 'red', shape: 'circle', emoji: '🔴', isMatched: false, isVisible: false },
  { id: 'card-2', pattern: 'circles', color: 'red', shape: 'circle', emoji: '🔴', isMatched: false, isVisible: false },
  { id: 'card-3', pattern: 'squares', color: 'blue', shape: 'square', emoji: '🟦', isMatched: false, isVisible: false },
  { id: 'card-4', pattern: 'squares', color: 'blue', shape: 'square', emoji: '🟦', isMatched: false, isVisible: false },
  { id: 'card-5', pattern: 'triangles', color: 'green', shape: 'triangle', emoji: '🟢', isMatched: false, isVisible: false },
  { id: 'card-6', pattern: 'triangles', color: 'green', shape: 'triangle', emoji: '🟢', isMatched: false, isVisible: false },
  { id: 'card-7', pattern: 'stars', color: 'yellow', shape: 'star', emoji: '⭐', isMatched: false, isVisible: false },
  { id: 'card-8', pattern: 'stars', color: 'yellow', shape: 'star', emoji: '⭐', isMatched: false, isVisible: false },
  { id: 'card-9', pattern: 'hearts', color: 'pink', shape: 'heart', emoji: '💖', isMatched: false, isVisible: false },
  { id: 'card-10', pattern: 'hearts', color: 'pink', shape: 'heart', emoji: '💖', isMatched: false, isVisible: false },
  { id: 'card-11', pattern: 'diamonds', color: 'purple', shape: 'diamond', emoji: '🟣', isMatched: false, isVisible: false },
  { id: 'card-12', pattern: 'diamonds', color: 'purple', shape: 'diamond', emoji: '🟣', isMatched: false, isVisible: false },
  { id: 'card-13', pattern: 'hexagons', color: 'orange', shape: 'hexagon', emoji: '🟠', isMatched: false, isVisible: false },
  { id: 'card-14', pattern: 'hexagons', color: 'orange', shape: 'hexagon', emoji: '🟠', isMatched: false, isVisible: false },
  { id: 'card-15', pattern: 'lightning', color: 'cyan', shape: 'lightning', emoji: '⚡', isMatched: false, isVisible: false },
  { id: 'card-16', pattern: 'lightning', color: 'cyan', shape: 'lightning', emoji: '⚡', isMatched: false, isVisible: false },
  { id: 'card-17', pattern: 'flowers', color: 'magenta', shape: 'flower', emoji: '🌸', isMatched: false, isVisible: false },
  { id: 'card-18', pattern: 'flowers', color: 'magenta', shape: 'flower', emoji: '🌸', isMatched: false, isVisible: false },
  { id: 'card-19', pattern: 'moons', color: 'silver', shape: 'moon', emoji: '🌙', isMatched: false, isVisible: false },
  { id: 'card-20', pattern: 'moons', color: 'silver', shape: 'moon', emoji: '🌙', isMatched: false, isVisible: false }
];

export const grammarExercises: TwinItGrammarExercise[] = [
  {
    id: 'past-1',
    type: 'simple-past',
    question: 'Complete: "I _____ a match!"',
    questionKorean: '빈칸을 채우세요: "나는 짝을 _____!"',
    options: ['find', 'found', 'finding', 'finds'],
    correctAnswer: 1,
    explanation: 'Use simple past tense "found" for completed actions.',
    explanationKorean: '완료된 행동에는 단순과거 "found"를 사용합니다.',
    points: 5,
    context: 'found'
  },
  {
    id: 'accomplishments-1',
    type: 'accomplishments',
    question: 'Express your achievement: "I _____ three matches!"',
    questionKorean: '성취를 표현하세요: "나는 세 개의 짝을 _____!"',
    options: ['have found', 'had found', 'will find', 'am finding'],
    correctAnswer: 0,
    explanation: 'Use present perfect "have found" for accomplishments.',
    explanationKorean: '성취에는 현재완료 "have found"를 사용합니다.',
    points: 5,
    context: 'match'
  },
  {
    id: 'declarative-1',
    type: 'declarative',
    question: 'Make a confident statement: "I now have ___ points"',
    questionKorean: '확신에 찬 진술을 하세요: "나는 이제 ___ 점수를 가지고 있다"',
    options: ['ten', 'tens', 'tenth', 'tenths'],
    correctAnswer: 0,
    explanation: 'Use the number "ten" for counting points.',
    explanationKorean: '점수를 셀 때는 숫자 "ten"을 사용합니다.',
    points: 5,
    context: 'speed'
  },
  {
    id: 'achievements-1',
    type: 'achievements',
    question: 'Express your success: "I _____ the fastest!"',
    questionKorean: '성공을 표현하세요: "나는 가장 빨랐다!"',
    options: ['was', 'were', 'am', 'is'],
    correctAnswer: 0,
    explanation: 'Use "was" for past achievements about yourself.',
    explanationKorean: '자신의 과거 성취에는 "was"를 사용합니다.',
    points: 5,
    context: 'pattern'
  },
  {
    id: 'simple-past-2',
    type: 'simple-past',
    question: 'What happened? "The patterns _____"',
    questionKorean: '무슨 일이 일어났나요? "패턴들이 _____"',
    options: ['match', 'matched', 'matching', 'matches'],
    correctAnswer: 1,
    explanation: 'Use simple past "matched" for what happened.',
    explanationKorean: '일어난 일에는 단순과거 "matched"를 사용합니다.',
    points: 5,
    context: 'found'
  }
];

export const keyExpressions = [
  {
    english: 'I found ____',
    korean: '나는 ____을/를 찾았습니다',
    usage: 'Announcing a discovery'
  },
  {
    english: 'I now have ___ points',
    korean: '나는 이제 ___ 점수를 가지고 있습니다',
    usage: 'Stating current score'
  },
  {
    english: 'I got __ [point(s)]',
    korean: '나는 __ 점을 얻었습니다',
    usage: 'Expressing points earned'
  },
  {
    english: 'I made ___',
    korean: '나는 ___을/를 만들었습니다',
    usage: 'Expressing accomplishments'
  }
];

export const difficultySettings = {
  easy: {
    timeLimit: 120, // 2 minutes
    cardsVisible: 8,
    matchTimeBonus: 10,
    speedThreshold: 3.0 // seconds
  },
  medium: {
    timeLimit: 90, // 1.5 minutes
    cardsVisible: 12,
    matchTimeBonus: 15,
    speedThreshold: 2.0 // seconds
  },
  hard: {
    timeLimit: 60, // 1 minute
    cardsVisible: 16,
    matchTimeBonus: 20,
    speedThreshold: 1.5 // seconds
  }
}; 