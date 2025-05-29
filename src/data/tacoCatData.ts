import type { TacoCatCard, TacoCatGrammarExercise } from '../types/tacoCatGame';

export const TACO_CAT_CARDS: TacoCatCard[] = [
  // Taco cards
  { id: 'taco-1', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-2', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-3', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-4', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-5', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-6', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-7', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },
  { id: 'taco-8', word: 'taco', wordKorean: '타코', image: '🌮', emoji: '🌮', isSpecial: false },

  // Cat cards
  { id: 'cat-1', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-2', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-3', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-4', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-5', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-6', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-7', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },
  { id: 'cat-8', word: 'cat', wordKorean: '고양이', image: '🐱', emoji: '🐱', isSpecial: false },

  // Goat cards
  { id: 'goat-1', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-2', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-3', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-4', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-5', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-6', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-7', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },
  { id: 'goat-8', word: 'goat', wordKorean: '염소', image: '🐐', emoji: '🐐', isSpecial: false },

  // Cheese cards
  { id: 'cheese-1', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-2', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-3', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-4', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-5', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-6', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-7', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },
  { id: 'cheese-8', word: 'cheese', wordKorean: '치즈', image: '🧀', emoji: '🧀', isSpecial: false },

  // Pizza cards
  { id: 'pizza-1', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-2', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-3', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-4', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-5', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-6', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-7', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },
  { id: 'pizza-8', word: 'pizza', wordKorean: '피자', image: '🍕', emoji: '🍕', isSpecial: false },

  // Special action cards
  { id: 'gorilla-1', word: 'gorilla', wordKorean: '고릴라', image: '🦍', emoji: '🦍', isSpecial: true },
  { id: 'gorilla-2', word: 'gorilla', wordKorean: '고릴라', image: '🦍', emoji: '🦍', isSpecial: true },
  { id: 'groundhog-1', word: 'groundhog', wordKorean: '그라운드호그', image: '🐹', emoji: '🐹', isSpecial: true },
  { id: 'groundhog-2', word: 'groundhog', wordKorean: '그라운드호그', image: '🐹', emoji: '🐹', isSpecial: true },
  { id: 'narwhal-1', word: 'narwhal', wordKorean: '일각고래', image: '🐋', emoji: '🐋', isSpecial: true },
  { id: 'narwhal-2', word: 'narwhal', wordKorean: '일각고래', image: '🐋', emoji: '🐋', isSpecial: true },
];

export const WORD_SEQUENCE = ['taco', 'cat', 'goat', 'cheese', 'pizza'];

export const TACO_CAT_GRAMMAR_EXERCISES: TacoCatGrammarExercise[] = [
  {
    id: 'tc-grammar-1',
    type: 'vocabulary',
    question: "What comes after 'cat' in the sequence?",
    questionKorean: "순서에서 'cat' 다음에 오는 것은?",
    options: ['taco', 'goat', 'cheese', 'pizza'],
    correctAnswer: 1,
    explanation: "The sequence is: taco, cat, goat, cheese, pizza.",
    explanationKorean: "순서는: taco, cat, goat, cheese, pizza입니다.",
    points: 10,
    context: 'memory'
  },
  {
    id: 'tc-grammar-2',
    type: 'listening',
    question: "Which word sounds like it rhymes with 'cat'?",
    questionKorean: "'cat'과 운율이 맞는 단어는?",
    options: ['goat', 'cheese', 'pizza', 'hat'],
    correctAnswer: 3,
    explanation: "'Cat' and 'hat' both end with the '-at' sound.",
    explanationKorean: "'Cat'과 'hat' 모두 '-at' 소리로 끝납니다.",
    points: 15,
    context: 'recognition'
  },
  {
    id: 'tc-grammar-3',
    type: 'matching',
    question: "When you see a 🌮, what word should you say?",
    questionKorean: "🌮를 보면 어떤 단어를 말해야 하나요?",
    options: ['taco', 'cat', 'goat', 'cheese'],
    correctAnswer: 0,
    explanation: "🌮 represents a taco.",
    explanationKorean: "🌮는 타코를 나타냅니다.",
    points: 5,
    context: 'speed'
  },
  {
    id: 'tc-grammar-4',
    type: 'vocabulary',
    question: "Complete the past tense: 'I ___ the match correctly.'",
    questionKorean: "과거형을 완성하세요: 'I ___ the match correctly.'",
    options: ['have', 'had', 'has', 'having'],
    correctAnswer: 1,
    explanation: "Use 'had' for simple past tense with accomplishments.",
    explanationKorean: "성취를 나타내는 단순 과거형에는 'had'를 사용합니다.",
    points: 20,
    context: 'memory'
  },
  {
    id: 'tc-grammar-5',
    type: 'pronunciation',
    question: "How do you express that you completed something successfully?",
    questionKorean: "무언가를 성공적으로 완료했다고 어떻게 표현하나요?",
    options: [
      "I'm doing it",
      "You flinched",
      "I will do it",
      "I might do it"
    ],
    correctAnswer: 1,
    explanation: "'You flinched' means the other person made a mistake.",
    explanationKorean: "'You flinched'는 상대방이 실수했다는 뜻입니다.",
    points: 15,
    context: 'recognition'
  },
  {
    id: 'tc-grammar-6',
    type: 'matching',
    question: "What's the correct response when someone plays the wrong card?",
    questionKorean: "누군가 잘못된 카드를 냈을 때 올바른 반응은?",
    options: [
      "Good job!",
      "You flinched!",
      "Keep going",
      "Try again"
    ],
    correctAnswer: 1,
    explanation: "In Taco Cat, 'You flinched!' is said when someone makes a mistake.",
    explanationKorean: "Taco Cat에서 누군가 실수하면 'You flinched!'라고 말합니다.",
    points: 10,
    context: 'speed'
  }
];

export const DIFFICULTY_SETTINGS = {
  easy: {
    sequenceLength: 3, // taco, cat, goat
    specialCardFrequency: 0.1,
    reactionTimeLimit: 3000, // 3 seconds
    grammarFrequency: 0.2
  },
  medium: {
    sequenceLength: 4, // taco, cat, goat, cheese
    specialCardFrequency: 0.15,
    reactionTimeLimit: 2000, // 2 seconds
    grammarFrequency: 0.3
  },
  hard: {
    sequenceLength: 5, // full sequence
    specialCardFrequency: 0.2,
    reactionTimeLimit: 1500, // 1.5 seconds
    grammarFrequency: 0.4
  }
}; 