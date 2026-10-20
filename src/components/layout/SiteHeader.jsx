import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Watch, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../contexts/CartContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMobileNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="chrono-header">
      <div className="chrono-container chrono-header-inner">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="chrono-logo"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="chrono-logo-icon">
            <Watch size={28} />
          </div>
          <div>
            <span className="chrono-logo-title">ChronoClassic</span>
            <span className="chrono-logo-subtitle">Годинники з 2012 року</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="chrono-nav" aria-label="Основна навігація">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `chrono-nav-btn ${isActive ? "active" : ""}`
            }
          >
            Головна
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `chrono-nav-btn ${isActive ? "active" : ""}`
            }
          >
            Каталог
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `chrono-nav-btn ${isActive ? "active" : ""}`
            }
          >
            Про нас
          </NavLink>
        </nav>

        {/* Action icons */}
        <div className="chrono-header-actions">
          {/* User / Account */}
          <Link
            to={user ? "/account" : "/login"}
            className={`chrono-icon-btn ${
              location.pathname.startsWith("/account") ||
              location.pathname === "/login" ||
              location.pathname === "/register"
                ? "active"
                : ""
            }`}
            title={user ? `Кабінет (${user.name})` : "Вхід до кабінету"}
          >
            <User size={20} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`chrono-icon-btn ${
              location.pathname === "/cart" ? "active" : ""
            }`}
            title="Кошик покупок"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="chrono-cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="chrono-menu-toggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="chrono-mobile-menu">
          <button
            type="button"
            onClick={() => handleMobileNav("/")}
            className={`chrono-mobile-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Головна
          </button>
          <button
            type="button"
            onClick={() => handleMobileNav("/products")}
            className={`chrono-mobile-link ${
              location.pathname.startsWith("/products") ? "active" : ""
            }`}
          >
            Каталог
          </button>
          <button
            type="button"
            onClick={() => handleMobileNav("/about")}
            className={`chrono-mobile-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            Про нас
          </button>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "0.5rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid var(--chrono-emerald-900)",
            }}
          >
            <button
              type="button"
              onClick={() => handleMobileNav("/login")}
              className="chrono-btn-secondary"
              style={{ flex: 1, padding: "0.625rem" }}
            >
              Вхід
            </button>
            <button
              type="button"
              onClick={() => handleMobileNav("/register")}
              className="chrono-btn-primary"
              style={{ flex: 1, padding: "0.625rem" }}
            >
              Реєстрація
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
