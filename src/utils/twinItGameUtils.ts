import type { TwinItGameState, TwinItPlayer, TwinItCard } from '../types/twinItGame';
import { twinItCards, difficultySettings } from '../data/twinItGameData';

export const initializeTwinItGame = (difficulty: 'easy' | 'medium' | 'hard' = 'medium'): TwinItGameState => {
  const settings = difficultySettings[difficulty];
  
  const player: TwinItPlayer = {
    id: 'player-1',
    name: 'Pattern Finder',
    score: 0,
    matchesFound: 0,
    reactionTime: [],
    communicationScore: 0
  };

  // Shuffle cards and select visible ones
  const shuffledCards = shuffleCards([...twinItCards]);
  const visibleCards = shuffledCards.slice(0, settings.cardsVisible).map(card => ({
    ...card,
    isVisible: true,
    isMatched: false
  }));

  return {
    phase: 'setup',
    round: 1,
    maxRounds: 3,
    timeLimit: settings.timeLimit,
    remainingTime: settings.timeLimit,
    players: [player],
    currentPlayer: 0,
    visibleCards,
    allCards: shuffledCards,
    currentMatch: null,
    gameLog: [
      'Welcome to Twin It! Find matching patterns as quickly as possible!',
      '트윈 잇에 오신 것을 환영합니다! 가능한 한 빨리 일치하는 패턴을 찾으세요!'
    ],
    score: {
      matchesFound: 0,
      speedBonus: 0,
      grammarBonus: 0,
      total: 0
    },
    difficulty,
    isGameActive: false,
    lastMatchTime: Date.now()
  };
};

export const shuffleCards = (cards: TwinItCard[]): TwinItCard[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp!;
  }
  return shuffled;
};

export const findMatch = (gameState: TwinItGameState, card1Id: string, card2Id: string): TwinItGameState => {
  const card1 = gameState.visibleCards.find(c => c.id === card1Id);
  const card2 = gameState.visibleCards.find(c => c.id === card2Id);
  
  if (!card1 || !card2 || card1.id === card2.id) {
    return gameState;
  }

  const isMatch = card1.pattern === card2.pattern && card1.color === card2.color;
  const currentTime = Date.now();
  const reactionTime = (currentTime - gameState.lastMatchTime) / 1000;

  if (isMatch) {
    // Mark cards as matched
    const updatedVisibleCards = gameState.visibleCards.map(card => {
      if (card.id === card1Id || card.id === card2Id) {
        return { ...card, isMatched: true, matchedBy: gameState.players[0]?.id };
      }
      return card;
    });

    // Update player stats
    const updatedPlayers = gameState.players.map(player => ({
      ...player,
      score: player.score + calculateMatchScore(reactionTime, gameState.difficulty),
      matchesFound: player.matchesFound + 1,
      reactionTime: [...player.reactionTime, reactionTime]
    }));

    // Calculate speed bonus
    const speedBonus = reactionTime <= difficultySettings[gameState.difficulty].speedThreshold ? 
      difficultySettings[gameState.difficulty].matchTimeBonus : 0;

    return {
      ...gameState,
      visibleCards: updatedVisibleCards,
      players: updatedPlayers,
      currentMatch: {
        card1,
        card2,
        foundBy: gameState.players[0]?.id || null,
        timestamp: currentTime
      },
      score: {
        ...gameState.score,
        matchesFound: gameState.score.matchesFound + 1,
        speedBonus: gameState.score.speedBonus + speedBonus
      },
      gameLog: [
        ...gameState.gameLog,
        `Match found! ${card1.pattern} patterns matched!`,
        `짝을 찾았습니다! ${card1.pattern} 패턴이 일치합니다!`,
        speedBonus > 0 ? `Speed bonus: +${speedBonus} points!` : '',
        speedBonus > 0 ? `속도 보너스: +${speedBonus} 점!` : ''
      ].filter(Boolean),
      lastMatchTime: currentTime
    };
  } else {
    return {
      ...gameState,
      gameLog: [
        ...gameState.gameLog,
        'No match! Try again.',
        '일치하지 않습니다! 다시 시도하세요.'
      ]
    };
  }
};

export const calculateMatchScore = (reactionTime: number, difficulty: 'easy' | 'medium' | 'hard'): number => {
  const baseScore = 10;
  const speedThreshold = difficultySettings[difficulty].speedThreshold;
  const speedBonus = difficultySettings[difficulty].matchTimeBonus;
  
  let score = baseScore;
  
  // Speed bonus for quick reactions
  if (reactionTime <= speedThreshold) {
    score += speedBonus;
  }
  
  // Additional bonus for very fast reactions
  if (reactionTime <= speedThreshold / 2) {
    score += speedBonus / 2;
  }
  
  return Math.round(score);
};

export const addNewCards = (gameState: TwinItGameState): TwinItGameState => {
  const matchedCards = gameState.visibleCards.filter(card => card.isMatched);
  
  if (matchedCards.length === 0) return gameState;

  // Remove matched cards and add new ones
  const remainingCards = gameState.visibleCards.filter(card => !card.isMatched);
  const availableCards = gameState.allCards.filter(card => 
    !gameState.visibleCards.some(visible => visible.id === card.id)
  );
  
  const newCards = availableCards.slice(0, matchedCards.length).map(card => ({
    ...card,
    isVisible: true,
    isMatched: false
  }));

  return {
    ...gameState,
    visibleCards: [...remainingCards, ...newCards],
    gameLog: [
      ...gameState.gameLog,
      `${newCards.length} new cards added!`,
      `${newCards.length}개의 새 카드가 추가되었습니다!`
    ]
  };
};

export const updateGameTimer = (gameState: TwinItGameState, deltaTime: number): TwinItGameState => {
  const newRemainingTime = Math.max(0, gameState.remainingTime - deltaTime);
  
  return {
    ...gameState,
    remainingTime: newRemainingTime
  };
};

export const calculateFinalScore = (gameState: TwinItGameState): TwinItGameState => {
  const player = gameState.players[0];
  if (!player) return gameState;

  const matchesFound = player.matchesFound * 10;
  const speedBonus = gameState.score.speedBonus;
  const grammarBonus = gameState.score.grammarBonus;
  const timeBonus = Math.round(gameState.remainingTime * 2); // 2 points per remaining second
  
  const total = matchesFound + speedBonus + grammarBonus + timeBonus;

  return {
    ...gameState,
    score: {
      matchesFound,
      speedBonus,
      grammarBonus,
      total
    }
  };
};

export const getAverageReactionTime = (player: TwinItPlayer): number => {
  if (player.reactionTime.length === 0) return 0;
  const sum = player.reactionTime.reduce((acc, time) => acc + time, 0);
  return sum / player.reactionTime.length;
};

export const getMatchingCards = (gameState: TwinItGameState): TwinItCard[][] => {
  const visibleCards = gameState.visibleCards.filter(card => !card.isMatched);
  const matches: TwinItCard[][] = [];
  
  for (let i = 0; i < visibleCards.length; i++) {
    for (let j = i + 1; j < visibleCards.length; j++) {
      const card1 = visibleCards[i];
      const card2 = visibleCards[j];
      
      if (card1 && card2 && card1.pattern === card2.pattern && card1.color === card2.color) {
        matches.push([card1, card2]);
      }
    }
  }
  
  return matches;
};

export const hasAvailableMatches = (gameState: TwinItGameState): boolean => {
  return getMatchingCards(gameState).length > 0;
};

export const isGameComplete = (gameState: TwinItGameState): boolean => {
  return gameState.remainingTime <= 0 || !hasAvailableMatches(gameState);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}; 