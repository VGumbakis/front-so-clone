// File: pages/_app.js

import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const MyApp = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login state and update `isLoggedIn` accordingly

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
