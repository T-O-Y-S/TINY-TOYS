import { useCallback, useRef } from 'react';
import axios from 'axios';
import { Message } from '../types';

const useMessageHandler = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  createMessageId: () => string
) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelPreviousRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(async (input: string) => {
    try {
      // Cancel any existing request before starting a new one
      cancelPreviousRequest();

      // Don't process empty messages
      if (!input.trim()) return;

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      // Set loading state
      setIsLoading(true);

      // Create message object
      const messageId = createMessageId();
      const newMessage: Message = {
        id: messageId,
        content: input,
        role: 'user'
      };

      // Update messages immediately with user input
      setMessages(prev => [...prev, newMessage]);

      // Make API request
      const response = await axios.post(
        '/api/chat',
        { message: input },
        {
          signal: abortControllerRef.current.signal,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Add AI response to messages
      const aiResponse: Message = {
        id: createMessageId(),
        content: response.data.message,
        role: 'assistant'
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Only handle error if it's not an abort error
      if (!axios.isCancel(error)) {
        console.error('Error sending message:', error);
        // Add error message to chat
        setMessages(prev => [
          ...prev,
          {
            id: createMessageId(),
            content: 'Sorry, there was an error processing your message.',
            role: 'system'
          }
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [setMessages, setIsLoading, createMessageId, cancelPreviousRequest]);

  return { sendMessage, cancelPreviousRequest };
};

export default useMessageHandler;
