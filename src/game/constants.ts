export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 15; // Reduced from 20 to 15
export const CELL_SIZE = 30;

export const INITIAL_DROP_TIME = 1000; // milliseconds
export const LEVEL_SPEED_MULTIPLIER = 0.8;
export const LINES_PER_LEVEL = 10;

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

export const COLORS = {
  EMPTY: '',
  GHOST: 'rgba(255, 255, 255, 0.2)',
  I: '#00f5ff', // Cyan
  O: '#ffff00', // Yellow
  T: '#800080', // Purple
  S: '#00ff00', // Green
  Z: '#ff0000', // Red
  J: '#0000ff', // Blue
  L: '#ffa500', // Orange
};