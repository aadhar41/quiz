import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { handleChange, handleSubmit, quiz, error } = useGlobalContext();
  return (
    <>
      <section className="quiz" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: '80vh', width: '80vw', margin: '0 auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>setup form</h2>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input type="number" className='form-input' name="amount" id="amount" min={1} max={50} value={quiz.amount} onChange={handleChange} />
          </div>

          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select className='form-input' name="category" id="category" value={quiz.category} onChange={handleChange}>
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>

          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select className='form-input' name="difficulty" id="difficulty" value={quiz.difficulty} onChange={handleChange}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit} style={{ marginTop: '10px' }}>start</button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>can't generate questions, please try another category or difficulty.</p>}
        </form>
      </section>
    </>
  )
}

export default SetupForm
