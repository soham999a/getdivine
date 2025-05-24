import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ContentRecommendation = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer flex flex-col justify-between h-full"
  >
    <div>
      <h4 className="text-xl font-heading font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
    </div>
    <div className="mt-4 text-blue-600 dark:text-blue-400 font-semibold flex items-center">
      Read More <ArrowRightIcon className="ml-1 w-4 h-4" />
    </div>
  </motion.div>
);

const AIContentRecommendations = () => {
  // Dummy data for recommendations
  const recommendations = [
    {
      title: 'Understanding SEO Basics for Your Website',
      description: 'A comprehensive guide to the fundamentals of Search Engine Optimization and how to apply them.',
    },
    {
      title: 'Mastering Advanced Tailwind CSS Techniques',
      description: 'Take your styling skills to the next level with these advanced tips and tricks for Tailwind CSS.',
    },
    {
      title: 'Bringing Your Designs to Life with Framer Motion',
      description: 'Learn how to create stunning animations and interactive components in your React applications.',
    },
     {
      title: 'The Importance of Mobile-First Design',
      description: 'Discover why designing for mobile devices first is crucial in today\'s digital landscape.',
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-white">
          Recommended for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((item, index) => (
            <ContentRecommendation key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIContentRecommendations; 