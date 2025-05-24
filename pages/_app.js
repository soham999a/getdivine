import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '../components/ThemeProvider';
import ScrollProgress from '../components/ScrollProgress';
import FloatingActionButton from '../components/FloatingActionButton';
import BackToTop from '../components/BackToTop';
import ThreeBackground from '../components/ThreeBackground';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <ThreeBackground />
        <div className="relative z-10">
          <ScrollProgress />
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <FloatingActionButton />
          <BackToTop />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
