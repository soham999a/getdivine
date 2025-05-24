import { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Here you would typically integrate with your email service
      // For now, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Subscribe to Our Newsletter
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Get the latest updates and exclusive content delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          {status === 'sending' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {status === 'success' && (
          <p className="text-green-600 dark:text-green-400">Successfully subscribed!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
        )}
      </form>
    </motion.div>
  );
};

export default NewsletterSubscription; 