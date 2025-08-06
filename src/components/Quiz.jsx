import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  //   console.log("userAnswers :>> ", userAnswers);

  // activeQuestionIndex is the index of the currently active question
  // It is related to the userAnswers array
  // If userAnswers has 0 elements, activeQuestionIndex will be 0,
  // meaning the first question is active
  // So we could set this variable as a computed value
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  //   console.log("activeQuestionIndex :>> ", activeQuestionIndex);

  const quizIsComplete = activeQuestionIndex >= QUESTIONS.length;
  //   console.log("quizIsComplete :>> ", quizIsComplete);

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        // In QUESTIONS, the first answer is the correct one
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // set key to re-render Question component when activeQuestionIndex changes
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
