import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  console.log(isModalOpen);
  return (
    <>
      <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'}`}>
        <div className="modal-content">
          <h2>congratulations!</h2>
          <p>you scored {((correct / questions.length) * 100).toFixed(0)}%</p>
          <button className="close-btn" onClick={closeModal}>play again</button>
        </div>
      </div>
    </>
  )
}

export default Modal
