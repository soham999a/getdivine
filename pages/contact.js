import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Get in Touch
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                      placeholder="Your message here..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg transition-colors ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-center"
                    >
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-center"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Information</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-xl sm:text-2xl mr-3 sm:mr-4">📍</div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Address</h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          Kolkata,West Bengal<br />
                          India
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-xl sm:text-2xl mr-3 sm:mr-4">📧</div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email</h3>
                        <p className="text-sm sm:text-base text-gray-600">dassoham345@gmail.com</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-xl sm:text-2xl mr-3 sm:mr-4">📱</div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h3>
                        <p className="text-sm sm:text-base text-gray-600">+91 7477755729</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Business Hours</h2>
                  <div className="space-y-2 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm sm:text-base text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-sm sm:text-base text-gray-600">Sunday: Closed(call only)</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Follow Us</h2>
                  <div className="flex space-x-3 sm:space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className="text-xl sm:text-2xl p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      📱
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className="text-xl sm:text-2xl p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      💼
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className="text-xl sm:text-2xl p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      📸
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
