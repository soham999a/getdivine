import { motion } from 'framer-motion';

export default function TestimonialCard({ name, quote, company }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center max-w-md mx-auto"
    >
      <p className="text-gray-700 italic mb-4">“{quote}”</p>
      <div className="font-semibold text-gray-900">{name}</div>
      <div className="text-gray-500 text-sm">{company}</div>
    </motion.div>
  );
}
