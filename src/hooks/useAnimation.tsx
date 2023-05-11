import { useState } from 'react';
import { useTimeout } from './useTimeout';

const useAnimation = () => {
  const [isAnimated, setAnimate] = useState(false);
  const userTimeout = useTimeout();

  const onAnimate = () => {
    if (isAnimated) return;
    setAnimate((state) => !state);
    userTimeout(() => setAnimate((state) => !state), 1000);
  };

  return { isAnimated, onAnimate };
};

export { useAnimation };
