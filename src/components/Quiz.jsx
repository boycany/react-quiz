import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  console.log("userAnswers :>> ", userAnswers);

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
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // computed value to shuffle the answers for the current question
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );
  //   console.log("shuffledAnswers :>> ", shuffledAnswers);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex} // key to reset timer when switching to a new question
          timeout={5000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
