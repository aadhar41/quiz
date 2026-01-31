import axios from 'axios'
import React, { useState, useContext, useEffect, useRef } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

// https://opentdb.com/api.php?amount=10&category=9&type=multiple
const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl = `${API_ENDPOINT}amount=10&category=9&type=multiple`;

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFetched = useRef(false);

  const fetchQuestions = async (url) => {
    // Prevent duplicate calls in React Strict Mode
    if (hasFetched.current) return;
    hasFetched.current = true;

    // Set loading state at the start
    setLoading(true);
    setWaiting(false);

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const data = response.data.results;
        // Batch all success state updates together
        // const { results } = data;
        setQuestions(data);
        setLoading(false);
        setError(false);
        setErrorMessage('');
      } else {
        // Batch all "no results" state updates together
        setLoading(false);
        setWaiting(true);
        setError(true);
        setErrorMessage('No questions found. Please try again.');
      }
    } catch (error) {
      console.log(error);

      // Determine error message
      let message = 'An unexpected error occurred.';
      if (error.response?.status === 429) {
        message = 'Too many requests. Please wait a moment and try again.';
      } else if (error.response) {
        message = `Error: ${error.response.status} - ${error.response.statusText}`;
      } else if (error.request) {
        message = 'Network error. Please check your connection.';
      }

      // Batch all error state updates together
      setLoading(false);
      setError(true);
      setErrorMessage(message);
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (oldIndex == questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  }

  const checkAnswer = (answer) => {
    if (answer) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setWaiting(true);
    setIsModalOpen(false);
  }

  const handleChange = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(tempUrl);
  }

  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  // console.table("questions:- ", questions); return;
  return <AppContext.Provider value={{
    waiting,
    loading,
    error,
    errorMessage,
    questions,
    index,
    correct,
    isModalOpen,
    openModal,
    nextQuestion,
    checkAnswer,
    closeModal,
    handleChange,
    handleSubmit,
    quiz
  }}>{children}</AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
