import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const services = [
  {
    title: 'Web Design',
    description: 'Beautiful, responsive websites that convert visitors into customers.',
    icon: '🎨',
  },
  {
    title: 'Copywriting',
    description: 'Compelling content that tells your story and drives engagement.',
    icon: '✍️',
  },
  {
    title: 'Brand Strategy',
    description: 'Strategic brand positioning that sets you apart from competitors.',
    icon: '🎯',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your search rankings and attract more organic traffic.',
    icon: '📈',
  },
];

const Services = () => {
  return (
    <SectionWrapper className="bg-gray-50 dark:bg-darkTheme-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-darkTheme-text mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-darkTheme-muted max-w-2xl mx-auto"
          >
            We offer comprehensive digital solutions to help your business thrive online.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-darkTheme-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-darkTheme-text mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-darkTheme-muted">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services; 