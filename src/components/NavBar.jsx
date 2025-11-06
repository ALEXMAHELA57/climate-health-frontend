import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext.jsx";

export default function NavBar() {
  const { lang, setLang } = useLang();

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>🌍 <b>ClimHealth AI</b></span>
      </div>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/risk">Risk Map</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/symptoms">Symptom Checker</Link>
        <Link to="/education">Education</Link>
        <Link to="/guidance">Guidance</Link>
        <Link to="/clinics">Clinics</Link>
        <Link to="/youth">Youth</Link>
        <Link to="/subscribe">Subscribe</Link>
        <Link to="/admin">Admin</Link>
      </div>

      <div style={styles.langBox}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={styles.dropdown}
        >
          <option value="en">🇬🇧 English</option>
          <option value="sw">🇹🇿 Swahili</option>
          <option value="fr">🇫🇷 French</option>
        </select>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.8rem 2rem",
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    flexWrap: "wrap",
  },
  left: { display: "flex", alignItems: "center", gap: "0.5rem" },
  logo: { fontSize: "1.2rem", color: "#065f46" },
  links: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.2rem",
    fontSize: "0.95rem",
  },
  langBox: { marginLeft: "1rem" },
  dropdown: {
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};
