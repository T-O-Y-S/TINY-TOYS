import { memo } from 'react';
import { ChatMessageProps } from '../../types';

const ChatMessage = memo(({ msg }: ChatMessageProps) => (
  <div className={msg.isUser ? 'user-message' : 'bot-message'}>
    {msg.text}
  </div>
));

export default ChatMessage;
