import { motion } from 'framer-motion';

export default function Section({ 
  children, 
  className = '', 
  id,
  bgColor = 'bg-white',
  withContainer = true,
  animate = true
}) {
  const baseClasses = 'py-16 md:py-24';
  const classes = `${baseClasses} ${bgColor} ${className}`;
  
  const containerClasses = withContainer ? 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl' : '';
  
  const content = (
    <section id={id} className={classes}>
      <div className={containerClasses}>
        {children}
      </div>
    </section>
  );
  
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
}
