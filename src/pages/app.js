import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const MyApp = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
