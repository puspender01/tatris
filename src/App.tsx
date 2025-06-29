import React, { useState, useCallback, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { NextPiece } from './components/NextPiece';
import { HoldPiece } from './components/HoldPiece';
import { GameStats } from './components/GameStats';
import { GameControls } from './components/GameControls';
import { ContactInfo } from './components/ContactInfo';
import { useKeyboard } from './hooks/useKeyboard';
import { useGameLoop } from './hooks/useGameLoop';
import { 
  createInitialGameState,
  movePiece,
  rotatePieceInGame,
  dropPiece,
  holdPiece,
  pauseGame,
  resetGame
} from './game/tetris';
import { GameState } from './types/game';
import { RotateCcw, Play, Pause, RotateCw } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const updateGameState = useCallback((newState: GameState) => {
    setGameState(newState);
  }, []);

  // Keyboard controls
  const keyboardCallbacks = {
    onMoveLeft: () => updateGameState(movePiece(gameState, { x: -1, y: 0 })),
    onMoveRight: () => updateGameState(movePiece(gameState, { x: 1, y: 0 })),
    onRotate: () => updateGameState(rotatePieceInGame(gameState)),
    onSoftDrop: () => updateGameState(dropPiece(gameState, false)),
    onHardDrop: () => updateGameState(dropPiece(gameState, true)),
    onHold: () => updateGameState(holdPiece(gameState)),
    onPause: () => updateGameState(pauseGame(gameState)),
  };

  useKeyboard(keyboardCallbacks, !gameState.isGameOver);

  // Game loop for automatic dropping
  const gameLoop = useCallback(() => {
    const now = Date.now();
    if (now - gameState.lastDrop >= gameState.dropTime && !gameState.isPaused && !gameState.isGameOver) {
      setGameState(prevState => ({
        ...dropPiece(prevState, false),
        lastDrop: now,
      }));
    }
  }, [gameState.lastDrop, gameState.dropTime, gameState.isPaused, gameState.isGameOver]);

  useGameLoop(gameLoop, !gameState.isGameOver && !gameState.isPaused);

  const handleRestart = () => {
    setGameState(resetGame());
  };

  const handlePause = () => {
    setGameState(pauseGame(gameState));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            BLOCK MASTER
          </h1>
          <p className="text-gray-300 text-lg"> Classic Tatric Puzzle Game Challenge by Puspender</p>
        </div>

        {/* Game Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Hold Piece */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            <HoldPiece piece={gameState.heldPiece} canHold={gameState.canHold} />
            <ContactInfo />
          </div>

          {/* Game Board */}
          <div className="relative order-1 lg:order-2">
            <GameBoard board={gameState.board} currentPiece={gameState.currentPiece} />
            
            {/* Game Overlay */}
            {(gameState.isGameOver || gameState.isPaused) && (
              <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="text-center text-white p-8">
                  {gameState.isGameOver ? (
                    <>
                      <h2 className="text-4xl font-bold mb-4 text-red-400">GAME OVER</h2>
                      <p className="text-xl mb-6">Final Score: {gameState.score.toLocaleString()}</p>
                      <button
                        onClick={handleRestart}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <RotateCcw className="inline-block w-5 h-5 mr-2" />
                        Play Again
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-4xl font-bold mb-4 text-yellow-400">PAUSED</h2>
                      <button
                        onClick={handlePause}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Play className="inline-block w-5 h-5 mr-2" />
                        Resume
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Next, Stats, Controls, Buttons */}
          <div className="flex flex-col gap-4 order-3">
            <NextPiece piece={gameState.nextPiece} />
            
            <GameStats 
              score={gameState.score} 
              lines={gameState.lines} 
              level={gameState.level} 
            />
            
            <GameControls />
            
            {/* Control Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handlePause}
                disabled={gameState.isGameOver}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                {gameState.isPaused ? (
                  <>
                    <Play className="inline-block w-4 h-4 mr-1" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="inline-block w-4 h-4 mr-1" />
                    Pause
                  </>
                )}
              </button>
              
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                <RotateCw className="inline-block w-4 h-4 mr-1" />
                Restart
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>Use arrow keys to move and rotate pieces. Press SPACE for hard drop, C to hold, P to pause.</p>
        </div>
      </div>
    </div>
  );
}

export default App;