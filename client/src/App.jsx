import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SetupScreen from "./components/SetupScreen";
import QuestionCard from "./components/QuestionCard";
import ScoreScreen from "./components/ScoreScreen";
import Timer from "./components/Timer";
import ProgressBar from "./components/ProgressBar";
import Navigation from "./components/Navigation";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(9);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  // ✅ Use Vite env variable
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const startQuiz = () => {
    if (loading) return;
    setLoading(true);

    fetch(`${API_BASE_URL}/api/questions?amount=15&difficulty=${difficulty}&category=${category}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const q = data.results.map((q) => ({
            question: decodeHtml(q.question),
            correct: decodeHtml(q.correct_answer),
            answers: shuffle([
              ...q.incorrect_answers.map((a) => decodeHtml(a)),
              decodeHtml(q.correct_answer),
            ]),
          }));
          setQuestions(q);
          setQuizStarted(true);
        } else {
          alert("No questions found for this selection.");
        }
      })
      .catch(err => {
        console.error("Error fetching questions:", err);
        alert("Server error or rate limit exceeded. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleAnswer = (ans) => {
    setAnswers(prev => ({
      ...prev,
      [index]: ans
    }));
    setSelected(ans);
    calculateScore();
  };

  const calculateScore = () => {
    let newScore = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (answer === questions[questionIndex].correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout? Your progress will be lost.");
    if (confirmLogout) {
      setIsLoggedIn(false);
      setUserName("");
      restartQuiz(true);
    }
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
      setSelected(answers[index + 1] || null);
    } else {
      if (markedForReview.size > 0) {
        const confirm = window.confirm(
          `You have ${markedForReview.size} question(s) marked for review. Do you want to finish anyway?`
        );
        if (!confirm) return;
      }
      setShowScore(true);
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelected(answers[index - 1] || null);
    }
  };

  const restartQuiz = (showLogin = false) => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswers({});
    setShowScore(false);
    setQuizStarted(false);
    setQuestions([]);
    if (showLogin) {
      setIsLoggedIn(false);
      setUserName("");
    }
    setMarkedForReview(new Set());
  };

  const handleTimeUp = () => setShowScore(true);

  // ---- Header Component ----
  const Header = () => (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
      <h1 className="text-xl font-bold text-blue-600">Quiz App</h1>
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {userName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  const renderQuiz = () => {
    const q = questions[index];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
          <h2 className="text-xl font-bold mb-2">
            Question {index + 1} of {questions.length}
          </h2>
          <Navigation 
            total={questions.length}
            current={index}
            answers={answers}
            markedForReview={markedForReview}
            onNavigate={(idx) => setIndex(idx)}
          />
          <ProgressBar current={index} total={questions.length} />
          <Timer onTimeUp={handleTimeUp} resetTrigger={index} />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={q.question}
                answers={q.answers}
                correct={q.correct}
                selected={answers[index] || selected}
                handleAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={prevQuestion}
              disabled={index === 0}
              className={`px-4 py-2 rounded transition-all ${
                index === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={toggleMarkForReview}
              className={`px-4 py-2 rounded transition-all ${
                markedForReview.has(index)
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {markedForReview.has(index) ? 'Marked for Review' : 'Mark for Review'}
            </button>
            <button
              onClick={nextQuestion}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              {index === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SetupScreen
              startQuiz={startQuiz}
              setDifficulty={setDifficulty}
              setCategory={setCategory}
              loading={loading}
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          </motion.div>
        ) : loading ? (
          <motion.div 
            key="loading"
            className="text-center text-xl p-8 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="loader">Loading questions...</div>
          </motion.div>
        ) : questions.length === 0 ? (
          <motion.div 
            key="error"
            className="text-center text-xl p-8 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Failed to load questions. Please try again.
            <button
              onClick={() => restartQuiz(false)}
              className="block mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Go Back
            </button>
          </motion.div>
        ) : showScore ? (
          <motion.div
            key="score"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ScoreScreen
              score={score}
              total={questions.length}
              restartQuiz={restartQuiz}
              questions={questions}
              answers={answers}
            />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderQuiz()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
