import React, { useEffect, useState } from "react";

export default function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="text-sm text-gray-500 mb-2">
      Time left: {minutes}m {seconds}s
    </p>
  );
}