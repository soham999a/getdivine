import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';

const SunIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
);
const MoonIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg dark:bg-darkTheme-background/80'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="text-2xl font-heading font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-darkTheme-primary to-darkTheme-secondary">
                Devine Studio
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    href={link.path}
                    className={`${
                      router.pathname === link.path
                        ? 'text-darkTheme-primary'
                        : isScrolled
                        ? 'text-gray-700 hover:text-darkTheme-primary dark:text-darkTheme-text dark:hover:text-darkTheme-primary'
                        : 'text-white hover:text-darkTheme-primary dark:text-darkTheme-text dark:hover:text-darkTheme-primary'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                  {router.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-darkTheme-primary to-darkTheme-secondary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              ))}
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-darkTheme-border text-darkTheme-primary dark:text-darkTheme-accent hover:bg-primary-100 dark:hover:bg-darkTheme-border/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.button>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://wa.me/917477755729"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-darkTheme-primary to-darkTheme-secondary text-white px-6 py-2 rounded-full text-sm font-medium hover:from-darkTheme-primary/90 hover:to-darkTheme-secondary/90 transition-all duration-300 inline-block"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled ? 'text-gray-700 dark:text-darkTheme-text' : 'text-white'
              } inline-flex items-center justify-center p-2 rounded-md hover:text-darkTheme-primary focus:outline-none transition-colors duration-300`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md dark:bg-darkTheme-background/95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={`${
                      router.pathname === link.path
                        ? 'text-darkTheme-primary'
                        : 'text-gray-700 hover:text-darkTheme-primary dark:text-darkTheme-text dark:hover:text-darkTheme-primary'
                    } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              {/* Theme Toggle Button (Mobile) */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="mt-2 p-2 rounded-full bg-gray-100 dark:bg-darkTheme-border text-darkTheme-primary dark:text-darkTheme-accent hover:bg-primary-100 dark:hover:bg-darkTheme-border/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://wa.me/917477755729"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 bg-gradient-to-r from-darkTheme-primary to-darkTheme-secondary text-white px-6 py-2 rounded-full text-sm font-medium hover:from-darkTheme-primary/90 hover:to-darkTheme-secondary/90 transition-all duration-300 text-center block"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
