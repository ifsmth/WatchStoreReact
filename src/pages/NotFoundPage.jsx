import { Link, useNavigate } from "react-router";
import { Compass, ChevronRight, Home, Watch } from "lucide-react";
import { brandsList } from "../data/products.js";

export default function NotFoundPage({
  title = "Час зупинився: сторінку не знайдено",
  message = "Схоже, що вказана адреса не існує, була переміщена або годинниковий механізм дав збій. Пропонуємо повернутися до наших актуальних колекцій.",
}) {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div className="chrono-container chrono-404-container">
      {/* 404 Large Display */}
      <div className="chrono-404-number">404</div>

      <div className="chrono-pill-badge" style={{ marginBottom: "1rem" }}>
        <Compass size={14} /> Напрямок втрачено
      </div>

      <h1 className="chrono-404-title">{title}</h1>
      <p className="chrono-404-desc">{message}</p>

      {/* Action Buttons */}
      <div className="chrono-404-actions">
        <Link to="/products" className="chrono-btn-primary">
          <Watch size={18} /> Каталог годинників
          <ChevronRight size={18} />
        </Link>
        <Link to="/" className="chrono-btn-secondary">
          <Home size={18} /> На головну сторінку
        </Link>
      </div>

      {/* Suggested popular brands */}
      <div style={{ marginTop: "2rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(6, 78, 59, 0.5)",
            marginBottom: "0.75rem",
          }}
        >
          Швидкий перехід до популярних брендів:
        </p>
        <div className="chrono-suggested-brands">
          {brandsList
            .filter((b) => b !== "Усі бренди")
            .slice(0, 5)
            .map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandClick(brand)}
                className="chrono-btn-secondary"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.75rem",
                  borderRadius: "9999px",
                  borderColor: "var(--chrono-emerald-200)",
                  color: "var(--chrono-emerald-950)",
                }}
              >
                {brand}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
