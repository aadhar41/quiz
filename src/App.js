import React, { useState } from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
// import Question from './Question'

function App() {
  const [amount, setAmount] = useState(10);
  const { questions, index, correct, nextQuestion, checkAnswer, waiting, loading, error, errorMessage, isModalOpen } = useGlobalContext();
  const { type, difficulty, category, question, correct_answer, incorrect_answers } = (questions[index]) || {};
  // Combine incorrect and correct answers, then shuffle
  const answers = incorrect_answers ? [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5) : [];

  if (waiting) {
    return (
      <>
        <main>
          <SetupForm amount={amount} category={category} difficulty={difficulty} setAmount={setAmount} />
        </main>
      </>
    )
  }
  if (loading) {
    return (
      <>
        <main>
          <Loading />
        </main>
      </>
    )
  }
  if (error) {
    return (
      <>
        <main>
          <div className="error">
            <h2>Oops! Something went wrong</h2>
            <p>{errorMessage || 'An error occurred while fetching questions.'}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <main>
        <section className="quiz">
          {isModalOpen && <Modal isOpen={isModalOpen} />}
          <p className="correct-answers">
            correct answers: {correct}/{index}
          </p>
          <article className="container">
            <h2 className="question" dangerouslySetInnerHTML={{ __html: question }}></h2>
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button key={index} className="answer-btn" onClick={() => checkAnswer(answer === correct_answer)}>
                    {answer}
                  </button>
                )
              })}
            </div>
          </article>
          <button className="next-question" onClick={() => nextQuestion()}>Next Question</button>
        </section>
      </main>
    </>
  );
}

export default App
