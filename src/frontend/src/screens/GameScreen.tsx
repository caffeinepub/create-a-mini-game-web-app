import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GameBoard } from '@/components/GameBoard';
import { GameHud } from '@/components/GameHud';
import { useMiniGame } from '@/game/useMiniGame';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useSubmitScore } from '@/hooks/useQueries';
import { Play, RotateCcw, Upload, LogIn } from 'lucide-react';

export function GameScreen() {
  const { identity, login } = useInternetIdentity();
  const { gameState, startGame, handleTileClick, resetGame } = useMiniGame();
  const { mutate: submitScore, isPending: isSubmitting, isSuccess: isSubmitted } = useSubmitScore();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmitScore = () => {
    if (!identity) {
      login();
      return;
    }

    setSubmitError(null);
    submitScore(BigInt(gameState.score), {
      onError: (error) => {
        setSubmitError(error.message || 'Failed to submit score. Please try again.');
      },
    });
  };

  if (gameState.phase === 'idle') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Play className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl mb-2">Memory Master</CardTitle>
            <CardDescription className="text-base">
              Watch the sequence, then repeat it by clicking the tiles in order
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg">How to Play:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground">1.</span>
                Watch the tiles light up in sequence
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground">2.</span>
                Click the tiles in the same order
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground">3.</span>
                Each round adds one more tile to remember
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground">4.</span>
                Keep going until you make a mistake!
              </li>
            </ul>
          </div>

          <Button onClick={startGame} size="lg" className="w-full text-lg h-14">
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState.phase === 'gameOver') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center">
            <RotateCcw className="w-10 h-10 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-3xl mb-2">Game Over!</CardTitle>
            <CardDescription className="text-base">
              You reached round {gameState.round}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {gameState.score}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Final Score</div>
          </div>

          {!identity && (
            <Alert>
              <LogIn className="h-4 w-4" />
              <AlertDescription>
                Sign in to submit your score to the leaderboard
              </AlertDescription>
            </Alert>
          )}

          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {isSubmitted && (
            <Alert className="border-primary/50 bg-primary/5">
              <AlertDescription className="text-foreground">
                Score submitted successfully! Check the leaderboard to see your ranking.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button onClick={resetGame} variant="outline" size="lg" className="flex-1">
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            {identity && !isSubmitted && (
              <Button
                onClick={handleSubmitScore}
                disabled={isSubmitting}
                size="lg"
                className="flex-1"
              >
                <Upload className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </Button>
            )}
            {!identity && (
              <Button onClick={login} size="lg" className="flex-1">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <GameHud
        score={gameState.score}
        round={gameState.round}
        phase={gameState.phase}
        lives={gameState.lives}
      />
      <GameBoard
        tiles={gameState.tiles}
        onTileClick={handleTileClick}
        disabled={gameState.phase !== 'playerTurn'}
      />
    </div>
  );
}
