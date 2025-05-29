import type { Property, SaleCard, ForSaleGrammarExercise } from '../types/forSaleGame';

export const properties: Property[] = [
  {
    id: 'cardboard-shack',
    name: 'Cardboard Shack',
    nameKorean: '판지 오두막',
    type: 'house',
    emoji: '🏚️',
    minBid: 1,
    quality: 1,
    description: 'A run-down shack made of cardboard',
    descriptionKorean: '판지로 만든 허름한 오두막'
  },
  {
    id: 'old-trailer',
    name: 'Old Trailer',
    nameKorean: '낡은 트레일러',
    type: 'house',
    emoji: '🚐',
    minBid: 2,
    quality: 2,
    description: 'A rusty old mobile home',
    descriptionKorean: '녹슨 낡은 이동식 주택'
  },
  {
    id: 'small-apartment',
    name: 'Small Apartment',
    nameKorean: '작은 아파트',
    type: 'apartment',
    emoji: '🏠',
    minBid: 3,
    quality: 3,
    description: 'A modest one-bedroom apartment',
    descriptionKorean: '소박한 원룸 아파트'
  },
  {
    id: 'suburban-house',
    name: 'Suburban House',
    nameKorean: '교외 주택',
    type: 'house',
    emoji: '🏡',
    minBid: 4,
    quality: 4,
    description: 'A typical family home in the suburbs',
    descriptionKorean: '교외의 전형적인 가족 주택'
  },
  {
    id: 'city-apartment',
    name: 'City Apartment',
    nameKorean: '도시 아파트',
    type: 'apartment',
    emoji: '🏢',
    minBid: 5,
    quality: 5,
    description: 'A modern apartment in the city center',
    descriptionKorean: '도심의 현대적인 아파트'
  },
  {
    id: 'luxury-condo',
    name: 'Luxury Condominium',
    nameKorean: '고급 콘도미니엄',
    type: 'condominium',
    emoji: '🏨',
    minBid: 6,
    quality: 6,
    description: 'An upscale condominium with amenities',
    descriptionKorean: '편의시설이 있는 고급 콘도미니엄'
  },
  {
    id: 'office-building',
    name: 'Office Building',
    nameKorean: '사무용 빌딩',
    type: 'office',
    emoji: '🏢',
    minBid: 7,
    quality: 7,
    description: 'A commercial office building',
    descriptionKorean: '상업용 사무용 빌딩'
  },
  {
    id: 'luxury-house',
    name: 'Luxury House',
    nameKorean: '고급 주택',
    type: 'house',
    emoji: '🏘️',
    minBid: 8,
    quality: 8,
    description: 'A beautiful luxury home with a garden',
    descriptionKorean: '정원이 있는 아름다운 고급 주택'
  },
  {
    id: 'office-tower',
    name: 'Office Tower',
    nameKorean: '오피스 타워',
    type: 'office',
    emoji: '🏬',
    minBid: 9,
    quality: 9,
    description: 'A tall office tower in the business district',
    descriptionKorean: '비즈니스 지구의 높은 오피스 타워'
  },
  {
    id: 'mansion-estate',
    name: 'Mansion Estate',
    nameKorean: '대저택',
    type: 'estate',
    emoji: '🏰',
    minBid: 10,
    quality: 10,
    description: 'A magnificent mansion with extensive grounds',
    descriptionKorean: '넓은 부지를 가진 웅장한 대저택'
  }
];

export const saleCards: SaleCard[] = [
  { id: 'card-1', minValue: 0, maxValue: 2, emoji: '💸' },
  { id: 'card-2', minValue: 2, maxValue: 5, emoji: '💵' },
  { id: 'card-3', minValue: 5, maxValue: 8, emoji: '💴' },
  { id: 'card-4', minValue: 8, maxValue: 12, emoji: '💶' },
  { id: 'card-5', minValue: 12, maxValue: 15, emoji: '💷' },
  { id: 'card-6', minValue: 15, maxValue: 20, emoji: '💰' }
];

export const grammarExercises: ForSaleGrammarExercise[] = [
  {
    id: 'future-past-1',
    type: 'future-past',
    question: 'Complete: "I _____ bid 5 thousand dollars on that house."',
    questionKorean: '빈칸을 채우세요: "나는 그 집에 5천 달러를 _____ 것입니다."',
    options: ['will', 'would', 'was', 'am'],
    correctAnswer: 0,
    explanation: 'Use "will" to express future intentions in auctions.',
    explanationKorean: '경매에서 미래 의도를 표현할 때 "will"을 사용합니다.',
    points: 5
  },
  {
    id: 'expressing-results-1',
    type: 'expressing-results',
    question: 'How do you express a successful bid result?',
    questionKorean: '성공적인 입찰 결과를 어떻게 표현하나요?',
    options: ['I got the house for 8 thousand', 'I will get the house', 'I want the house', 'I need the house'],
    correctAnswer: 0,
    explanation: 'Use "got" + "for" + amount to express successful purchase results.',
    explanationKorean: '"got" + "for" + 금액을 사용해서 성공적인 구매 결과를 표현합니다.',
    points: 5
  },
  {
    id: 'possessive-pronouns-1',
    type: 'possessive-pronouns',
    question: 'Complete: "I sold _____ apartment for a good profit."',
    questionKorean: '빈칸을 채우세요: "나는 _____ 아파트를 좋은 이익으로 팔았습니다."',
    options: ['my', 'mine', 'me', 'I'],
    correctAnswer: 0,
    explanation: 'Use "my" before a noun to show possession.',
    explanationKorean: '소유를 나타낼 때 명사 앞에 "my"를 사용합니다.',
    points: 5
  },
  {
    id: 'immediate-plans-1',
    type: 'immediate-plans',
    question: 'Express your immediate bidding plan:',
    questionKorean: '즉각적인 입찰 계획을 표현하세요:',
    options: ['I will take bid 6 thousand dollars', 'I am going to bid 6 thousand dollars', 'I bid 6 thousand dollars yesterday', 'I might bid someday'],
    correctAnswer: 1,
    explanation: 'Use "going to" for immediate plans and intentions.',
    explanationKorean: '즉각적인 계획과 의도에는 "going to"를 사용합니다.',
    points: 5
  },
  {
    id: 'expressing-desires-1',
    type: 'expressing-desires',
    question: 'How do you express wanting a specific property?',
    questionKorean: '특정 부동산을 원한다는 것을 어떻게 표현하나요?',
    options: ['I need that office tower', 'I want that office tower', 'I will that office tower', 'I got that office tower'],
    correctAnswer: 1,
    explanation: 'Use "want" to express desires for specific properties.',
    explanationKorean: '특정 부동산에 대한 욕구를 표현할 때 "want"를 사용합니다.',
    points: 5
  }
];

export const keyExpressions = [
  {
    english: 'I will take bid ___ thousand dollars.',
    korean: '나는 ___천 달러를 입찰하겠습니다.',
    usage: 'Making a bid in an auction'
  },
  {
    english: 'I got the ___ for ___(s).',
    korean: '나는 ___을/를 ___(s)에 얻었습니다.',
    usage: 'Expressing successful purchase'
  },
  {
    english: 'I sold my ___ for ___.',
    korean: '나는 내 ___을/를 ___에 팔았습니다.',
    usage: 'Expressing a sale'
  },
  {
    english: 'I made ___ .',
    korean: '나는 ___을/를 벌었습니다.',
    usage: 'Expressing profit or loss'
  }
]; 