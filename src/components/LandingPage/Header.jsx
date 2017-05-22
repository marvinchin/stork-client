import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LandingPage.css';

const Header = () => (
  <div className={styles.headerContainer}>
    <div>
      <div className={styles.headerTitle}>
        Stork
      </div>
      <div className={styles.headerSubtitle}>
        Books are da bomb.
        <br />
        Make your books great again.
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/login">
          <button className={styles.headerButton}>
            Log In
          </button>
        </Link>
        <button className={styles.headerButton}>
          Join Us
        </button>
      </div>
    </div>
  </div>
);

export default Header;
