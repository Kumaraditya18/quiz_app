import React from "react";
import { motion } from "framer-motion";

export default function ScoreScreen({ score, total, restartQuiz, questions, answers }) {
  const calculatePercentage = () => (score / total) * 100;
  const percentage = calculatePercentage();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const resultCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1
      }
    })
  };

  return (
    <motion.div 
      className="p-8 max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center mb-8 mt-15 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <div className="flex justify-center items-center gap-8">
          <div>
            <p className="text-2xl">
              Score: <span className="text-blue-600 font-bold">{score}/{total}</span>
            </p>
          </div>
          <div>
            <p className="text-2xl">
              Percentage: <span className={`font-bold ${
                percentage >= 70 ? 'text-green-600' : 
                percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {percentage.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="text-2xl font-semibold mb-6">Detailed Review</h3>
        {questions.map((q, idx) => (
          <motion.div 
            key={idx}
            variants={resultCardVariants}
            custom={idx}
            initial="hidden"
            animate="visible"
            className={`p-6 rounded-lg shadow-md ${
              answers[idx] === q.correct 
                ? 'bg-green-50 border-l-4 border-green-500'
                : 'bg-red-50 border-l-4 border-red-500'
            }`}
          >
            <p className="font-medium mb-3 text-lg">
              Question {idx + 1}: {q.question}
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                Your answer: <span className={`font-medium ${
                  answers[idx] === q.correct ? 'text-green-600' : 'text-red-600'
                }`}>
                  {answers[idx] || 'Not answered'}
                </span>
              </p>
              <p className="text-gray-700">
                Correct answer: <span className="font-medium text-green-600">
                  {q.correct}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => restartQuiz(false)}
          className="px-8 py-4 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 
                    transition-all transform hover:scale-105 shadow-lg"
        >
          Start New Quiz
        </button>
      </motion.div>
    </motion.div>
  );
}