import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QuestionPage = () => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const selectedQuestionId = localStorage.getItem('selectedQuestionId');
    if (selectedQuestionId) {
      // Fetch the question data
      fetch(`http://localhost:8080/questions/${selectedQuestionId}`)
        .then((response) => response.json())
        .then((data) => setQuestion(data))
        .catch((error) => console.log(error));

      // Fetch the answers for the question
      fetch(`http://localhost:8080/questions/${selectedQuestionId}/answers`)
        .then((response) => response.json())
        .then((data) => setAnswers(data.response))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {question ? (
          <div>
            <h3>{question.title}</h3>
            <p>{question.content}</p>
          </div>
        ) : (
          <p>Loading question...</p>
        )}

        <div>
          <h4>Answers:</h4>
          {answers.length > 0 ? answers.map((answer) => <p key={answer._id}>{answer.content}</p>) : <p>No answers found.</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
