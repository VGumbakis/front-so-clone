import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/index.module.css';
import { useRouter } from 'next/router';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/questions');
        const fetchedQuestions = response.data.response;
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuestionClick = (questionId) => {
    localStorage.setItem('selectedQuestionId', questionId);
    router.push('/question');
  };

  return (
    <div className={styles.questionList}>
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <>
          {questions.map((question) => (
            <div className={styles.question} key={question.id} onClick={() => handleQuestionClick(question.id)}>
              <h3>{question.title}</h3>
              <p>{question.content}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Home;
