import { cn } from '@/lib/utils';
import type { GameTile } from '@/game/types';

interface GameBoardProps {
  tiles: GameTile[];
  onTileClick: (id: number) => void;
  disabled: boolean;
}

export function GameBoard({ tiles, onTileClick, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {tiles.map((tile) => (
        <button
          key={tile.id}
          onClick={() => !disabled && onTileClick(tile.id)}
          disabled={disabled}
          className={cn(
            'aspect-square rounded-2xl transition-all duration-200 transform',
            'focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed',
            tile.isActive && 'scale-95 brightness-150 shadow-2xl',
            !tile.isActive && !disabled && 'hover:scale-105 hover:brightness-110 active:scale-95',
            disabled && 'opacity-50'
          )}
          style={{
            backgroundColor: tile.color,
            boxShadow: tile.isActive
              ? `0 0 40px ${tile.color}, 0 0 80px ${tile.color}40`
              : '0 4px 20px rgba(0,0,0,0.1)',
          }}
          aria-label={`Tile ${tile.id + 1}`}
        />
      ))}
    </div>
  );
}
