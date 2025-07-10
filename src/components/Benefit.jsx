import React from 'react';
import styles from '../styles/Benefit.module.css';

function Benefit() {
    return (
        <section className={styles.benefitSection}>
        <div className={styles.benefit}>
            <div className={styles.benefitBox1}>
              <span className="material-symbols-outlined">
                equalizer
                </span>
              <h1>Several chart types</h1>
              <h2>Plenty several options of different chart types.</h2>
            </div>
            <div className={styles.benefitBox2}>
            <span className="material-symbols-outlined">
                done_all
                </span>
              <h1>Easy to use</h1>
              <h2>Enter your data then get the chart you want.
              </h2>
            </div>
            <div className={styles.benefitBox3}>
            <span className="material-symbols-outlined">
                edit_document
                </span>
              <h1>Customizeable</h1>
              <h2>Highly customizeable charts for every projects.</h2>
            </div>
          </div> 
      </section>
    );
  }
  
  export default Benefit;