import React from 'react';
import styles from '../styles/Input.module.css';

function Input() {
    return (
    <section className={styles.inputSection}>
    <div className={styles.inputContainer}>
        <input placeholder="Search" type="text"/>
        <button className={styles.searchBtn}>Search</button>
    </div>
    </section> 
    );
  }
  
  export default Input;