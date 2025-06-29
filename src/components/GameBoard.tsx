import React from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE, COLORS } from '../game/constants';
import { Tetromino } from '../types/game';
import { getGhostPosition } from '../utils/gameUtils';

interface GameBoardProps {
  board: string[][];
  currentPiece: Tetromino | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, currentPiece }) => {
  const renderBoard = () => {
    const boardCopy = board.map(row => [...row]);
    
    // Add ghost piece
    if (currentPiece) {
      const ghostPos = getGhostPosition(board, currentPiece);
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = ghostPos.y + y;
            const boardX = ghostPos.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              if (!boardCopy[boardY][boardX]) {
                boardCopy[boardY][boardX] = COLORS.GHOST;
              }
            }
          }
        }
      }

      // Add current piece
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              boardCopy[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return boardCopy.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`border border-gray-700 transition-all duration-75 ${
              cell === COLORS.GHOST ? 'bg-white bg-opacity-20' : ''
            }`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: cell && cell !== COLORS.GHOST ? cell : 'rgba(0, 0, 0, 0.8)',
              boxShadow: cell && cell !== COLORS.GHOST ? `0 0 10px ${cell}40` : 'none',
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="relative">
      <div 
        className="border-2 border-gray-600 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg p-2"
        style={{
          width: BOARD_WIDTH * CELL_SIZE + 16,
          height: BOARD_HEIGHT * CELL_SIZE + 16,
        }}
      >
        {renderBoard()}
      </div>
    </div>
  );
};