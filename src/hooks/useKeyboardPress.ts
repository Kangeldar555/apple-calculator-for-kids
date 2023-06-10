import { useCallback, useEffect } from 'react';

const operators = '−+×÷';

// Objeto de operadores(key) con su remplazo(value)
const keyReplacements: { [key: string]: string } = {
    '-': operators[0],
    '*': operators[2],
    '/': operators[3],
    'Backspace': 'C',
    'Enter': '='
    };

const useKeyboard = (handleKeyInput: (input: string) => void) => {

  const handleKeyboardInput = useCallback((event: KeyboardEvent) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', 'Backspace', 'Enter', 'Delete'];
    const { key } = event;

    if (allowedKeys.includes(key)) {
      if (key === 'Enter') event.preventDefault();
      handleKeyInput(keyReplacements[key] || key);
    }
  },[handleKeyInput])  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyboardInput]);
};

export default useKeyboard;