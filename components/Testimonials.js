import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    content: 'Devine Studio transformed our online presence. Their team delivered a website that perfectly captures our brand and has significantly increased our conversion rates.',
    rating: 5,
    image: '👩‍💼',
  },
  {
    name: 'Michael Chen',
    role: 'Founder, GrowthLabs',
    content: 'The copywriting services were exceptional. Our messaging is now clearer, more compelling, and has helped us connect better with our target audience.',
    rating: 5,
    image: '👨‍💼',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Marketing Director, InnovateCo',
    content: 'Working with Devine Studio was a game-changer for our brand. Their strategic approach and attention to detail have helped us stand out in a competitive market.',
    rating: 5,
    image: '👩‍💼',
  },
];

const Testimonials = () => {
  return (
    <SectionWrapper className="bg-gray-50 dark:bg-darkTheme-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-darkTheme-text mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 dark:text-darkTheme-muted max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-darkTheme-border rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-darkTheme-text">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-darkTheme-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-darkTheme-muted mb-4">{testimonial.content}</p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Testimonials; 