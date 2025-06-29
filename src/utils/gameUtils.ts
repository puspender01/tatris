import { Tetromino, Position } from '../types/game';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../game/constants';

export const createEmptyBoard = (): string[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''));
};

export const isValidPosition = (
  board: string[][],
  piece: Tetromino,
  offset: Position = { x: 0, y: 0 }
): boolean => {
  const newPos = {
    x: piece.position.x + offset.x,
    y: piece.position.y + offset.y,
  };

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = newPos.x + x;
        const boardY = newPos.y + y;

        if (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const rotatePiece = (shape: number[][]): number[][] => {
  const rotated = shape[0].map((_, index) =>
    shape.map(row => row[index]).reverse()
  );
  return rotated;
};

export const placePiece = (board: string[][], piece: Tetromino): string[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  return newBoard;
};

export const clearLines = (board: string[][]): { newBoard: string[][]; linesCleared: number } => {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const isFull = row.every(cell => cell !== '');
    if (isFull) linesCleared++;
    return !isFull;
  });

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(''));
  }

  return { newBoard, linesCleared };
};

export const getGhostPosition = (board: string[][], piece: Tetromino): Position => {
  let ghostY = piece.position.y;
  
  while (isValidPosition(board, { ...piece, position: { ...piece.position, y: ghostY + 1 } })) {
    ghostY++;
  }
  
  return { x: piece.position.x, y: ghostY };
};