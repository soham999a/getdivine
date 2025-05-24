import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  onClick,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus:ring-secondary-300',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
    outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 }
  };
  
  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button 
      className={classes} 
      onClick={onClick} 
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}
