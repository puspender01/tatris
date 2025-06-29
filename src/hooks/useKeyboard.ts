import { useEffect, useCallback } from 'react';

interface KeyboardCallbacks {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
  onHold: () => void;
  onPause: () => void;
}

export const useKeyboard = (callbacks: KeyboardCallbacks, isGameActive: boolean) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isGameActive) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        callbacks.onMoveLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        callbacks.onMoveRight();
        break;
      case 'ArrowUp':
        event.preventDefault();
        callbacks.onRotate();
        break;
      case 'ArrowDown':
        event.preventDefault();
        callbacks.onSoftDrop();
        break;
      case ' ':
        event.preventDefault();
        callbacks.onHardDrop();
        break;
      case 'c':
      case 'C':
        event.preventDefault();
        callbacks.onHold();
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        callbacks.onPause();
        break;
    }
  }, [callbacks, isGameActive]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};