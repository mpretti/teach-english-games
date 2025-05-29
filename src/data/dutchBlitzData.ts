import type { DutchBlitzCard, DutchBlitzGrammarExercise } from '../types/dutchBlitzGame';

export const DUTCH_BLITZ_CARDS: DutchBlitzCard[] = [
  // Red cards
  { id: 'red-1', color: 'red', number: 1, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-2', color: 'red', number: 2, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-3', color: 'red', number: 3, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-4', color: 'red', number: 4, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-5', color: 'red', number: 5, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-6', color: 'red', number: 6, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-7', color: 'red', number: 7, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-8', color: 'red', number: 8, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-9', color: 'red', number: 9, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  { id: 'red-10', color: 'red', number: 10, emoji: '🔴', isPlayable: false, pile: null, position: 0 },
  
  // Yellow cards
  { id: 'yellow-1', color: 'yellow', number: 1, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-2', color: 'yellow', number: 2, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-3', color: 'yellow', number: 3, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-4', color: 'yellow', number: 4, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-5', color: 'yellow', number: 5, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-6', color: 'yellow', number: 6, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-7', color: 'yellow', number: 7, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-8', color: 'yellow', number: 8, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-9', color: 'yellow', number: 9, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  { id: 'yellow-10', color: 'yellow', number: 10, emoji: '🟡', isPlayable: false, pile: null, position: 0 },
  
  // Blue cards
  { id: 'blue-1', color: 'blue', number: 1, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-2', color: 'blue', number: 2, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-3', color: 'blue', number: 3, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-4', color: 'blue', number: 4, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-5', color: 'blue', number: 5, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-6', color: 'blue', number: 6, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-7', color: 'blue', number: 7, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-8', color: 'blue', number: 8, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-9', color: 'blue', number: 9, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  { id: 'blue-10', color: 'blue', number: 10, emoji: '🔵', isPlayable: false, pile: null, position: 0 },
  
  // Green cards
  { id: 'green-1', color: 'green', number: 1, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-2', color: 'green', number: 2, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-3', color: 'green', number: 3, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-4', color: 'green', number: 4, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-5', color: 'green', number: 5, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-6', color: 'green', number: 6, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-7', color: 'green', number: 7, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-8', color: 'green', number: 8, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-9', color: 'green', number: 9, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
  { id: 'green-10', color: 'green', number: 10, emoji: '🟢', isPlayable: false, pile: null, position: 0 },
];

export const DUTCH_BLITZ_COMMANDS = [
  "I'm playing the red one!",
  "I'm putting the blue two on the red one!",
  "Put the yellow card here!",
  "Play the green number!",
  "I'm playing this card!",
  "Put it on the center pile!",
  "I'm putting the number five!",
  "Play the red card on blue!",
  "I'm playing the yellow ten!",
  "Put the green card on yellow!",
  "I'm putting this on that!",
  "Play the blue card here!",
  "I'm playing the number seven!",
  "Put the red card on green!",
  "I'm putting the yellow card!",
];

export const DUTCH_BLITZ_GRAMMAR_EXERCISES: DutchBlitzGrammarExercise[] = [
  {
    id: 'db-grammar-1',
    type: 'imperative',
    question: "Which command correctly tells someone to play a card quickly?",
    questionKorean: "카드를 빠르게 플레이하라고 말하는 올바른 명령은?",
    options: [
      "You should play the card",
      "Play the red card now!",
      "I am playing the card",
      "The card is being played"
    ],
    correctAnswer: 1,
    explanation: "Imperative commands use the base form of the verb without 'you'.",
    explanationKorean: "명령문은 'you' 없이 동사의 기본형을 사용합니다.",
    points: 10,
    context: 'commands'
  },
  {
    id: 'db-grammar-2',
    type: 'declarative',
    question: "How do you announce what you're doing in Dutch Blitz?",
    questionKorean: "Dutch Blitz에서 자신이 하는 일을 어떻게 발표하나요?",
    options: [
      "Play the card!",
      "I'm playing the blue five",
      "You play the card",
      "The card plays"
    ],
    correctAnswer: 1,
    explanation: "Use 'I'm + verb + ing' to announce your current action.",
    explanationKorean: "'I'm + 동사 + ing'를 사용하여 현재 행동을 발표합니다.",
    points: 10,
    context: 'fluency'
  },
  {
    id: 'db-grammar-3',
    type: 'numbers',
    question: "Which number comes after seven in the sequence?",
    questionKorean: "순서에서 7 다음에 오는 숫자는?",
    options: ["six", "eight", "nine", "ten"],
    correctAnswer: 1,
    explanation: "The sequence is: seven, eight, nine, ten.",
    explanationKorean: "순서는: seven, eight, nine, ten입니다.",
    points: 5,
    context: 'speed'
  },
  {
    id: 'db-grammar-4',
    type: 'colors',
    question: "Complete: 'I'm putting the ___ card on the blue pile'",
    questionKorean: "'I'm putting the ___ card on the blue pile'를 완성하세요",
    options: ["color", "red", "number", "pile"],
    correctAnswer: 1,
    explanation: "Colors are adjectives that describe the card.",
    explanationKorean: "색깔은 카드를 설명하는 형용사입니다.",
    points: 10,
    context: 'fluency'
  },
  {
    id: 'db-grammar-5',
    type: 'imperative',
    question: "Which is the correct urgent command?",
    questionKorean: "올바른 긴급 명령은?",
    options: [
      "You must put the card",
      "Put it on the center pile!",
      "I will put the card",
      "The card goes there"
    ],
    correctAnswer: 1,
    explanation: "Urgent commands use imperative form with exclamation marks.",
    explanationKorean: "긴급 명령은 느낌표와 함께 명령형을 사용합니다.",
    points: 10,
    context: 'commands'
  },
  {
    id: 'db-grammar-6',
    type: 'declarative',
    question: "How do you describe placing a card on another?",
    questionKorean: "카드를 다른 카드 위에 놓는 것을 어떻게 설명하나요?",
    options: [
      "I'm putting the red on the yellow",
      "Put red on yellow",
      "Red goes yellow",
      "Red and yellow"
    ],
    correctAnswer: 0,
    explanation: "Use 'putting [card] on [other card]' to describe placement.",
    explanationKorean: "'putting [카드] on [다른 카드]'를 사용하여 배치를 설명합니다.",
    points: 15,
    context: 'coordination'
  }
];

export const DIFFICULTY_SETTINGS = {
  easy: {
    timeLimit: 120, // 2 minutes
    cardsPerPlayer: 20,
    speedMultiplier: 1.0,
    grammarFrequency: 0.3
  },
  medium: {
    timeLimit: 90, // 1.5 minutes
    cardsPerPlayer: 30,
    speedMultiplier: 1.2,
    grammarFrequency: 0.5
  },
  hard: {
    timeLimit: 60, // 1 minute
    cardsPerPlayer: 40,
    speedMultiplier: 1.5,
    grammarFrequency: 0.7
  }
}; 