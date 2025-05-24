import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: '你好', lang: 'Chinese' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'Guten Tag', lang: 'German' },
  { text: 'Привет', lang: 'Russian' },
  { text: 'Olá', lang: 'Portuguese' }
];

const Loader = ({ onLoadingComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle through greetings
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
    }, 400);

    // Hide loader after 2.5 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {greetings[currentIndex].text}
            </h1>
            <p className="text-gray-400 text-sm">
              {greetings[currentIndex].lang}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader; 