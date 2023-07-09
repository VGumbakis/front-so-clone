// Login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Login successful
        const { jwt, refreshToken } = data;

        // Save the tokens to local storage
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('refreshToken', refreshToken);

        // Display success message
        setError('Login successful');

        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        // Login failed
        setError(data.response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('Login was not successful');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
