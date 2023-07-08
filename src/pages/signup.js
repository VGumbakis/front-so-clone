import { useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        const { jwt, refreshToken } = data;
        // Save the tokens or perform any necessary actions

        // Display success message
        setError('Signup successful');

        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        // Signup failed
        setError(data.response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('Signup was not successful');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
