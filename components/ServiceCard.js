import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all min-w-[220px] max-w-xs mx-auto"
    >
      <div className="mb-4 text-blue-600 text-4xl">{icon}</div>
      <h3 className="font-bold text-xl mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-base">{description}</p>
    </motion.div>
  );
}
