import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, GameTile } from './types';

const TILE_COLORS = [
  'oklch(0.75 0.20 30)',    // Coral/Orange
  'oklch(0.70 0.18 180)',   // Teal
  'oklch(0.80 0.22 85)',    // Yellow
  'oklch(0.65 0.20 330)',   // Pink/Magenta
];

const INITIAL_LIVES = 3;
const SHOW_DURATION = 600;
const SHOW_GAP = 300;

const createInitialTiles = (): GameTile[] => {
  return TILE_COLORS.map((color, id) => ({
    id,
    color,
    isActive: false,
  }));
};

const initialState: GameState = {
  phase: 'idle',
  tiles: createInitialTiles(),
  sequence: [],
  playerSequence: [],
  round: 0,
  score: 0,
  lives: INITIAL_LIVES,
};

export function useMiniGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const activateTile = useCallback((tileId: number, duration: number = SHOW_DURATION) => {
    setGameState((prev) => ({
      ...prev,
      tiles: prev.tiles.map((tile) =>
        tile.id === tileId ? { ...tile, isActive: true } : tile
      ),
    }));

    timeoutRef.current = setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        tiles: prev.tiles.map((tile) => ({ ...tile, isActive: false })),
      }));
    }, duration);
  }, []);

  const showSequence = useCallback(
    (sequence: number[]) => {
      setGameState((prev) => ({ ...prev, phase: 'showing' }));

      let delay = 500;
      sequence.forEach((tileId, index) => {
        timeoutRef.current = setTimeout(() => {
          activateTile(tileId);

          if (index === sequence.length - 1) {
            timeoutRef.current = setTimeout(() => {
              setGameState((prev) => ({ ...prev, phase: 'playerTurn' }));
            }, SHOW_DURATION + 300);
          }
        }, delay);
        delay += SHOW_DURATION + SHOW_GAP;
      });
    },
    [activateTile]
  );

  const startNewRound = useCallback(() => {
    setGameState((prev) => {
      const newSequence = [
        ...prev.sequence,
        Math.floor(Math.random() * TILE_COLORS.length),
      ];
      const newRound = prev.round + 1;

      setTimeout(() => showSequence(newSequence), 100);

      return {
        ...prev,
        sequence: newSequence,
        playerSequence: [],
        round: newRound,
      };
    });
  }, [showSequence]);

  const startGame = useCallback(() => {
    clearTimeouts();
    setGameState({
      ...initialState,
      phase: 'showing',
      tiles: createInitialTiles(),
    });
    setTimeout(() => startNewRound(), 100);
  }, [clearTimeouts, startNewRound]);

  const handleCorrectSequence = useCallback(() => {
    setGameState((prev) => {
      const roundScore = prev.round * 10;
      return {
        ...prev,
        phase: 'correct',
        score: prev.score + roundScore,
      };
    });

    timeoutRef.current = setTimeout(() => {
      startNewRound();
    }, 1000);
  }, [startNewRound]);

  const handleWrongSequence = useCallback(() => {
    setGameState((prev) => {
      const newLives = prev.lives - 1;

      if (newLives <= 0) {
        return {
          ...prev,
          phase: 'gameOver',
          lives: 0,
        };
      }

      return {
        ...prev,
        phase: 'wrong',
        lives: newLives,
        playerSequence: [],
      };
    });

    timeoutRef.current = setTimeout(() => {
      setGameState((prev) => {
        if (prev.phase === 'gameOver') return prev;
        showSequence(prev.sequence);
        return prev;
      });
    }, 1500);
  }, [showSequence]);

  const handleTileClick = useCallback(
    (tileId: number) => {
      if (gameState.phase !== 'playerTurn') return;

      activateTile(tileId, 200);

      setGameState((prev) => {
        const newPlayerSequence = [...prev.playerSequence, tileId];
        const currentIndex = newPlayerSequence.length - 1;

        if (newPlayerSequence[currentIndex] !== prev.sequence[currentIndex]) {
          handleWrongSequence();
          return prev;
        }

        if (newPlayerSequence.length === prev.sequence.length) {
          handleCorrectSequence();
          return { ...prev, playerSequence: newPlayerSequence };
        }

        return { ...prev, playerSequence: newPlayerSequence };
      });
    },
    [gameState.phase, activateTile, handleWrongSequence, handleCorrectSequence]
  );

  const resetGame = useCallback(() => {
    clearTimeouts();
    setGameState({ ...initialState, tiles: createInitialTiles() });
  }, [clearTimeouts]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  return {
    gameState,
    startGame,
    handleTileClick,
    resetGame,
  };
}
