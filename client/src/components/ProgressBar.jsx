import React from "react";

export default function ProgressBar({ current, total }) {
  const percentage = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
