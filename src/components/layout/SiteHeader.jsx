import { Link, NavLink } from "react-router";
import { useCart } from "../../contexts/CartContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx"; // Додано

export default function SiteHeader({ title, links }) {
  const { cartCount } = useCart();
  const { user, logout } = useAuth(); // Отримуємо юзера з контексту

  return (
    <header className="site-header">
      <Link className="site-title" to="/">
        {title}
      </Link>

      <nav
        aria-label="Основна навігація"
        style={{ display: "flex", gap: "2rem", alignItems: "center" }}
      >
        <ul className="nav-list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink className="nav-link" to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Блок Авторизації та Кошика */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {user ? (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Link
                to="/account"
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#253432",
                }}
              >
                👤 {user.name}
              </Link>
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#bd5c38",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Вийти
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "#1d2224",
              }}
            >
              Увійти
            </Link>
          )}

          {/* Іконка кошика */}
          <Link
            to="/cart"
            className="nav-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: 0,
            }}
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  background: "#bd5c38",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.1rem 0.5rem",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
