import type { TacoCatGameState, TacoCatPlayer, TacoCatCard } from '../types/tacoCatGame';
import { TACO_CAT_CARDS, WORD_SEQUENCE, DIFFICULTY_SETTINGS } from '../data/tacoCatData';

export function initializeTacoCatGame(difficulty: 'easy' | 'medium' | 'hard'): TacoCatGameState {
  const shuffledCards = shuffleArray([...TACO_CAT_CARDS]);
  
  const player: TacoCatPlayer = {
    id: 'player-1',
    name: 'Player',
    hand: shuffledCards.slice(0, 15),
    cardsWon: [],
    reactionTime: [],
    correctMatches: 0,
    incorrectMatches: 0
  };

  const firstWord = WORD_SEQUENCE[0];
  if (!firstWord) {
    throw new Error('Word sequence is empty');
  }

  return {
    phase: 'setup',
    players: [player],
    currentPlayer: 0,
    centerPile: [],
    currentWord: firstWord,
    isGameActive: false,
    round: 1,
    maxRounds: 5,
    score: {
      cardsWon: 0,
      reactionBonus: 0,
      grammarBonus: 0,
      total: 0
    },
    difficulty,
    lastAction: '',
    gameStartTime: Date.now()
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    const swapItem = shuffled[j];
    if (temp !== undefined && swapItem !== undefined) {
      shuffled[i] = swapItem;
      shuffled[j] = temp;
    }
  }
  return shuffled;
}

export function playCard(
  gameState: TacoCatGameState,
  cardId: string,
  reactionTime: number
): { newState: TacoCatGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  const card = player.hand.find(c => c.id === cardId);
  
  if (!card) {
    return {
      newState: gameState,
      success: false,
      message: 'Card not found in hand!'
    };
  }

  const settings = DIFFICULTY_SETTINGS[gameState.difficulty];
  const expectedWord = getExpectedWord(gameState.centerPile, settings.sequenceLength);
  const isCorrect = card.word === expectedWord;
  
  // Handle special cards
  if (card.isSpecial) {
    return handleSpecialCard(gameState, card, reactionTime);
  }

  const newCenterPile = [...gameState.centerPile, card];
  const newHand = player.hand.filter(c => c.id !== cardId);
  
  let message = '';
  let cardsWon = 0;
  let reactionBonus = 0;

  if (isCorrect) {
    message = `Correct! You played ${card.word} at the right time!`;
    cardsWon = newCenterPile.length;
    
    // Reaction time bonus
    if (reactionTime < settings.reactionTimeLimit) {
      reactionBonus = Math.max(0, Math.floor((settings.reactionTimeLimit - reactionTime) / 100));
    }
  } else {
    message = `You flinched! Expected "${expectedWord}" but played "${card.word}"`;
  }

  const newPlayer: TacoCatPlayer = {
    id: player.id,
    name: player.name,
    hand: newHand,
    cardsWon: isCorrect ? [...player.cardsWon, ...newCenterPile] : player.cardsWon,
    reactionTime: [...player.reactionTime, reactionTime],
    correctMatches: player.correctMatches + (isCorrect ? 1 : 0),
    incorrectMatches: player.incorrectMatches + (isCorrect ? 0 : 1)
  };

  const newScore = {
    cardsWon: gameState.score.cardsWon + cardsWon,
    reactionBonus: gameState.score.reactionBonus + reactionBonus,
    grammarBonus: gameState.score.grammarBonus,
    total: gameState.score.total + cardsWon + reactionBonus
  };

  const newState: TacoCatGameState = {
    ...gameState,
    players: [newPlayer],
    centerPile: isCorrect ? [] : newCenterPile,
    currentWord: getNextWord(gameState.currentWord, settings.sequenceLength),
    score: newScore,
    lastAction: message,
    phase: newHand.length === 0 ? 'results' : gameState.phase
  };

  return {
    newState,
    success: isCorrect,
    message
  };
}

