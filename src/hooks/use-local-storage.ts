import { useState } from "react";

export function useLocalStorage<T>(key: string) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  });

  // Function to update the value in localStorage
  const setValue = (value: T | ((prev: T | null) => T)) => {
    try {
      // Handle functions for updating state
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save to state
      setStoredValue(valueToStore);

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage value:", error);
    }
  };

  return [storedValue, setValue] as const;
}
