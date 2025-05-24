import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { generateLocalCode } from '../utils/local-api';
import { useRouter } from 'next/router';
import { downloadFile, downloadZip } from '../utils/download';

const languages = [
  { label: 'HTML', value: 'html', ext: 'html' },
  { label: 'CSS', value: 'css', ext: 'css' },
  { label: 'JavaScript', value: 'javascript', ext: 'js' },
  { label: 'React', value: 'react', ext: 'jsx' },
];

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('react');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setCode('');
    try {
      const generated = await generateLocalCode(prompt, language);
      setCode(generated);
      // Save to localStorage and redirect
      localStorage.setItem('generatedSite', JSON.stringify({ code: generated, language }));
      router.push('/generated-site');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const ext = languages.find(l => l.value === language)?.ext || 'txt';
    downloadFile(`generated-code.${ext}`, code);
  };

  const handleDownloadZip = async () => {
    const ext = languages.find(l => l.value === language)?.ext || 'txt';
    await downloadZip([
      { name: `generated-code.${ext}`, content: code },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mt-10 mb-10 border border-primary-100"
    >
      <h2 className="text-2xl font-heading font-bold mb-4 text-primary-700">AI Code Generator</h2>
      <div className="flex flex-col gap-4">
        <textarea
          className="w-full min-h-[80px] rounded-lg border border-primary-200 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-300 resize-y"
          placeholder="Describe what you want to build..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <select
            className="rounded-lg border border-primary-200 p-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-300"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {languages.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading || !prompt.trim()}
            onClick={handleGenerate}
            className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2 px-6 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating...
              </span>
            ) : 'Generate Code'}
          </motion.button>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <AnimatePresence>
          {code && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative mt-4 bg-gray-900 rounded-lg overflow-x-auto shadow-inner"
            >
              <pre className="text-sm text-white p-4 whitespace-pre overflow-x-auto font-mono">
                {code}
              </pre>
              <div className="absolute top-2 right-2 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="bg-white/90 rounded-full p-2 shadow hover:bg-primary-100 transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? <CheckIcon className="h-5 w-5 text-primary-500" /> : <ClipboardIcon className="h-5 w-5 text-primary-500" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="bg-white/90 rounded-full p-2 shadow hover:bg-primary-100 transition-colors"
                  aria-label="Download code"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 text-primary-500" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadZip}
                  className="bg-white/90 rounded-full p-2 shadow hover:bg-primary-100 transition-colors"
                  aria-label="Download zip"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 text-primary-700" />
                  <span className="sr-only">Download zip</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 