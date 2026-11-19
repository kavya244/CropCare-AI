
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, LogOut } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <Leaf size={27} />
        <span>{t("brand")}</span>
      </Link>

      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      <div className={`navbar-content ${menuOpen ? "menu-open" : ""}`}>
        <div className="nav-links">
          <NavLink to="/" end onClick={closeMenu}>
            {t("home")}
          </NavLink>

          <NavLink to="/detect" onClick={closeMenu}>
            {t("detect")}
          </NavLink>

          <NavLink to="/library" onClick={closeMenu}>
            {t("library")}
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            {t("about")}
          </NavLink>
        </div>

        <div className="navbar-actions">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Choose language"
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>

          {user ? (
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="login-nav-btn"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
