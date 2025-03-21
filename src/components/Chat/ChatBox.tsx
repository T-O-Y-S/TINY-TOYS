import { memo } from 'react';
import ChatMessage from './ChatMessage';
import { ChatBoxProps } from '../../types';

const ChatBox = memo(({ messages }: ChatBoxProps) => (
  <div className="chat-box">
    {messages.map((msg) => (
      <ChatMessage key={msg.id} msg={msg} />
    ))}
  </div>
));

export default ChatBox;
