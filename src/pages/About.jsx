// About.jsx
import React from 'react';
import styles from './About.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
    <Navbar />
    <div className={styles.aboutContainer}>

      <section className={styles.section}>
        <h2>What is NestCharts?</h2>
        <p>
          NestCharts is an interactive data visualization platform that allows users to create, customize,
          and download charts. Whether you're a student, teacher, or data enthusiast, NestCharts
          provides a user-friendly interface to turn your data into meaningful visuals.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Key Features</h2>
        <ul>
          <li>📊 Supports various chart types (bar, line, pie, and more)</li>
          <li>🎨 Customize colors, fonts, and text sizes</li>
          <li>📷 Export charts as high-quality images</li>
          <li>💾 Save user input data locally for easy access</li>
          <li>📱 Responsive design for all devices</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Purpose & Benefits</h2>
        <p>
          NestCharts is built to simplify the process of visualizing data. It’s perfect for school assignments,
          business reports, or simply exploring trends. No need for complex software, just input your data and
          generate stunning charts instantly.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Feedback</h2>
        <p>
          We welcome your ideas, bug reports, and suggestions! Feel free to contact us through our contact
          page or via email.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default About;
