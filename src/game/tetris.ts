import { GameState, Tetromino, Position } from '../types/game';
import { getRandomTetromino } from './pieces';
import { 
  createEmptyBoard, 
  isValidPosition, 
  rotatePiece, 
  placePiece, 
  clearLines 
} from '../utils/gameUtils';
import { 
  BOARD_WIDTH, 
  INITIAL_DROP_TIME, 
  LEVEL_SPEED_MULTIPLIER, 
  LINES_PER_LEVEL, 
  POINTS 
} from './constants';

export const createInitialGameState = (): GameState => {
  const board = createEmptyBoard();
  const nextPiece = createTetromino(getRandomTetromino());
  
  return {
    board,
    currentPiece: createTetromino(getRandomTetromino()),
    nextPiece,
    heldPiece: null,
    canHold: true,
    score: 0,
    lines: 0,
    level: 1,
    isGameOver: false,
    isPaused: false,
    dropTime: INITIAL_DROP_TIME,
    lastDrop: Date.now(),
  };
};

export const createTetromino = (template: any): Tetromino => ({
  ...template,
  position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
});

export const movePiece = (state: GameState, offset: Position): GameState => {
  if (!state.currentPiece || state.isGameOver || state.isPaused) return state;

  if (isValidPosition(state.board, state.currentPiece, offset)) {
    return {
      ...state,
      currentPiece: {
        ...state.currentPiece,
        position: {
          x: state.currentPiece.position.x + offset.x,
          y: state.currentPiece.position.y + offset.y,
        },
      },
    };
  }

  return state;
};

export const rotatePieceInGame = (state: GameState): GameState => {
  if (!state.currentPiece || state.isGameOver || state.isPaused) return state;

  const rotatedShape = rotatePiece(state.currentPiece.shape);
  const rotatedPiece = { ...state.currentPiece, shape: rotatedShape };

  if (isValidPosition(state.board, rotatedPiece)) {
    return {
      ...state,
      currentPiece: rotatedPiece,
    };
  }

  return state;
};

export const dropPiece = (state: GameState, isHardDrop: boolean = false): GameState => {
  if (!state.currentPiece || state.isGameOver || state.isPaused) return state;

  let newState = { ...state };
  let dropDistance = 0;

  if (isHardDrop) {
    while (isValidPosition(newState.board, newState.currentPiece!, { x: 0, y: 1 })) {
      newState = movePiece(newState, { x: 0, y: 1 });
      dropDistance++;
    }
    newState.score += dropDistance * POINTS.HARD_DROP;
  } else {
    if (isValidPosition(state.board, state.currentPiece, { x: 0, y: 1 })) {
      newState = movePiece(state, { x: 0, y: 1 });
      newState.score += POINTS.SOFT_DROP;
    }
  }

  // Check if piece should be placed
  if (!isValidPosition(newState.board, newState.currentPiece!, { x: 0, y: 1 })) {
    return placePieceAndSpawnNext(newState);
  }

  return newState;
};

export const placePieceAndSpawnNext = (state: GameState): GameState => {
  if (!state.currentPiece) return state;

  // Place the piece on the board
  const newBoard = placePiece(state.board, state.currentPiece);
  
  // Clear completed lines
  const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
  
  // Calculate score
  let lineScore = 0;
  switch (linesCleared) {
    case 1: lineScore = POINTS.SINGLE; break;
    case 2: lineScore = POINTS.DOUBLE; break;
    case 3: lineScore = POINTS.TRIPLE; break;
    case 4: lineScore = POINTS.TETRIS; break;
  }
  
  const newLines = state.lines + linesCleared;
  const newLevel = Math.floor(newLines / LINES_PER_LEVEL) + 1;
  const newScore = state.score + lineScore * newLevel;
  
  // Spawn next piece
  const newCurrentPiece = state.nextPiece ? 
    { ...state.nextPiece, position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 } } : 
    createTetromino(getRandomTetromino());
  
  const newNextPiece = createTetromino(getRandomTetromino());
  
  // Check for game over
  const isGameOver = !isValidPosition(clearedBoard, newCurrentPiece);
  
  return {
    ...state,
    board: clearedBoard,
    currentPiece: isGameOver ? null : newCurrentPiece,
    nextPiece: newNextPiece,
    canHold: true,
    score: newScore,
    lines: newLines,
    level: newLevel,
    isGameOver,
    dropTime: INITIAL_DROP_TIME * Math.pow(LEVEL_SPEED_MULTIPLIER, newLevel - 1),
  };
};

export const holdPiece = (state: GameState): GameState => {
  if (!state.currentPiece || !state.canHold || state.isGameOver || state.isPaused) {
    return state;
  }

  const pieceToHold = {
    ...state.currentPiece,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
  };

  let newCurrentPiece: Tetromino;
  
  if (state.heldPiece) {
    newCurrentPiece = {
      ...state.heldPiece,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    };
  } else {
    newCurrentPiece = state.nextPiece ? 
      { ...state.nextPiece, position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 } } :
      createTetromino(getRandomTetromino());
  }

  const newNextPiece = state.heldPiece ? state.nextPiece : createTetromino(getRandomTetromino());

  return {
    ...state,
    currentPiece: newCurrentPiece,
    nextPiece: newNextPiece,
    heldPiece: pieceToHold,
    canHold: false,
  };
};

export const pauseGame = (state: GameState): GameState => ({
  ...state,
  isPaused: !state.isPaused,
});

export const resetGame = (): GameState => createInitialGameState();