import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false },
      ],
    },
    {
      questionText: 'Who is the CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    // Add more questions here
  ];

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (isAnswered) return; // Prevent multiple answers

    setIsAnswered(true);
    setSelectedAnswer(index);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question after a short delay
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1000); // 1 second delay
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-white">
          Test Your Knowledge
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        >
          {showScore ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You scored {score} out of {questions.length}</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartQuiz}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Restart Quiz
              </motion.button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Question {currentQuestion + 1}/{questions.length}
                </div>
                <div className="mb-8 text-lg text-gray-800 dark:text-gray-200">{questions[currentQuestion].questionText}</div>
                <div className="flex flex-col space-y-4">
                  {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                      disabled={isAnswered}
                      className={`w-full px-6 py-3 border rounded-md text-left transition-colors duration-200 ${
                        isAnswered && index === selectedAnswer
                          ? answerOption.isCorrect
                            ? 'border-green-500 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'border-red-500 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                      }`}
                    >
                      {answerOption.answerText}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveQuiz; 