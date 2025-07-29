import React, { useState } from "react";

export default function SetupScreen({ 
  startQuiz, 
  setDifficulty, 
  setCategory, 
  loading,
  setIsLoggedIn,
  setUserName,
  handleLogout,
  isLoggedIn 
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setError("");
  };

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-center pt-20">
        <h2 className="text-xl font-bold mb-4">Login to Start Quiz</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3 items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-64 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 w-64"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 text-center pt-20">
      <h2 className="text-xl font-bold mb-4">Setup Quiz</h2>
      <div className="flex flex-col gap-3 items-center">
        <select 
          onChange={(e) => setDifficulty(e.target.value)} 
          className="border p-2 w-64 rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select 
          onChange={(e) => setCategory(e.target.value)} 
          className="border p-2 w-64 rounded"
        >
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={startQuiz}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            } w-32`}
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 w-32"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}