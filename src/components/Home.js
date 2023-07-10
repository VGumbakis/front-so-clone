import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  function filterQuestions(questions, filter) {
    if (filter === 'answered') {
      return questions.filter((question) => question.answered);
    } else if (filter === 'unanswered') {
      return questions.filter((question) => !question.answered);
    } else {
      return questions;
    }
  }

  const filteredQuestions = filterQuestions(questions, filter);

  return (
    <div>
      <div className={styles.form}>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All Questions</option>
          <option value="answered">Answered Questions</option>
          <option value="unanswered">Unanswered Questions</option>
        </select>
      </div>

      <div className={styles.questionList}>
        {loading ? (
          <p>Loading questions...</p>
        ) : filteredQuestions.length > 0 ? (
          <>
            {filteredQuestions.map((question) => (
              <div className={styles.question} key={question.id} onClick={() => handleQuestionClick(question.id)}>
                <h3 className={styles.title}>{question.title}</h3>
                <p className={styles.content}>{question.content}</p>
              </div>
            ))}
          </>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
