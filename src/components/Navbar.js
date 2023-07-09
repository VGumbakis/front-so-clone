import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wv_logo_proposal_flying_plane_wo_contrails.png" className={styles.image} />
        <h3 className={styles.heading}>Your destinations</h3>
      </div>
      <ul className={styles.list}>
        <li>
          <a href="./">Home</a>
        </li>
        <li>
          <a href="./login">Login</a>
        </li>

        <li>
          <a href="./signup">Sign Up</a>
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
