import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-darkTheme-background dark:via-darkTheme-background dark:to-darkTheme-background" />
      
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-darkTheme-text mb-6"
        >
          <span className="block">Websites that Sell.</span>
          <span className="block mt-2">Brands that Scale.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 dark:text-darkTheme-muted mb-8 max-w-2xl mx-auto"
        >
          Transform your digital presence with our expert web design and copywriting services.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-darkTheme-primary text-white rounded-lg font-medium shadow-lg hover:bg-darkTheme-primary/90 transition-colors"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white dark:bg-darkTheme-border text-darkTheme-primary rounded-lg font-medium shadow-lg hover:bg-gray-50 dark:hover:bg-darkTheme-border/80 transition-colors border border-darkTheme-primary"
            >
              Our Services
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
