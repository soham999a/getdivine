import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: 'Web Design',
      description: 'We create beautiful, responsive websites that are designed to convert.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Copywriting',
      description: 'We write compelling copy that sells your products and services.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      title: 'SEO',
      description: 'We optimize your website for search engines to help you rank higher.',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-darkTheme-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-darkTheme-text mb-6">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-darkTheme-muted max-w-3xl mx-auto mb-12 md:mb-16">
            We offer a wide range of services to help you grow your business online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-darkTheme-border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-darkTheme-primary dark:text-darkTheme-accent mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-darkTheme-text mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-darkTheme-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 