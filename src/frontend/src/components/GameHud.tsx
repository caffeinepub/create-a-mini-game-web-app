import { Card } from '@/components/ui/card';
import { Heart, Target, Zap } from 'lucide-react';
import type { GamePhase } from '@/game/types';

interface GameHudProps {
  score: number;
  round: number;
  phase: GamePhase;
  lives: number;
}

export function GameHud({ score, round, phase, lives }: GameHudProps) {
  const getPhaseText = () => {
    switch (phase) {
      case 'showing':
        return 'Watch carefully...';
      case 'playerTurn':
        return 'Your turn!';
      case 'correct':
        return 'Correct! 🎉';
      case 'wrong':
        return 'Wrong! 😢';
      default:
        return '';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-2xl font-bold">{round}</div>
            <div className="text-xs text-muted-foreground">Round</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <div className="text-2xl font-bold">{lives}</div>
            <div className="text-xs text-muted-foreground">Lives</div>
          </div>
        </div>

        <div className="w-full sm:w-auto text-center sm:text-left">
          <div className="text-lg font-semibold text-primary">{getPhaseText()}</div>
        </div>
      </div>
    </Card>
  );
}
