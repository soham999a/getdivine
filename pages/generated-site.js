import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { downloadFile, downloadZip } from '../utils/download';
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const languageExt = {
  html: 'html',
  css: 'css',
  javascript: 'js',
  react: 'jsx',
};

export default function GeneratedSite() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('generatedSite') || '{}');
    setCode(stored.code || '');
    setLanguage(stored.language || '');
  }, []);

  const handleDownload = () => {
    const ext = languageExt[language] || 'txt';
    downloadFile(`generated-code.${ext}`, code);
  };

  const handleDownloadZip = async () => {
    const ext = languageExt[language] || 'txt';
    await downloadZip([
      { name: `generated-code.${ext}`, content: code },
    ]);
  };

  const handleOpenInCodeSandbox = async () => {
    // Prepare files for CodeSandbox
    const files = {
      'package.json': {
        content: JSON.stringify({
          name: 'generated-react-app',
          main: 'index.js',
          dependencies: { react: 'latest', 'react-dom': 'latest' },
        }, null, 2),
      },
      'index.js': {
        content: code,
      },
    };
    const parameters = getCodeSandboxParameters({ files });
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://codesandbox.io/api/v1/sandboxes/define?file=/index.js';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'parameters';
    input.value = parameters;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  // Helper to encode files for CodeSandbox
  function getCodeSandboxParameters({ files }) {
    // https://codesandbox.io/docs/api/#define-api
    return btoa(
      JSON.stringify({ files })
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
    );
  }

  const renderPreview = () => {
    if (!code) return null;
    if (language === 'html' || language === 'css' || language === 'javascript') {
      // For HTML, CSS, JS, wrap in a basic HTML doc if needed
      let html = code;
      if (language === 'css') {
        html = `<style>${code}</style>`;
      } else if (language === 'javascript') {
        html = `<script>${code}</script>`;
      }
      if (!/\<html/i.test(html)) {
        html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Generated Site</title></head><body>${html}</body></html>`;
      }
      return (
        <iframe
          title="Generated Preview"
          srcDoc={html}
          className="w-full h-[70vh] rounded-xl border shadow-lg bg-white"
        />
      );
    }
    // For React, show code and CodeSandbox button
    return (
      <div className="bg-gray-900 rounded-lg p-4 text-white font-mono overflow-x-auto">
        <div className="mb-2 text-primary-300 flex flex-col sm:flex-row sm:items-center gap-2">
          Live preview for React is not supported yet. Here is your code:
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenInCodeSandbox}
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors text-sm"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            Open in CodeSandbox
          </motion.button>
        </div>
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="max-w-4xl mx-auto p-6 mt-10 mb-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-primary-100"
    >
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow hover:from-primary-600 hover:to-secondary-600 transition-all"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-heading font-bold mb-4 text-primary-700">Generated Website Preview</h2>
      {/* Download Buttons */}
      <div className="flex gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="bg-white/90 rounded-full p-2 shadow hover:bg-primary-100 transition-colors flex items-center gap-2"
          aria-label="Download code"
        >
          <ArrowDownTrayIcon className="h-5 w-5 text-primary-500" />
          <span className="hidden sm:inline">Download file</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadZip}
          className="bg-white/90 rounded-full p-2 shadow hover:bg-primary-100 transition-colors flex items-center gap-2"
          aria-label="Download zip"
        >
          <ArrowDownTrayIcon className="h-5 w-5 text-primary-700" />
          <span className="hidden sm:inline">Download zip</span>
        </motion.button>
      </div>
      {renderPreview()}
    </motion.div>
  );
} 