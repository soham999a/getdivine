import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SectionWrapper = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper; 