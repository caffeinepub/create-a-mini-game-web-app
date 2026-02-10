import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameScreen } from './screens/GameScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { AuthStatus } from './components/AuthStatus';
import { Trophy, Gamepad2 } from 'lucide-react';
import { SiCaffeine } from 'react-icons/si';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Memory Master</h1>
              <p className="text-xs text-muted-foreground">Test your memory skills</p>
            </div>
          </div>
          <AuthStatus />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="game" className="gap-2">
              <Gamepad2 className="w-4 h-4" />
              Play Game
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="mt-0">
            <GameScreen />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0">
            <LeaderboardScreen />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © 2026. Built with <span className="text-destructive">♥</span> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors font-medium"
            >
              <SiCaffeine className="w-4 h-4" />
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
