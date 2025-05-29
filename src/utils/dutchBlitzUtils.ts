import type { DutchBlitzGameState, DutchBlitzPlayer, DutchBlitzCard } from '../types/dutchBlitzGame';
import { DUTCH_BLITZ_CARDS, DUTCH_BLITZ_COMMANDS, DIFFICULTY_SETTINGS } from '../data/dutchBlitzData';

export const initializeDutchBlitzGame = (difficulty: 'easy' | 'medium' | 'hard'): DutchBlitzGameState => {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const shuffledCards = shuffleCards([...DUTCH_BLITZ_CARDS]);
  
  const player: DutchBlitzPlayer = {
    id: 'player-1',
    name: 'Player',
    score: 0,
    cardsPlayed: 0,
    blitzPile: shuffledCards.slice(0, 10),
    postPiles: [
      shuffledCards.slice(10, 13),
      shuffledCards.slice(13, 16),
      shuffledCards.slice(16, 19)
    ],
    dutchPile: shuffledCards.slice(19, settings.cardsPerPlayer),
    handCards: [],
    reactionTime: [],
    fluencyScore: 0,
    commandsUsed: []
  };

  // Set up card piles
  player.blitzPile.forEach((card, index) => {
    card.pile = 'blitz';
    card.position = index;
    card.isPlayable = index === player.blitzPile.length - 1; // Only top card is playable
  });

  player.postPiles.forEach((pile) => {
    pile.forEach((card, cardIndex) => {
      card.pile = 'post';
      card.position = cardIndex;
      card.isPlayable = cardIndex === pile.length - 1; // Only top card is playable
    });
  });

  player.dutchPile.forEach((card, index) => {
    card.pile = 'dutch';
    card.position = index;
    card.isPlayable = false;
  });

  return {
    phase: 'setup',
    round: 1,
    maxRounds: 3,
    timeLimit: settings.timeLimit,
    remainingTime: settings.timeLimit,
    players: [player],
    currentPlayer: 0,
    centerPiles: [[], [], [], []], // 4 center piles for each color
    gameLog: [],
    score: {
      cardsPlayed: 0,
      speedBonus: 0,
      fluencyBonus: 0,
      grammarBonus: 0,
      total: 0
    },
    difficulty,
    isGameActive: false,
    lastPlayTime: 0,
    currentCommand: null
  };
};

export const shuffleCards = (cards: DutchBlitzCard[]): DutchBlitzCard[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const cardI = shuffled[i];
    const cardJ = shuffled[j];
    if (cardI && cardJ) {
      [shuffled[i], shuffled[j]] = [cardJ, cardI];
    }
  }
  return shuffled;
};

export const canPlayCard = (card: DutchBlitzCard, targetPile: DutchBlitzCard[]): boolean => {
  if (!card.isPlayable) return false;
  
  // Center piles: must be same color and sequential number
  if (targetPile.length === 0) {
    return card.number === 1; // Can only start with 1
  }
  
  const topCard = targetPile[targetPile.length - 1];
  if (!topCard) return false;
  return card.color === topCard.color && card.number === topCard.number + 1;
};

export const canPlayOnPost = (card: DutchBlitzCard, targetPile: DutchBlitzCard[]): boolean => {
  if (!card.isPlayable) return false;
  
  // Post piles: must be different color and descending number
  if (targetPile.length === 0) {
    return true; // Can play any card on empty post pile
  }
  
  const topCard = targetPile[targetPile.length - 1];
  if (!topCard) return false;
  return card.color !== topCard.color && card.number === topCard.number - 1;
};

export const playCard = (
  gameState: DutchBlitzGameState,
  cardId: string,
  targetPile: 'center' | 'post',
  targetIndex: number,
  command: string
): { success: boolean; newState: DutchBlitzGameState; message: string } => {
  const newState = { ...gameState };
  const player = newState.players[newState.currentPlayer];
  if (!player) {
    return { success: false, newState: gameState, message: "Player not found!" };
  }
  
  const currentTime = Date.now();
  const reactionTime = currentTime - newState.lastPlayTime;

  // Find the card
  let card: DutchBlitzCard | undefined;
  let sourcePile: DutchBlitzCard[] | undefined;
  let sourceIndex = -1;

  // Check blitz pile
  if (player.blitzPile.length > 0 && player.blitzPile[player.blitzPile.length - 1]?.id === cardId) {
    const topCard = player.blitzPile[player.blitzPile.length - 1];
    if (topCard) {
      card = topCard;
      sourcePile = player.blitzPile;
      sourceIndex = player.blitzPile.length - 1;
    }
  }

  // Check post piles
  if (!card) {
    for (let i = 0; i < player.postPiles.length; i++) {
      const pile = player.postPiles[i];
      if (pile && pile.length > 0 && pile[pile.length - 1]?.id === cardId) {
        const topCard = pile[pile.length - 1];
        if (topCard) {
          card = topCard;
          sourcePile = pile;
          sourceIndex = pile.length - 1;
          break;
        }
      }
    }
  }

  // Check hand cards
  if (!card) {
    const handIndex = player.handCards.findIndex(c => c.id === cardId);
    if (handIndex !== -1 && player.handCards[handIndex]) {
      card = player.handCards[handIndex];
      sourcePile = player.handCards;
      sourceIndex = handIndex;
    }
  }

  if (!card || !sourcePile) {
    return { success: false, newState: gameState, message: "Card not found!" };
  }

  // Check if play is valid
  let canPlay = false;
  let targetPileArray: DutchBlitzCard[];

  if (targetPile === 'center') {
    targetPileArray = newState.centerPiles[targetIndex] || [];
    canPlay = canPlayCard(card, targetPileArray);
  } else {
    targetPileArray = player.postPiles[targetIndex] || [];
    canPlay = canPlayOnPost(card, targetPileArray);
  }

  if (!canPlay) {
    return { success: false, newState: gameState, message: "Invalid play!" };
  }

  // Execute the play
  sourcePile.splice(sourceIndex, 1);
  targetPileArray.push(card);
  
  // Update card properties
  card.pile = targetPile === 'center' ? null : 'post';
  card.position = targetPileArray.length - 1;

  // Update playable cards
  updatePlayableCards(player);

  // Update player stats
  player.cardsPlayed++;
  player.reactionTime.push(reactionTime);
  player.commandsUsed.push(command);
  
  // Calculate fluency bonus
  if (DUTCH_BLITZ_COMMANDS.includes(command)) {
    player.fluencyScore += 5;
  }

  // Update game log
  newState.gameLog.push(`${player.name} played ${card.color} ${card.number} using: "${command}"`);
  newState.lastPlayTime = currentTime;

  // Check for round end
  if (player.blitzPile.length === 0) {
    newState.phase = 'results';
    calculateFinalScore(newState);
  }

  return { success: true, newState, message: `Played ${card.color} ${card.number}!` };
};

