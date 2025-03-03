import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1>Welcome to the Contacts App</h1>
      <p>This is your personal contacts book. Manage your contacts efficiently.</p>
    </div>
  );
};

export default HomePage;
