import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
  console.log("userAnswers :>> ", userAnswers);

  const skippedAnswers = userAnswers.filter((ans) => ans === null);
  const correctAnswers = userAnswers.filter(
    (ans, index) => ans === QUESTIONS[index].answers[0]
  );

  const skippedPercentage = Math.round(
    (skippedAnswers.length / QUESTIONS.length) * 100
  );
  const correctPercentage = Math.round(
    (correctAnswers.length / QUESTIONS.length) * 100
  );
  const incorrectPercentage = 100 - skippedPercentage - correctPercentage;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((ans, index) => {
          let ansClass = "user-answer";

          if (ans === null) {
            ansClass += " skipped";
          } else if (ans === QUESTIONS[index].answers[0]) {
            ansClass += " correct";
          } else {
            ansClass += " wrong";
          }

          return (
            <li key={ans ? ans : "skipped" + index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={ansClass}>{ans ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
