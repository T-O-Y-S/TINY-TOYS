// src/types/index.ts
export interface Message {
  text: string;
  isUser: boolean;
  id: string;
}

export interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
}

export interface ChatBoxProps {
  messages: Message[];
}

export interface ChatMessageProps {
  msg: Message;
}
