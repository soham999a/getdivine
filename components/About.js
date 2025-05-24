import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const values = [
  {
    title: 'Innovation',
    description: 'We stay ahead of the curve with cutting-edge design and technology.',
    icon: '💡',
  },
  {
    title: 'Quality',
    description: 'We never compromise on quality, delivering excellence in every project.',
    icon: '✨',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients to bring their vision to life.',
    icon: '🤝',
  },
];

const About = () => {
  return (
    <SectionWrapper className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              About Devine Studio
            </h2>
            <p className="text-lg text-gray-600">
              We're a team of passionate designers, developers, and writers dedicated to creating
              exceptional digital experiences. With years of industry experience, we help
              businesses establish a strong online presence and achieve their goals.
            </p>
            <p className="text-lg text-gray-600">
              Our approach combines creative design, strategic thinking, and technical expertise
              to deliver solutions that not only look great but also drive real business results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About; 