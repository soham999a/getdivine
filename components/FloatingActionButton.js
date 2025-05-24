import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
// Removed Chatbot import completely as it's no longer used here

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🎯', label: 'Services', path: '/services' },
    { icon: '👥', label: 'About', path: '/about' },
    { icon: '📞', label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-row items-end gap-4">
      {/* Floating Menu */}
      <div>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2 space-y-2"
            >
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    router.push(item.path);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 