import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    name: 'Startup',
    price: '$100',
    frequency: '/month',
    description: 'Ideal for new businesses looking to establish an online presence quickly.',
    features: [
      'AI-powered website generation',
      'Basic customization options',
      'Mobile-responsive design',
      'Standard hosting',
      'Email support'
    ],
    buttonText: 'Get Started'
  },
  {
    name: 'Growth',
    price: '$500',
    frequency: '/month',
    description: 'Perfect for growing businesses needing more features and control.',
    features: [
      'All Startup features',
      'Advanced AI customization',
      'Integrated e-commerce basic',
      'Premium hosting',
      'Priority email support',
      'Monthly AI content generation (limited)'
    ],
    buttonText: 'Choose Plan'
  },
  {
    name: 'Enterprise',
    price: '$1000',
    frequency: '/month',
    description: 'For large businesses requiring comprehensive AI features and dedicated support.',
    features: [
      'All Growth features',
      'Fully custom AI models',
      'Advanced e-commerce capabilities',
      'Scalable hosting',
      '24/7 Dedicated support',
      'Unlimited AI content generation',
      'AI-driven analytics and optimization'
    ],
    buttonText: 'Contact Sales'
  }
];

export default function AiWebsiteBuilderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="pt-20 container mx-auto px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">AI Website Builder</h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leverage the power of AI to create stunning, high-performing websites in minutes.
          </p>
        </motion.div>

        {/* Pricing Section */}
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              Pricing Plans
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 flex flex-col"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{tier.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-5xl font-bold text-indigo-600">{tier.price}</span>
                    <span className="text-xl text-gray-600 dark:text-gray-300">{tier.frequency}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow text-center">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700 dark:text-gray-400">
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-auto w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300">
                    {tier.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section (Optional) */}
        <section className="py-12 sm:py-16">
           <div className="max-w-3xl mx-auto text-center text-gray-700 dark:text-gray-400">
             <h2 className="text-2xl font-bold mb-4">How it Works</h2>
             <p className="mb-4">Our AI Website Builder uses advanced algorithms to understand your needs and generate a tailored website design and content. You can then customize it further with our intuitive tools.</p>
             <h2 className="text-2xl font-bold mb-4">What's Included?</h2>
             <p>All plans include secure hosting, mobile responsiveness, and access to our AI tools. Higher tiers offer more advanced customization, e-commerce features, and dedicated support.</p>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
} 