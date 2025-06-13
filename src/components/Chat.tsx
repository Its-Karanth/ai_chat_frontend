import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../services/chatService';
import { chatService } from '../services/chatService';

interface ExtendedChatMessage extends ChatMessage {
  id: string;
  replyTo?: {
    id: string;
    content: string;
  };
}

interface ChatProps {
  isDarkTheme: boolean;
}

export const Chat = ({ isDarkTheme }: ChatProps) => {
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ExtendedChatMessage | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await chatService.getHistory();
        if (history && history.length > 0) {
          const extendedHistory: ExtendedChatMessage[] = history.map((msg: ChatMessage) => ({
            ...msg,
            id: generateId()
          }));
          setMessages(extendedHistory);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };
    
    loadChatHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  // Handle scroll events to detect when user manually scrolls up
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Check if user is near the bottom (within 100px)
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      // Only update autoScroll if we're changing from true to false or vice versa
      if (autoScroll !== isAtBottom) {
        setAutoScroll(isAtBottom);
      }
      
      // Always show the scroll button when not at bottom
      setShowScrollButton(!isAtBottom && messages.length > 0);
    };

    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [messages.length, autoScroll]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageId = generateId();
    const userMessage: ExtendedChatMessage = {
      id: messageId,
      role: 'user',
      content: input.trim(),
      ...(replyingTo ? { replyTo: { id: replyingTo.id, content: replyingTo.content } } : {})
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setReplyingTo(null);
    setIsLoading(true);
    setAutoScroll(true);

    try {
      const response = await chatService.sendMessage(userMessage.content);
      const assistantMessage: ExtendedChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await chatService.clearHistory();
      setMessages([]);
      setReplyingTo(null);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const handleReply = (message: ExtendedChatMessage) => {
    setReplyingTo(message);
    // Focus the input field
    document.querySelector('input')?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const scrollToNewMessages = () => {
    setAutoScroll(true);
    scrollToBottom();
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Chat messages container */}
      <div 
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto mb-4 p-6 ${isDarkTheme ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'} backdrop-blur-sm rounded-lg shadow-md text-center relative chat-container`}
        style={{ maxHeight: 'calc(100vh - 250px)', height: 'auto', overflowY: 'scroll' }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${isDarkTheme ? 'text-blue-400' : 'text-blue-500'} opacity-50`}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm5.625 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-4.875 1.5h4.5m-8.25-3A5.25 5.25 0 0112 4.75a5.25 5.25 0 015.25 5.25v.75h.75a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h.75v-.75z" />
                </svg>
              </div>
              <p className={`text-xl font-medium mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Welcome to Mental Wellness Chat</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Share your thoughts and feelings in a safe, supportive space.</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col items-center">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } mb-4 w-full message-container relative`}
            >
              <div
                className={`message-bubble ${message.role === 'user' ? 'user' : 'bot'} ${message.replyTo ? 'reply' : ''}`}
              >
                {message.replyTo && (
                  <div className="reply-to">
                    <p className="truncate">{message.replyTo.content}</p>
                  </div>
                )}
                <div className="text-left">{message.content}</div>
                
                {/* Reply button */}
                <div className="message-actions absolute -bottom-6 right-0">
                  <button 
                    onClick={() => handleReply(message)}
                    className={`${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:opacity-80 rounded-full p-1`}
                    title="Reply"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className={`${isDarkTheme ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'} rounded-2xl rounded-tl-none px-5 py-3 shadow-md`}>
                <div className="flex space-x-2">
                  <div className={`w-2 h-2 ${isDarkTheme ? 'bg-blue-400' : 'bg-blue-400'} rounded-full animate-bounce`} />
                  <div className={`w-2 h-2 ${isDarkTheme ? 'bg-blue-400' : 'bg-blue-400'} rounded-full animate-bounce delay-100`} />
                  <div className={`w-2 h-2 ${isDarkTheme ? 'bg-blue-400' : 'bg-blue-400'} rounded-full animate-bounce delay-200`} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      <div className={`scroll-to-bottom ${showScrollButton ? 'visible' : ''}`} onClick={scrollToNewMessages}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Message input form */}
      <form onSubmit={handleSubmit} className={`flex flex-col gap-3 p-4 ${isDarkTheme ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'} backdrop-blur-sm rounded-lg shadow-md w-full`}>
        {/* Reply preview */}
        {replyingTo && (
          <div className="reply-container flex items-center">
            <div className="flex-1 overflow-hidden">
              <p className={`text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>Replying to:</p>
              <p className="truncate text-sm">{replyingTo.content}</p>
            </div>
            <button 
              type="button" 
              onClick={cancelReply} 
              className="reply-close ml-2"
              title="Cancel reply"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 p-3 border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white/90 text-gray-800 placeholder-gray-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors shadow-md"
          >
            Send
          </button>
          <button
            type="button"
            onClick={handleClear}
            className={`px-6 py-3 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-500'} text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors shadow-md`}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}; 