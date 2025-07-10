import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/LogIn.module.css";

function LogIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire("Peringatan", "Email dan password wajib diisi", "warning");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan token ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        Swal.fire("Berhasil", "Login sukses", "success").then(() => {
          navigate("/"); // ganti sesuai tujuan
        });
      } else {
        Swal.fire(
          "Gagal Login",
          data.message || "Email atau password salah",
          "error"
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Terjadi kesalahan saat login", "error");
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/NC-Logo.png`}
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>Welcome Back</p>
          <p className={styles.message}>Log in to your account.</p>

          <label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
            />
            <span>Password</span>
          </label>

          <button type="submit" className={styles.submit}>
            Submit
          </button>

          <p className={styles.signin}>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>

          <p className={styles.pline}>Or With</p>

          <div className={styles.flexrow}>
            {/* Social buttons placeholder */}
          </div>
        </form>
      </main>
    </>
  );
}

export default LogIn;
