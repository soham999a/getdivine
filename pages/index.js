import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';
import ParallaxHero from '../components/ParallaxHero';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import ImageGallery from '../components/ImageGallery';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';
import WebsiteThinker from '../components/WebsiteThinker';
import NewsletterSubscription from '../components/NewsletterSubscription';
import ProgressTracker from '../components/ProgressTracker';
import Chatbot from '../components/Chatbot';
import AchievementBadges from '../components/AchievementBadges';
import InteractiveQuiz from '../components/InteractiveQuiz';
import AIContentRecommendations from '../components/AIContentRecommendations';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const steps = ['Start', 'Design', 'Develop', 'Launch'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
      <div className="fixed top-4 right-4 z-50">
        <Chatbot />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>
              <ParallaxHero />
              <Services />
              <About />
              <ImageGallery />
              <Testimonials />
              <WebsiteThinker />

              {/* Add Achievement Badges Section */}
              <AchievementBadges />

              {/* Add Interactive Quiz Section */}
              <InteractiveQuiz />

              {/* Add AI Content Recommendations Section */}
              <AIContentRecommendations />

              {/* Add Progress Tracker Section */}
              <section className="py-16 bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Your Journey with Us
                  </h2>
                  <ProgressTracker steps={steps} currentStep={1} />
                </div>
              </section>

              {/* Add Newsletter Section */}
              <section className="py-16">
                <div className="container mx-auto px-4">
                  <NewsletterSubscription />
                </div>
              </section>

            </main>
            <Footer />
            <FloatingActionButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
