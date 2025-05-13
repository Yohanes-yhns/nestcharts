import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/images/NC-Logo.png" alt="Logo" />
          </Link>
        </div>
        <nav className={styles.navLinks}>
          <ul>
            <li className={styles.dropdown}>
              <Link to="#">Charts</Link>
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownColumn}>
                  <Link to={`/display/line`}>Line Charts</Link>
                  <Link to={`/display/area`}>Area Charts</Link>
                  <Link to={`/display/column`}>Column Charts</Link>
                </div>
                <div className={styles.dropdownColumn}>
                  <Link to={`/display/bar`}>Bar Charts</Link>
                  <Link to={`/display/pie`}>Pie Charts</Link>
                  <Link to={`/display/radial`}>Radial Charts</Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.creatAccBtn}>
        <Link to="#" className={styles.BtnCreateAcc}>
          Create Account
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
