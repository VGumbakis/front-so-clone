import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Emblem-question-red.svg" className={styles.image} />
        <h3 className={styles.heading}>ASK AND GET ANSWERS</h3>
      </div>
      <ul className={styles.list}>
        <li>
          <a href="./">Home</a>
        </li>
        <li>
          <a href="./loginorsignup">Login or Sign Up</a>
        </li>
        <li>
          <a href="./ask">Ask</a>
        </li>
        <li>
          <a href="./logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
