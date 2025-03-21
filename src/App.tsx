import { useEffect } from 'react';
import Header from './components/Header/Header';
import ChatBox from './components/Chat/ChatBox';
import ChatInput from './components/Chat/ChatInput';
import { useChat } from './hooks/useChat';
import useMessageHandler from './hooks/useMessageHandler';

const App = () => {
  const {
    input,
    messages,
    isLoading,
    setInput,
    setMessages,
    setIsLoading,
    createMessageId,
    handleKeyPress
  } = useChat();

  const { sendMessage, cancelPreviousRequest } = useMessageHandler(
    setMessages,
    setIsLoading,
    createMessageId
  );

  useEffect(() => {
    return () => {
      cancelPreviousRequest();
    };
  }, [cancelPreviousRequest]);

  return (
    <div className="app">
      <Header />
      <ChatBox messages={messages} />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onKeyDown={handleKeyPress}
        onSend={() => sendMessage(input)}
      />
    </div>
  );
};

export default App;