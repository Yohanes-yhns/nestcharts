import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Explore.module.css';

function Explore() {
    return (
        <section className={styles.exploreSection}>
            <Link to="/all-charts">
                <button className={styles.exploreBtn}> Explore Charts </button>
            </Link>
        </section>
    );
}

export default Explore;
