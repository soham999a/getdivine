import { motion } from 'framer-motion';

const AchievementBadge = ({ badge }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    className="flex flex-col items-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700"
  >
    <div className="text-5xl mb-3 text-blue-500 dark:text-blue-400">{badge.icon}</div>
    <h4 className="text-xl font-heading font-semibold mb-1 text-gray-900 dark:text-white">{badge.name}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{badge.description}</p>
  </motion.div>
);

const AchievementBadges = () => {
  const badges = [
    {
      icon: '🌟',
      name: 'First Step',
      description: 'Completed your first interaction with the website.',
    },
    {
      icon: '🏆',
      name: 'Explorer',
      description: 'Visited all the main sections of the site.',
    },
    {
      icon: '🧠',
      name: 'Knowledge Seeker',
      description: 'Successfully completed an interactive quiz.',
    },
     {
      icon: '🤝',
      name: 'Community Member',
      description: 'Engaged with other users in the forum.',
    },
     {
      icon: '🚀',
      name: 'Achiever',
      description: 'Unlocked all available badges.',
    }
    // Add more badges here
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-white">
          Your Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {badges.map((badge, index) => (
            <AchievementBadge key={index} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementBadges; 