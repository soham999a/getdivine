import { motion } from 'framer-motion';

const ProgressTracker = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {index + 1}
            </motion.div>
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{step}</span>
          </div>
        ))}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            className="h-full bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker; 