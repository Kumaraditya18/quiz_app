import React from "react";

export default function QuestionCard({ question, answers, selected, handleAnswer }) {
  return (
    <div>
      <p className="text-lg mb-4">{question}</p>
      <div className="space-y-3">
        {answers.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(ans)}
            className={`w-full py-2 px-4 rounded-lg border transition 
              ${selected === ans 
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-200"}
            `}
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
}