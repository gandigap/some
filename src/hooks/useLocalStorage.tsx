import { useCallback, useEffect, useRef } from 'react';

const useLocalStorage = (name: string) => {
  const searchRef = useRef('');
  const getStorageValue = () => globalThis.localStorage.getItem(name) || '';
  const setStorageValue = useCallback(
    (value: string) => globalThis.localStorage.setItem(name, value),
    [name]
  );

  useEffect(
    () => () => {
      const { current } = searchRef;
      setStorageValue(current);
    },
    [setStorageValue]
  );

  const storageEffect = (value: string) => {
    globalThis.addEventListener('beforeunload', () => setStorageValue(value));
    searchRef.current = value;

    return () => {
      globalThis.removeEventListener('beforeunload', () => setStorageValue(value));
    };
  };

  return { getStorageValue, storageEffect };
};

export { useLocalStorage };
