import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/NavbarDisplay.module.css";

function NavbarDisplay({ setSelectedCategory }) {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/display/${category}`); // Navigasi ke halaman kategori chart
  };

  const categories = ["line", "area", "column", "bar", "pie", "radial"];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/images/NC-Logo.png`} alt="Logo" className={styles.sidebarLogo} />
          </Link>
        </div>
        <nav className={styles.sidebarMenu}>
          <h3>Charts</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={category === cat ? styles.activeButtonSidebar : ""}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} Charts
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default NavbarDisplay;
