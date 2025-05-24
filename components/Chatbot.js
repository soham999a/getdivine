import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessageContent = inputMessage.trim();
    const newUserMessage = { type: 'user', content: userMessageContent };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setError(null);
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessageContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { type: 'bot', content: data.reply }]);

    } catch (error) {
      console.error("Error sending message:", error);
      setError("Could not send message. Please try again.");
      setMessages(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble responding right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const chatWindowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="fixed bottom-16 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Chat Header */}
            <div className="bg-indigo-600 text-white p-4 flex-shrink-0">
              <h3 className="font-semibold">Chat with us</h3>
              <p className="text-sm text-indigo-100">We're here to help!</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 text-gray-700 italic">
                    Typing...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex-shrink-0">
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
} 