import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../styles/LoginOrSignup.module.css';

const LoginOrSignup = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: loginEmail,
        password: loginPassword,
      });

      const data = response.data;

      if (response.status === 200) {
        // Login successful
        const { jwt, refreshToken } = data;

        // Save the tokens to local storage
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('refreshToken', refreshToken);

        // Display success message
        setLoginError('Login successful');

        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        // Login failed
        setLoginError(data.response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setLoginError('Login was not successful');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });

      const data = response.data;

      if (response.status === 200) {
        // Signup successful
        const { jwt, refreshToken } = data;

        // Save the tokens to local storage
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('refreshToken', refreshToken);

        // Display success message
        setSignupError('Signup successful');

        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        // Signup failed
        setSignupError(data.response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setSignupError('Signup was not successful');
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Login</h1>
        {loginError && <p>{loginError}</p>}
        <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>

        <h1>Signup</h1>
        {signupError && <p>{signupError}</p>}
        <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
        <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
      </div>
      <Footer />
    </>
  );
};

export default LoginOrSignup;
