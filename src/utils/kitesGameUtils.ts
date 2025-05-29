import type { KitesGameState, KitesPlayer, SandTimer, Kite, WindCondition } from '../types/kitesGame';
import { sandTimers, kites, windConditions, difficultySettings } from '../data/kitesGameData';

export const initializeKitesGame = (difficulty: 'easy' | 'medium' | 'hard' = 'medium'): KitesGameState => {
  const settings = difficultySettings[difficulty];
  
  const player: KitesPlayer = {
    id: 'player-1',
    name: 'Kite Flyer',
    assignedTimers: sandTimers.map(t => t.id),
    cooperationPoints: 0,
    communicationScore: 0,
    timeManagementScore: 0
  };

  return {
    phase: 'planning',
    round: 1,
    maxRounds: 3,
    timeLimit: settings.timeLimit,
    remainingTime: settings.timeLimit,
    players: [player],
    currentPlayer: 0,
    sandTimers: sandTimers.map(timer => ({ ...timer })),
    kites: kites.map(kite => ({ ...kite })),
    activeWindConditions: [],
    gameLog: [
      'Welcome to Kites! Work together to keep the kites flying!',
      '연날리기에 오신 것을 환영합니다! 함께 연을 하늘에 띄워 보세요!'
    ],
    score: {
      kitesFlying: 0,
      timeBonus: 0,
      cooperationBonus: 0,
      grammarBonus: 0,
      total: 0
    },
    difficulty,
    isGameActive: false,
    lastFlipTime: Date.now()
  };
};

export const flipTimer = (gameState: KitesGameState, timerId: string): KitesGameState => {
  const timer = gameState.sandTimers.find(t => t.id === timerId);
  if (!timer) return gameState;

  const updatedTimers = gameState.sandTimers.map(t => {
    if (t.id === timerId) {
      return {
        ...t,
        isFlipped: true,
        isActive: true,
        remainingTime: t.duration
      };
    }
    return t;
  });

  const timerColor = timer.color;
  const timerColorKorean = timer.colorKorean;

  return {
    ...gameState,
    sandTimers: updatedTimers,
    gameLog: [
      ...gameState.gameLog,
      `${timerColor} timer flipped!`,
      `${timerColorKorean} 타이머가 뒤집어졌습니다!`
    ],
    lastFlipTime: Date.now()
  };
};

export const updateTimers = (gameState: KitesGameState, deltaTime: number): KitesGameState => {
  const speedMultiplier = difficultySettings[gameState.difficulty].timerSpeedMultiplier;
  const adjustedDelta = deltaTime * speedMultiplier;

  const updatedTimers = gameState.sandTimers.map(timer => {
    if (timer.isActive && timer.remainingTime > 0) {
      const newRemainingTime = Math.max(0, timer.remainingTime - adjustedDelta);
      return {
        ...timer,
        remainingTime: newRemainingTime,
        isActive: newRemainingTime > 0
      };
    }
    return timer;
  });

  // Check for expired timers
  const expiredTimers = updatedTimers.filter(t => 
    gameState.sandTimers.find(original => original.id === t.id)?.isActive && 
    !t.isActive
  );

  const newGameLog = [...gameState.gameLog];
  expiredTimers.forEach(timer => {
    newGameLog.push(
      `${timer.color} timer ran out!`,
      `${timer.colorKorean} 타이머가 떨어졌습니다!`
    );
  });

  return {
    ...gameState,
    sandTimers: updatedTimers,
    gameLog: newGameLog
  };
};

export const launchKite = (gameState: KitesGameState, kiteId: string): KitesGameState => {
  const kite = gameState.kites.find(k => k.id === kiteId);
  if (!kite) return gameState;

  // Check if required timers are active
  const requiredTimersActive = kite.requiredTimers.every(timerColor => {
    return gameState.sandTimers.some(timer => 
      timer.color === timerColor && timer.isActive && timer.remainingTime > 0
    );
  });

  if (!requiredTimersActive) {
    return {
      ...gameState,
      gameLog: [
        ...gameState.gameLog,
        `Cannot launch ${kite.name} - missing required timers!`,
        `${kite.nameKorean}을/를 띄울 수 없습니다 - 필요한 타이머가 부족합니다!`
      ]
    };
  }

  const updatedKites = gameState.kites.map(k => {
    if (k.id === kiteId) {
      return {
        ...k,
        isFlying: true,
        altitude: 50
      };
    }
    return k;
  });

  return {
    ...gameState,
    kites: updatedKites,
    gameLog: [
      ...gameState.gameLog,
      `${kite.name} is now flying!`,
      `${kite.nameKorean}이/가 이제 날고 있습니다!`
    ]
  };
};

