import { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { Message } from '../types';

export const useChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createMessageId = useMemo(() => 
    () => Date.now().toString(36) + Math.random().toString(36).substr(2)
  , []);

  const debouncedSetInput = useMemo(() => {
    const debouncedFn = debounce((value: string) => setInput(value), 150);
    return (value: string) => {
      debouncedFn(value);
      return () => debouncedFn.cancel();
    };
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // handle send
    }
  }, []);

  return {
    input,
    messages,
    isLoading,
    setInput: debouncedSetInput,
    setMessages,
    setIsLoading,
    createMessageId,
    handleKeyPress
  };
};
