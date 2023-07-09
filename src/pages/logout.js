import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Remove JWT from local storage
    localStorage.removeItem('jwt');

    // Redirect to home page after logout
    router.push('/');
  }, []);

  return null; // or you can render a loading spinner or a logout message
};

export default Logout;
