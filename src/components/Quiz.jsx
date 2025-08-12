import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  //   console.log("userAnswers :>> ", userAnswers);

  // activeQuestionIndex is the index of the currently active question
  // It is related to the userAnswers array
  // If userAnswers has 0 elements, activeQuestionIndex will be 0,
  // meaning the first question is active
  // So we could set this variable as a computed value
  const activeQuestionIndex = userAnswers.length;
  //   console.log("activeQuestionIndex :>> ", activeQuestionIndex);

  const quizIsComplete = activeQuestionIndex >= QUESTIONS.length;
  //   console.log("quizIsComplete :>> ", quizIsComplete);

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // set key to re-render Question component when activeQuestionIndex changes
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
