import { memo } from 'react';
import { ChatInputProps } from '../../types';

const ChatInput = memo(({
  input,
  isLoading,
  onInputChange,
  onKeyDown,
  onSend
}: ChatInputProps) => (
  <div className="input-area">
    <textarea
      className="input-field"
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Type a message..."
      disabled={isLoading}
    />
    <button 
      onClick={onSend} 
      disabled={isLoading || !input.trim()}
      aria-label={isLoading ? 'Sending message' : 'Send message'}
    >
      {isLoading ? 'Sending...' : 'Send'}
    </button>
  </div>
));

export default ChatInput;
