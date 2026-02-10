export type GamePhase = 'idle' | 'showing' | 'playerTurn' | 'correct' | 'wrong' | 'gameOver';

export interface GameTile {
  id: number;
  color: string;
  isActive: boolean;
}

export interface GameState {
  phase: GamePhase;
  tiles: GameTile[];
  sequence: number[];
  playerSequence: number[];
  round: number;
  score: number;
  lives: number;
}
