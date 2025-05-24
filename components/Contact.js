import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-darkTheme-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-darkTheme-text mb-6">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-darkTheme-muted max-w-3xl mx-auto mb-12 md:mb-16">
            Get in touch with us to discuss your project.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-darkTheme-text mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-darkTheme-border rounded-md shadow-sm focus:ring-darkTheme-primary focus:border-darkTheme-primary dark:bg-darkTheme-background dark:text-darkTheme-text"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-darkTheme-text mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-darkTheme-border rounded-md shadow-sm focus:ring-darkTheme-primary focus:border-darkTheme-primary dark:bg-darkTheme-background dark:text-darkTheme-text"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-darkTheme-text mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-darkTheme-border rounded-md shadow-sm focus:ring-darkTheme-primary focus:border-darkTheme-primary dark:bg-darkTheme-background dark:text-darkTheme-text"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-8 py-3 bg-darkTheme-primary text-white rounded-lg font-medium shadow-lg hover:bg-darkTheme-primary/90 transition-colors"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact; 