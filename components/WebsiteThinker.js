import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { 
  LightBulbIcon, 
  ClockIcon, 
  CodeBracketIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/solid'; // Import solid icons

const demoDescriptions = [
  "A simple blog website for sharing articles and photos. Needs categories, tags, and a contact form. Users should be able to comment.",
  "An e-commerce platform for selling handmade jewelry. Requires user accounts, product listings with variations, a shopping cart, secure payment gateway integration (like Razorpay), and an admin panel to manage orders and inventory.",
  "A portfolio website for a freelance graphic designer. Should showcase past projects, have an about section, a contact form, and be visually appealing with smooth animations.",
  "A community forum where users can create topics, post replies, and have user profiles. Needs moderation features for administrators."
];

export default function WebsiteThinker() {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const res = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to analyze website');
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!analysis) return;
    // Format the analysis for copying, especially the techStack array or object
    const formattedAnalysis = {
      timeEstimate: analysis.timeEstimate,
      techStack: Array.isArray(analysis.techStack) 
        ? analysis.techStack.join(', ') 
        : typeof analysis.techStack === 'object' 
          ? JSON.stringify(analysis.techStack, null, 2) 
          : analysis.techStack,
      costEstimate: analysis.costEstimate,
    };
    navigator.clipboard.writeText(JSON.stringify(formattedAnalysis, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDemoClick = (demoText) => {
    setDescription(demoText);
    handleAnalyze();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mt-10 mb-10 border border-primary-100 relative"
    >
      <h2 className="text-3xl font-heading font-bold mb-4 text-primary-700 text-center">Website Thinker</h2>
      <p className="text-gray-600 dark:text-darkTheme-muted mb-6 text-center">
        Describe your website idea and get instant estimates for development time, technology stack, and cost in Indian Rupees.
        {/* You could add a line here about a discount, e.g., "Early bird discount available for a limited time!" */}
      </p>

      <div className="flex flex-col gap-6">
        {/* Input Area */}
        <div className="relative">
          <LightBulbIcon className="absolute top-3 left-3 h-6 w-6 text-primary-500" />
          <textarea
            className="w-full min-h-[120px] rounded-lg border border-primary-200 p-3 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-primary-300 resize-y"
            placeholder="Describe your website idea in detail..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Demo descriptions */}
        <div className="text-sm text-gray-700 dark:text-darkTheme-muted space-y-2">
          <p className="font-semibold">Try one of these examples:</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 flex-wrap">
            {demoDescriptions.map((demo, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoClick(demo)}
                className="text-primary-600 hover:underline cursor-pointer text-left bg-primary-50/50 px-3 py-1 rounded-md border border-primary-100 text-sm"
              >
                {demo.substring(0, 50)}... 
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading || !description.trim()}
          onClick={handleAnalyze}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-6 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Analyzing...
            </span>
          ) : 'Analyze Website'}
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100"
        >
          <p className="font-semibold mb-2">Analysis Error:</p>
          <p>{error}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 space-y-4 p-6 bg-gray-50/50 rounded-lg border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Analysis Results</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="bg-white/90 rounded-full p-2 shadow hover:bg-primary-100 transition-colors"
                aria-label="Copy results"
              >
                {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <ClipboardIcon className="h-5 w-5 text-primary-500" />}
              </motion.button>
            </div>

            <div className="space-y-4">
              {/* Development Time */}
              <div className="flex items-start gap-3">
                <ClockIcon className="h-6 w-6 text-primary-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Development Time</h4>
                  <p className="text-gray-900">{analysis.timeEstimate}</p>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="flex items-start gap-3">
                <CodeBracketIcon className="h-6 w-6 text-primary-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Technology Stack</h4>
                  {/* Render techStack as a list if array, stringify if object, or render directly */}
                  {Array.isArray(analysis.techStack) ? (
                    <ul className="list-disc list-inside text-gray-900 ml-2 space-y-1">
                      {analysis.techStack.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : typeof analysis.techStack === 'object' ? (
                    <pre className="text-gray-900 whitespace-pre-wrap bg-gray-100 p-3 rounded-md text-sm">{JSON.stringify(analysis.techStack, null, 2)}</pre>
                  ) : (
                    <p className="text-gray-900">{analysis.techStack}</p>
                  )}
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="flex items-start gap-3">
                 <CurrencyDollarIcon className="h-6 w-6 text-primary-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Estimated Cost</h4>
                  <p className="text-gray-900">₹{analysis.costEstimate.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 