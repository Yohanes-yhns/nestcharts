import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const showChartInfoAlert = () => {
    Swal.fire({
      icon: "info",
      title: "Welcome!",
      text: "You can now create and download your charts directly.",
      confirmButtonText: "Got it!",
    });
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/NC-Logo.png`}
              alt="Logo"
            />
          </Link>
        </div>

        <nav className={styles.navLinks}>
          <ul>
            <li className={styles.dropdown}>
              <Link to="#" onClick={(e) => e.preventDefault()}>
                Charts
              </Link>
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownColumn}>
                  <Link to="/display/line">Line Charts</Link>
                  <Link to="/display/area">Area Charts</Link>
                  <Link to="/display/column">Column Charts</Link>
                </div>
                <div className={styles.dropdownColumn}>
                  <Link to="/display/bar">Bar Charts</Link>
                  <Link to="/display/pie">Pie Charts</Link>
                  <Link to="/display/radial">Radial Charts</Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/saved-chart"
                onClick={(e) => {
                  e.preventDefault();
                  showChartInfoAlert();
                }}
              >
                My Charts
              </Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.createAccBtn}>
        {token ? (
          <>
            <span className={styles.welcomeText}>Hi, {username}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                showChartInfoAlert();
              }}
              className={styles.BtnLogOut}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/log-in"
              className={styles.BtnLogIn}
              onClick={(e) => {
                e.preventDefault();
                showChartInfoAlert();
              }}
            >
              Log In
            </Link>

            <Link
              to="/sign-up"
              className={styles.BtnSignUp}
              onClick={(e) => {
                e.preventDefault();
                showChartInfoAlert();
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
