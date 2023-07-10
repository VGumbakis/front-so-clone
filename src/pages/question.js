import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Question.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QuestionPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [likedAnswers, setLikedAnswers] = useState([]);
  const [dislikedAnswers, setDislikedAnswers] = useState([]);

  useEffect(() => {
    const selectedQuestionId = localStorage.getItem('selectedQuestionId');
    if (selectedQuestionId) {
      const fetchData = async () => {
        try {
          const questionResponse = await axios.get(`http://localhost:8080/question/${selectedQuestionId}`);
          const questionData = questionResponse.data;
          setQuestion(questionData);

          const answersResponse = await axios.get(`http://localhost:8080/question/${selectedQuestionId}/answers`);
          const answersData = answersResponse.data.response;
          setAnswers(answersData);
        } catch (error) {
          console.error('Error fetching question and answers:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  const handleDeleteQuestion = async () => {
    try {
      const selectedQuestionId = localStorage.getItem('selectedQuestionId');
      if (selectedQuestionId) {
        await axios.delete(`http://localhost:8080/question/${selectedQuestionId}`, {
          headers: {
            authorization: localStorage.getItem('jwt'),
          },
        });
        console.log('Question deleted successfully');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await axios.delete(`http://localhost:8080/answer/${answerId}`, {
        headers: {
          authorization: localStorage.getItem('jwt'),
        },
      });
      console.log('Answer deleted successfully');
      const selectedQuestionId = localStorage.getItem('selectedQuestionId');
      const answersResponse = await axios.get(`http://localhost:8080/question/${selectedQuestionId}/answers`, {
        headers: {
          authorization: localStorage.getItem('jwt'),
        },
      });
      const answersData = answersResponse.data.response;
      setAnswers(answersData);
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedQuestionId = localStorage.getItem('selectedQuestionId');
      const token = localStorage.getItem('jwt');
      const response = await axios.post(
        `http://localhost:8080/question/${selectedQuestionId}/answer`,
        { content: answerContent },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        setAnswerContent('');
        const answersResponse = await axios.get(`http://localhost:8080/question/${selectedQuestionId}/answers`, {
          headers: {
            authorization: token,
          },
        });
        const answersData = answersResponse.data.response;
        setAnswers(answersData);
      } else {
        throw new Error('Request failed with status code ' + response.status);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setErrorMessage('Error submitting the answer');
    }
  };

  const handleLikeAnswer = (answerId) => {
    setLikedAnswers((prevLikedAnswers) => {
      if (prevLikedAnswers.includes(answerId)) {
        return prevLikedAnswers.filter((id) => id !== answerId);
      } else {
        return [...prevLikedAnswers, answerId];
      }
    });

    setDislikedAnswers((prevDislikedAnswers) => prevDislikedAnswers.filter((id) => id !== answerId));
  };

  const handleDislikeAnswer = (answerId) => {
    setDislikedAnswers((prevDislikedAnswers) => {
      if (prevDislikedAnswers.includes(answerId)) {
        return prevDislikedAnswers.filter((id) => id !== answerId);
      } else {
        return [...prevDislikedAnswers, answerId];
      }
    });

    setLikedAnswers((prevLikedAnswers) => prevLikedAnswers.filter((id) => id !== answerId));
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedQuestionId');
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {loading ? (
          <p>Loading question...</p>
        ) : question ? (
          <div className={styles.question}>
            <h3 className={styles.title}>{question.title}</h3>
            <p className={styles.content}>{question.content}</p>
            <button className={`${styles.button} questionbtn`} onClick={handleDeleteQuestion}>
              Delete Question
            </button>
          </div>
        ) : (
          <p>No question found.</p>
        )}

        <div className={styles.answerSection}>
          <h4 className={styles.answers}>Answers:</h4>
          {answers.length > 0 ? (
            answers.map((answer) => (
              <div className={styles.answer} key={answer.id}>
                <p>{answer.content}</p>
                <div className={styles.actions}>
                  <button className={likedAnswers.includes(answer.id) ? styles.likedButton : styles.button} onClick={() => handleLikeAnswer(answer.id)}></button>
                  <button className={dislikedAnswers.includes(answer.id) ? styles.dislikedButton : styles.button} onClick={() => handleDislikeAnswer(answer.id)}>
                    Dislike
                  </button>
                  <button className={styles.button} onClick={() => handleDeleteAnswer(answer.id)}>
                    Delete Answer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No answers found.</p>
          )}
        </div>

        <form className={styles.form} onSubmit={handleAnswerSubmit}>
          <textarea value={answerContent} onChange={(e) => setAnswerContent(e.target.value)} placeholder="Write your answer" required></textarea>
          <button className={styles.button} type="submit">
            Leave Answer
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
