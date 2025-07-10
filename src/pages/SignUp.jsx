import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/SignUp.module.css";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    no_handphone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, no_handphone, email, password, confirmPassword } = form;

    // Validasi field
    if (!username || !no_handphone || !email || !password || !confirmPassword) {
      return Swal.fire("Peringatan", "Semua field wajib diisi", "warning");
    }

    if (username.length < 3) {
      return Swal.fire("Peringatan", "Username minimal 3 karakter", "warning");
    }

    if (!/^[0-9]{10,15}$/.test(no_handphone)) {
      return Swal.fire("Peringatan", "No HP harus angka 10-15 digit", "warning");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Swal.fire("Peringatan", "Format email tidak valid", "warning");
    }

    if (password !== confirmPassword) {
      return Swal.fire("Peringatan", "Password dan konfirmasi tidak cocok", "error");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@#\$%\^&\+\=!\.\-])[A-Za-z\d_@#\$%\^&\+\=!\.\-]{8,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "warning",
        title: "Password Lemah",
        html:
          "Password harus minimal 8 karakter<br/>" +
          "Mengandung huruf, angka, dan simbol (_@#!, dll)",
      });
    }

    try {
      const res = await fetch("http://localhost:3000/auth/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, no_handphone, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Sukses", "Registrasi berhasil! Silakan login.", "success").then(() => {
          navigate("/log-in"); // ← Redirect ke halaman login
        });

        setForm({
          username: "",
          no_handphone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        Swal.fire("Gagal", data.message || "Terjadi kesalahan", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Tidak dapat terhubung ke server", "error");
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/images/NC-Logo.png`} alt="Logo" />
          </Link>
        </div>
      </div>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>Create Account</p>
          <p className={styles.message}>Signup now and get full access to our app.</p>

          <label>
            <input required type="text" name="username" value={form.username} onChange={handleChange} className={styles.input} />
            <span>Username</span>
          </label>

          <label>
            <input required type="text" name="no_handphone" value={form.no_handphone} onChange={handleChange} className={styles.input} />
            <span>No Handphone</span>
          </label>

          <label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} className={styles.input} />
            <span>Email</span>
          </label>

          <label>
            <input required type="password" name="password" value={form.password} onChange={handleChange} className={styles.input} />
            <span>Password</span>
          </label>

          <label>
            <input required type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className={styles.input} />
            <span>Confirm Password</span>
          </label>

          <button type="submit" className={styles.submit}>Submit</button>

          <p className={styles.signin}>
            Already have an account? <Link to="/log-in">Log In</Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default SignUp;