export const updateKiteAltitudes = (gameState: KitesGameState): KitesGameState => {
  const updatedKites = gameState.kites.map(kite => {
    if (!kite.isFlying) return kite;

    // Check if required timers are still active
    const requiredTimersActive = kite.requiredTimers.every(timerColor => {
      return gameState.sandTimers.some(timer => 
        timer.color === timerColor && timer.isActive && timer.remainingTime > 0
      );
    });

    let newAltitude = kite.altitude;

    if (requiredTimersActive) {
      // Kite can maintain or gain altitude
      newAltitude = Math.min(100, kite.altitude + 2);
    } else {
      // Kite loses altitude without proper timers
      newAltitude = Math.max(0, kite.altitude - 5);
    }

    // Apply wind effects
    const activeWind = gameState.activeWindConditions[0];
    if (activeWind) {
      const windEffect = calculateWindEffect(kite, activeWind);
      newAltitude = Math.max(0, Math.min(100, newAltitude + windEffect));
    }

    const isStillFlying = newAltitude > 0;

    return {
      ...kite,
      altitude: newAltitude,
      isFlying: isStillFlying
    };
  });

  // Check for crashed kites
  const crashedKites = updatedKites.filter(kite => 
    gameState.kites.find(original => original.id === kite.id)?.isFlying && 
    !kite.isFlying
  );

  const newGameLog = [...gameState.gameLog];
  crashedKites.forEach(kite => {
    newGameLog.push(
      `${kite.name} has crashed!`,
      `${kite.nameKorean}이/가 추락했습니다!`
    );
  });

  return {
    ...gameState,
    kites: updatedKites,
    gameLog: newGameLog
  };
};

export const calculateWindEffect = (kite: Kite, wind: WindCondition): number => {
  const baseEffect = wind.strength - kite.windResistance;
  
  switch (wind.id) {
    case 'gentle-breeze':
      return 2; // Always positive
    case 'strong-wind':
      return baseEffect * -2;
    case 'gusty-wind':
      return baseEffect * -3;
    case 'calm-air':
      return 1; // Slight positive
    case 'storm-approaching':
      return baseEffect * -5;
    default:
      return baseEffect;
  }
};

export const activateWindCondition = (gameState: KitesGameState, windId: string): KitesGameState => {
  const wind = windConditions.find(w => w.id === windId);
  if (!wind) return gameState;

  const activatedWind = {
    ...wind,
    isActive: true,
    remainingTime: wind.duration
  };

  return {
    ...gameState,
    activeWindConditions: [activatedWind],
    gameLog: [
      ...gameState.gameLog,
      `${wind.name} is now active!`,
      `${wind.nameKorean}이/가 활성화되었습니다!`,
      wind.effect,
      wind.effectKorean
    ]
  };
};

export const updateWindConditions = (gameState: KitesGameState, deltaTime: number): KitesGameState => {
  const updatedWindConditions = gameState.activeWindConditions.map(wind => {
    const newRemainingTime = Math.max(0, wind.remainingTime - deltaTime);
    return {
      ...wind,
      remainingTime: newRemainingTime,
      isActive: newRemainingTime > 0
    };
  }).filter(wind => wind.isActive);

  return {
    ...gameState,
    activeWindConditions: updatedWindConditions
  };
};

export const calculateCooperationScore = (gameState: KitesGameState): number => {
  const flyingKites = gameState.kites.filter(k => k.isFlying).length;
  const activeTimers = gameState.sandTimers.filter(t => t.isActive).length;
  const timeEfficiency = gameState.remainingTime / gameState.timeLimit;
  
  return Math.round(
    (flyingKites * 20) + 
    (activeTimers * 5) + 
    (timeEfficiency * 30)
  );
};

export const calculateFinalScore = (gameState: KitesGameState): KitesGameState => {
  const kitesFlying = gameState.kites.filter(k => k.isFlying).length * 25;
  const timeBonus = Math.round((gameState.remainingTime / gameState.timeLimit) * 50);
  const cooperationBonus = calculateCooperationScore(gameState);
  const grammarBonus = gameState.score.grammarBonus;
  
  const total = kitesFlying + timeBonus + cooperationBonus + grammarBonus;

  return {
    ...gameState,
    score: {
      kitesFlying,
      timeBonus,
      cooperationBonus,
      grammarBonus,
      total
    }
  };
};

export const getTimersByColor = (gameState: KitesGameState, color: string): SandTimer[] => {
  return gameState.sandTimers.filter(timer => timer.color === color);
};

export const getAvailableKites = (gameState: KitesGameState): Kite[] => {
  return gameState.kites.filter(kite => {
    const requiredTimersActive = kite.requiredTimers.every(timerColor => {
      return gameState.sandTimers.some(timer => 
        timer.color === timerColor && timer.isActive && timer.remainingTime > 0
      );
    });
    return !kite.isFlying && requiredTimersActive;
  });
};

export const getRandomWindEvent = (): string => {
  const windIds = windConditions.map(w => w.id);
  const randomIndex = Math.floor(Math.random() * windIds.length);
  return windIds[randomIndex] || 'gentle-breeze';
};

export const isGameWon = (gameState: KitesGameState): boolean => {
  const flyingKites = gameState.kites.filter(k => k.isFlying).length;
  return flyingKites >= 3 && gameState.remainingTime > 0;
};

export const isGameLost = (gameState: KitesGameState): boolean => {
  const flyingKites = gameState.kites.filter(k => k.isFlying).length;
  const activeTimers = gameState.sandTimers.filter(t => t.isActive).length;
  return (flyingKites === 0 && activeTimers === 0) || gameState.remainingTime <= 0;
}; 