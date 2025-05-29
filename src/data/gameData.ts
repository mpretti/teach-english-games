import type { Vegetable, SaladRecipe, GrammarExercise } from '../types/game';

export const vegetables: Vegetable[] = [
  {
    id: 'carrots',
    name: 'carrots',
    nameKorean: '당근',
    price: 2,
    points: 3,
    emoji: '🥕',
    category: 'root',
    countable: true
  },
  {
    id: 'onions',
    name: 'onions',
    nameKorean: '양파',
    price: 1,
    points: 2,
    emoji: '🧅',
    category: 'root',
    countable: true
  },
  {
    id: 'lettuce',
    name: 'lettuce',
    nameKorean: '상추',
    price: 3,
    points: 4,
    emoji: '🥬',
    category: 'leafy',
    countable: false
  },
  {
    id: 'cabbage',
    name: 'cabbage',
    nameKorean: '양배추',
    price: 2,
    points: 3,
    emoji: '🥬',
    category: 'leafy',
    countable: false
  },
  {
    id: 'tomatoes',
    name: 'tomatoes',
    nameKorean: '토마토',
    price: 3,
    points: 4,
    emoji: '🍅',
    category: 'fruit',
    countable: true
  },
  {
    id: 'bell-peppers',
    name: 'bell peppers',
    nameKorean: '피망',
    price: 4,
    points: 5,
    emoji: '🫑',
    category: 'fruit',
    countable: true
  },
  {
    id: 'cucumber',
    name: 'cucumber',
    nameKorean: '오이',
    price: 2,
    points: 3,
    emoji: '🥒',
    category: 'fruit',
    countable: true
  },
  {
    id: 'broccoli',
    name: 'broccoli',
    nameKorean: '브로콜리',
    price: 3,
    points: 4,
    emoji: '🥦',
    category: 'other',
    countable: false
  }
];

export const saladRecipes: SaladRecipe[] = [
  {
    id: 'garden-salad',
    name: 'Garden Salad',
    nameKorean: '가든 샐러드',
    requiredVegetables: ['lettuce', 'tomatoes', 'cucumber'],
    bonusPoints: 5,
    description: 'A fresh mix of lettuce, tomatoes, and cucumber',
    descriptionKorean: '상추, 토마토, 오이를 섞은 신선한 샐러드'
  },
  {
    id: 'rainbow-salad',
    name: 'Rainbow Salad',
    nameKorean: '무지개 샐러드',
    requiredVegetables: ['carrots', 'bell-peppers', 'cabbage', 'tomatoes'],
    bonusPoints: 8,
    description: 'A colorful salad with carrots, bell peppers, cabbage, and tomatoes',
    descriptionKorean: '당근, 피망, 양배추, 토마토로 만든 다채로운 샐러드'
  },
  {
    id: 'healthy-mix',
    name: 'Healthy Mix',
    nameKorean: '건강 믹스',
    requiredVegetables: ['broccoli', 'carrots', 'onions'],
    bonusPoints: 6,
    description: 'A nutritious combination of broccoli, carrots, and onions',
    descriptionKorean: '브로콜리, 당근, 양파의 영양가 있는 조합'
  }
];

export const grammarExercises: GrammarExercise[] = [
  {
    id: 'singular-plural-1',
    type: 'singular-plural',
    question: 'What is the plural form of "tomato"?',
    questionKorean: '"tomato"의 복수형은 무엇인가요?',
    options: ['tomatos', 'tomatoes', 'tomatoe', 'tomato'],
    correctAnswer: 1,
    explanation: 'Words ending in -o usually add -es to form the plural.',
    explanationKorean: '-o로 끝나는 단어는 보통 -es를 붙여서 복수형을 만듭니다.'
  },
  {
    id: 'countable-1',
    type: 'countable-uncountable',
    question: 'Which of these is uncountable?',
    questionKorean: '다음 중 셀 수 없는 명사는?',
    options: ['carrots', 'lettuce', 'onions', 'tomatoes'],
    correctAnswer: 1,
    explanation: 'Lettuce is uncountable. We say "some lettuce" not "a lettuce".',
    explanationKorean: 'Lettuce는 셀 수 없는 명사입니다. "a lettuce"가 아니라 "some lettuce"라고 합니다.'
  },
  {
    id: 'future-tense-1',
    type: 'future-tense',
    question: 'Complete: "I _____ buy some vegetables tomorrow."',
    questionKorean: '빈칸을 채우세요: "I _____ buy some vegetables tomorrow."',
    options: ['am', 'will', 'was', 'have'],
    correctAnswer: 1,
    explanation: 'Use "will" to express future plans and intentions.',
    explanationKorean: '미래의 계획과 의도를 표현할 때 "will"을 사용합니다.'
  },
  {
    id: 'articles-1',
    type: 'articles',
    question: 'Complete: "I need _____ onion for the salad."',
    questionKorean: '빈칸을 채우세요: "I need _____ onion for the salad."',
    options: ['a', 'an', 'the', 'some'],
    correctAnswer: 1,
    explanation: 'Use "an" before words that start with a vowel sound.',
    explanationKorean: '모음 소리로 시작하는 단어 앞에는 "an"을 사용합니다.'
  },
  {
    id: 'expressions-1',
    type: 'expressions',
    question: 'How do you express wanting multiple items?',
    questionKorean: '여러 개의 물건을 원한다고 어떻게 표현하나요?',
    options: ['I will take a carrots', 'I will take two carrot', 'I will take two carrots', 'I will take carrots two'],
    correctAnswer: 2,
    explanation: 'Use number + plural noun: "two carrots".',
    explanationKorean: '숫자 + 복수 명사를 사용합니다: "two carrots".'
  }
]; 