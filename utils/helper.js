/* eslint guard-for-in: 0 */
import { useState, useEffect } from 'react';

// Subfunction for renameAndCut function
export const cutSection = (str) => {
  const firstCapital = str.match(/[A-Z]/g)[0];
  const firstCapitalIndex = str.split('').indexOf(firstCapital);
  const withoutSection = str.split('').splice(firstCapitalIndex);
  withoutSection[0] = withoutSection[0].toLowerCase();
  return withoutSection.join('');
};

// Subfunction for renameAndCut function
export const renameProperty = (obj, key, newKey) => {
  obj[newKey] = obj[key];
  delete obj[key];
};

// Func for cut section from properties (ticketUsername -> username)
export const renameAndCut = (obj) => {
  const newObj = { ...obj };
  for (const key in newObj) {
    renameProperty(newObj, key, cutSection(key));
  }
  return newObj;
};

// Hook window size
export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
};

/**
 * @function
 * @name useDebounce
 * @description debounce
 * @param value - value for bounce
 * @param delay - time to bounce
 * @returns debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