function handleSpecialCard(
  gameState: TacoCatGameState,
  card: TacoCatCard,
  reactionTime: number
): { newState: TacoCatGameState; success: boolean; message: string } {
  const player = gameState.players[0];
  if (!player) {
    return {
      newState: gameState,
      success: false,
      message: 'No player found!'
    };
  }

  const newHand = player.hand.filter(c => c.id !== card.id);
  
  let message = '';
  let success = false;

  switch (card.word) {
    case 'gorilla':
      message = 'Gorilla! Beat your chest!';
      success = true;
      break;
    case 'groundhog':
      message = 'Groundhog! Knock on the table!';
      success = true;
      break;
    case 'narwhal':
      message = 'Narwhal! Point to the sky!';
      success = true;
      break;
    default:
      message = 'Special card played!';
      success = true;
  }

  const newPlayer: TacoCatPlayer = {
    id: player.id,
    name: player.name,
    hand: newHand,
    cardsWon: [...player.cardsWon, card],
    reactionTime: [...player.reactionTime, reactionTime],
    correctMatches: player.correctMatches + 1,
    incorrectMatches: player.incorrectMatches
  };

  const newScore = {
    ...gameState.score,
    cardsWon: gameState.score.cardsWon + 1,
    reactionBonus: gameState.score.reactionBonus + 5, // Bonus for special cards
    total: gameState.score.total + 6
  };

  return {
    newState: {
      ...gameState,
      players: [newPlayer],
      centerPile: [],
      score: newScore,
      lastAction: message,
      phase: newHand.length === 0 ? 'results' : gameState.phase
    },
    success,
    message
  };
}

function getExpectedWord(centerPile: TacoCatCard[], sequenceLength: number): string {
  const sequence = WORD_SEQUENCE.slice(0, sequenceLength);
  const position = centerPile.length % sequence.length;
  const word = sequence[position];
  return word || 'taco'; // fallback to first word
}

function getNextWord(currentWord: string, sequenceLength: number): string {
  const sequence = WORD_SEQUENCE.slice(0, sequenceLength);
  const currentIndex = sequence.indexOf(currentWord);
  const nextIndex = (currentIndex + 1) % sequence.length;
  const nextWord = sequence[nextIndex];
  return nextWord || 'taco'; // fallback to first word
}

export function startGame(gameState: TacoCatGameState): TacoCatGameState {
  return {
    ...gameState,
    phase: 'playing',
    isGameActive: true,
    gameStartTime: Date.now()
  };
}

export function drawCard(gameState: TacoCatGameState): TacoCatGameState {
  const player = gameState.players[0];
  if (!player) {
    return gameState;
  }

  const remainingCards = TACO_CAT_CARDS.filter(
    card => !player.hand.some(h => h.id === card.id) && 
            !player.cardsWon.some(w => w.id === card.id) &&
            !gameState.centerPile.some(c => c.id === card.id)
  );

  if (remainingCards.length === 0) {
    return gameState;
  }

  const randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)];
  if (!randomCard) {
    return gameState;
  }

  const newPlayer: TacoCatPlayer = {
    ...player,
    hand: [...player.hand, randomCard]
  };

  return {
    ...gameState,
    players: [newPlayer]
  };
}

export function calculateFinalScore(gameState: TacoCatGameState): number {
  const player = gameState.players[0];
  if (!player) {
    return 0;
  }

  const baseScore = gameState.score.total;
  
  // Accuracy bonus
  const totalAttempts = player.correctMatches + player.incorrectMatches;
  const accuracy = totalAttempts > 0 ? player.correctMatches / totalAttempts : 0;
  const accuracyBonus = Math.floor(accuracy * 50);
  
  // Speed bonus
  const avgReactionTime = player.reactionTime.length > 0 
    ? player.reactionTime.reduce((a, b) => a + b, 0) / player.reactionTime.length 
    : 0;
  const speedBonus = avgReactionTime < 2000 ? Math.floor((2000 - avgReactionTime) / 50) : 0;

  return baseScore + accuracyBonus + speedBonus;
} 