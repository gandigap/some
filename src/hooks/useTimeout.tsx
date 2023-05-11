import { useRef } from 'react';

type userTimeoutProps = (cb: () => void, ms: number) => void;

const useTimeout = () => {
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const userTimeout: userTimeoutProps = (cb, ms) => {
    timerId.current = setTimeout(() => {
      cb();
      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = null;
    }, ms);
  };

  return userTimeout;
};

export { useTimeout };
