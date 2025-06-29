import { useEffect, useRef } from 'react';

export const useGameLoop = (callback: () => void, isActive: boolean) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, 16); // ~60fps
    return () => clearInterval(id);
  }, [isActive]);
};