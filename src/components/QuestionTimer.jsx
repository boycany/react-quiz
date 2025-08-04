import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("Setting up Timeout");
    const timeoutId = setTimeout(() => {
      console.log("timeout reached");
      onTimeout();
    }, timeout);

    return () => {
      console.log("Clearing Timeout");
      clearTimeout(timeoutId);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("Setting up Interval");
    const intervalId = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => {
      console.log("Clearing Interval");
      clearInterval(intervalId);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
