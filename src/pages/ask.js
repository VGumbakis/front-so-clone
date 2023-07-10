import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import styles from '../styles/Ask.module.css';

const Ask = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwt');

      const response = await axios.post(
        'http://localhost:8080/question',
        {
          title,
          content,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Success, question created!');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        throw new Error('Request failed with status code ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error creating the question');
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <h3 className={styles.title}>Ask question</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Question Name:</label>
          <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
          <br />

          <label htmlFor="content">Question Content:</label>
          <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} required></textarea>
          <br />

          <input type="submit" value="Submit" className={styles.button} />
        </form>

        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>

      <Footer />
    </>
  );
};

export default Ask;
