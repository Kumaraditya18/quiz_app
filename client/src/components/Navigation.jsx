import React from 'react';

export default function Navigation({ total, current, answers, markedForReview, onNavigate }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {[...Array(total)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onNavigate(idx)}
          className={`w-10 h-10 rounded-full flex items-center justify-center
            ${current === idx
              ? 'bg-blue-500 text-white'
              : markedForReview.has(idx)
              ? 'bg-yellow-500 text-white'
              : answers[idx]
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
            }
          `}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}