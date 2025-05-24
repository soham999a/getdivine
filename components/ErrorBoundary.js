import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        >
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 