import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const services = [
  {
    title: 'Web Design & Development',
    description: 'We create beautiful, responsive websites that engage visitors and drive conversions.',
    features: [
      'Custom design tailored to your brand',
      'Mobile-first, responsive development',
      'Optimized for speed and performance',
      'SEO-friendly structure',
      'Content management system integration',
    ],
    icon: '🎨',
  },
  {
    title: 'Copywriting & Content Strategy',
    description: 'Compelling content that tells your story and connects with your audience.',
    features: [
      'Brand messaging and voice development',
      'Website copy and content creation',
      'Blog posts and articles',
      'Social media content',
      'Email marketing campaigns',
    ],
    icon: '✍️',
  },
  {
    title: 'Brand Strategy & Identity',
    description: 'Develop a strong brand identity that resonates with your target audience.',
    features: [
      'Brand positioning and messaging',
      'Visual identity development',
      'Brand guidelines creation',
      'Competitor analysis',
      'Target audience research',
    ],
    icon: '🎯',
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Improve your online visibility and attract more qualified leads.',
    features: [
      'Search engine optimization',
      'Content marketing strategy',
      'Social media management',
      'Email marketing campaigns',
      'Analytics and reporting',
    ],
    icon: '📈',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    // Simulate loading services data
    const loadServices = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        setToast({
          message: 'Failed to load services',
          type: 'error'
        });
      }
    };

    loadServices();
  }, []);

  const handleCardHover = (index, e) => {
    try {
      setHoveredCard(index);
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      controls.start({
        scale: 1.02,
        transition: { duration: 0.2 }
      });
    } catch (err) {
      console.error('Error in handleCardHover:', err);
      setToast({
        message: 'An error occurred while interacting with the card',
        type: 'error'
      });
    }
  };

  const handleMouseMove = (e) => {
    try {
      if (hoveredCard !== null) {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    } catch (err) {
      console.error('Error in handleMouseMove:', err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Services
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
                >
                  Our Services
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  Comprehensive digital solutions to help your business grow and succeed online.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      onHoverStart={(e) => handleCardHover(index, e)}
                      onHoverEnd={() => setHoveredCard(null)}
                      onMouseMove={handleMouseMove}
                      animate={controls}
                      className="group relative bg-white rounded-xl p-8 shadow-lg transition-all duration-300 overflow-hidden cursor-pointer perspective-1000"
                      style={{
                        transform: hoveredCard === index 
                          ? `translateY(-8px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg)`
                          : 'translateY(0) rotateX(0) rotateY(0)',
                        boxShadow: hoveredCard === index 
                          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          background: hoveredCard === index 
                            ? ['linear-gradient(to right, #EEF2FF, #F5F3FF)', 'linear-gradient(to right, #F5F3FF, #EEF2FF)']
                            : 'linear-gradient(to right, #EEF2FF, #F5F3FF)'
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <div className="relative z-10">
                        <motion.div 
                          className="text-4xl mb-4 transform"
                          variants={iconVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap={{ scale: 0.9 }}
                        >
                          {service.icon}
                        </motion.div>
                        <motion.h2 
                          className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300"
                          animate={{
                            color: hoveredCard === index ? '#4F46E5' : '#111827'
                          }}
                        >
                          {service.title}
                        </motion.h2>
                        <motion.p 
                          className="text-gray-600 mb-6"
                          animate={{
                            color: hoveredCard === index ? '#4B5563' : '#4B5563'
                          }}
                        >
                          {service.description}
                        </motion.p>
                        <ul className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              custom={featureIndex}
                              variants={featureVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300 relative"
                              whileHover={{ x: 5 }}
                              onHoverStart={() => setHoveredFeature(feature)}
                              onHoverEnd={() => setHoveredFeature(null)}
                            >
                              <motion.span 
                                className="text-indigo-600 mr-2"
                                whileHover={{ 
                                  scale: 1.2,
                                  rotate: 360,
                                  transition: { duration: 0.3 }
                                }}
                              >
                                ✓
                              </motion.span>
                              <motion.span
                                whileHover={{ 
                                  color: '#4F46E5',
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {feature}
                              </motion.span>
                              <AnimatePresence>
                                {hoveredFeature === feature && (
                                  <motion.div
                                    variants={tooltipVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="absolute left-full ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg whitespace-nowrap"
                                  >
                                    Learn more about {feature.toLowerCase()}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-6"
                >
                  Ready to Transform Your Digital Presence?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
                >
                  Let's work together to create something amazing for your business.
                </motion.p>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    backgroundColor: "#FFFFFF",
                    color: "#4F46E5"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium shadow-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
