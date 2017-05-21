import React from 'react';
import styles from './LandingPage.css';

const Description = () => (
  <div className={styles.descriptionContainer}>
    <div className={styles.descriptionTitle}>
      Countless new worlds await with Stork
    </div>
    <div className={styles.descriptionContent}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam vel turpis quis mauris euismod lacinia vel quis dolor.
        Ut sed metus molestie neque commodo pharetra et at turpis.
      </p>
      <br />
      <p>
        Morbi ut neque ac augue vestibulum pulvinar vel vitae magna.
        Phasellus non interdum risus. Praesent viverra molestie augue,
        in consequat tortor. Integer a convallis mauris, quis sollicitudin
        orci.
      </p>
    </div>
    <div className={styles.buttonContainer}>
      <button className={styles.descriptionButton}>
        Join Us
      </button>
    </div>
  </div>
);

export default Description;