export const updatePlayableCards = (player: DutchBlitzPlayer): void => {
  // Reset all cards to not playable
  [...player.blitzPile, ...player.postPiles.flat(), ...player.dutchPile, ...player.handCards]
    .forEach(card => card.isPlayable = false);

  // Top of blitz pile is playable
  if (player.blitzPile.length > 0) {
    const topCard = player.blitzPile[player.blitzPile.length - 1];
    if (topCard) {
      topCard.isPlayable = true;
    }
  }

  // Top of each post pile is playable
  player.postPiles.forEach(pile => {
    if (pile.length > 0) {
      const topCard = pile[pile.length - 1];
      if (topCard) {
        topCard.isPlayable = true;
      }
    }
  });

  // Hand cards are playable
  player.handCards.forEach(card => card.isPlayable = true);
};

export const drawFromDutch = (gameState: DutchBlitzGameState): DutchBlitzGameState => {
  const newState = { ...gameState };
  const player = newState.players[newState.currentPlayer];
  if (!player) return newState;

  if (player.dutchPile.length === 0) {
    // Reshuffle hand back to dutch pile
    player.dutchPile = [...player.handCards];
    player.handCards = [];
    player.dutchPile.forEach((card, index) => {
      card.pile = 'dutch';
      card.position = index;
      card.isPlayable = false;
    });
  }

  // Draw 3 cards (or remaining cards if less than 3)
  const cardsToDraw = Math.min(3, player.dutchPile.length);
  const drawnCards = player.dutchPile.splice(-cardsToDraw, cardsToDraw);
  
  drawnCards.forEach((card, index) => {
    card.pile = 'hand';
    card.position = index;
    card.isPlayable = true;
  });

  player.handCards = drawnCards;
  updatePlayableCards(player);

  return newState;
};

export const calculateSpeedBonus = (reactionTimes: number[]): number => {
  if (reactionTimes.length === 0) return 0;
  
  const averageTime = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length;
  
  // Bonus based on average reaction time (lower is better)
  if (averageTime < 1000) return 50; // Under 1 second
  if (averageTime < 2000) return 30; // Under 2 seconds
  if (averageTime < 3000) return 15; // Under 3 seconds
  return 5; // Participation bonus
};

export const calculateFluencyBonus = (commandsUsed: string[]): number => {
  const uniqueCommands = new Set(commandsUsed);
  const correctCommands = commandsUsed.filter(cmd => DUTCH_BLITZ_COMMANDS.includes(cmd));
  
  return uniqueCommands.size * 5 + correctCommands.length * 2;
};

export const calculateFinalScore = (gameState: DutchBlitzGameState): void => {
  const player = gameState.players[gameState.currentPlayer];
  if (!player) return;
  
  const speedBonus = calculateSpeedBonus(player.reactionTime);
  const fluencyBonus = calculateFluencyBonus(player.commandsUsed);
  
  gameState.score = {
    cardsPlayed: player.cardsPlayed * 10,
    speedBonus,
    fluencyBonus,
    grammarBonus: 0, // Will be added from grammar exercises
    total: player.cardsPlayed * 10 + speedBonus + fluencyBonus
  };
  
  player.score = gameState.score.total;
};

export const getRandomCommand = (): string => {
  const command = DUTCH_BLITZ_COMMANDS[Math.floor(Math.random() * DUTCH_BLITZ_COMMANDS.length)];
  return command || 'Play fast!';
};

export const startTimer = (gameState: DutchBlitzGameState): DutchBlitzGameState => {
  const newState = { ...gameState };
  newState.isGameActive = true;
  newState.phase = 'playing';
  newState.lastPlayTime = Date.now();
  return newState;
};

export const updateTimer = (gameState: DutchBlitzGameState): DutchBlitzGameState => {
  if (!gameState.isGameActive) return gameState;
  
  const newState = { ...gameState };
  newState.remainingTime = Math.max(0, newState.remainingTime - 1);
  
  if (newState.remainingTime === 0) {
    newState.isGameActive = false;
    newState.phase = 'results';
    calculateFinalScore(newState);
  }
  
  return newState;
}; 