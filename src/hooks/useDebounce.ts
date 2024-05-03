import {useRef} from 'react';

// The minimum interval between button clicks in ms
const BUTTON_BOUNCE_RATE = 1000;

/**
 * Custom hook to prevent excessive clicks on a Button
 * @returns { debounce:()=> Promise<void> }
 */
export const useDebounce = (): {debounce: () => Promise<void>} => {
  const busy = useRef(false);

  /**
   * Calls the callback function based on busy reference
   * @param callback - Function representing originally desired action called when the button is not busy
   */
  const debounce = async (callback?: () => void): Promise<void> => {
    // Test if the button was not clicked in a time less than BUTTON_BOUNCE_RATE
    if (!busy.current) {
      setTimeout(() => {
        busy.current = false;
      }, BUTTON_BOUNCE_RATE);
      busy.current = true;
      // Execute passed callback to perform desired action
      callback?.();
    }
  };

  return {debounce};
};
