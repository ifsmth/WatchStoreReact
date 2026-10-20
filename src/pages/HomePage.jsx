import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ChevronRight,
  Clock,
  Briefcase,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import ProductCard from "../components/products/ProductCard.jsx";
import { products, brandsList } from "../data/products.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${encodeURIComponent(brand)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4 popular products
  const popularProducts = products.slice(0, 4);

  return (
    <div style={{ paddingBottom: "2.5rem" }}>
      {/* Toast Notification */}
      {notification && (
        <div className="chrono-toast">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="chrono-hero" aria-label="Головний банер">
        <div
          className="chrono-hero-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1600')`,
          }}
        />
        <div className="chrono-hero-gradient" />

        <div className="chrono-hero-content">
          <span className="chrono-pill-badge">Нова колекція 2026</span>
          <h1 className="chrono-hero-title">
            Еталон <span className="chrono-text-gold">Часу</span>
          </h1>
          <p className="chrono-hero-text">
            Відкрийте для себе колекцію класичних годинників, що поєднують у
            собі бездоганний стиль, точність механізмів та неперевершену якість.
          </p>

          <div className="chrono-hero-actions">
            <Link to="/products" className="chrono-btn-primary">
              Переглянути каталог
              <ChevronRight size={18} />
            </Link>
            <Link to="/about" className="chrono-btn-secondary">
              Про компанію
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Brands Logo Grid */}
      <section
        className="chrono-container chrono-brands-section"
        aria-label="Бренди"
      >
        <p className="chrono-brands-eyebrow">Офіційний дистриб'ютор брендів</p>
        <div className="chrono-brands-grid">
          {brandsList
            .filter((b) => b !== "Усі бренди")
            .map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandClick(brand)}
                className="chrono-brand-link"
              >
                {brand}
              </button>
            ))}
        </div>
      </section>

      {/* 3. Popular Products */}
      <section
        className="chrono-container"
        style={{ marginBottom: "6rem" }}
        aria-label="Популярні моделі"
      >
        <div className="chrono-section-header">
          <h2 className="chrono-section-title">Популярні моделі</h2>
          <p className="chrono-section-subtitle">
            Бестселери, які обирають поціновувачі класичного стилю
          </p>
          <div className="chrono-divider" />
        </div>

        <div className="chrono-products-grid home-grid">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              item={product}
              onAddToCartFeedback={showNotification}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/products" className="chrono-btn-primary">
            Дивитись увесь каталог
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* 4. Why Classic Watches (Philosophy Banner) */}
      <section
        className="chrono-philosophy-banner"
        aria-label="Філософія класичних годинників"
      >
        <div className="chrono-container">
          <div className="chrono-philosophy-grid">
            {/* Left Col */}
            <div className="chrono-philosophy-col">
              <span
                className="chrono-pill-badge"
                style={{ marginBottom: "0.75rem" }}
              >
                Філософія бренду
              </span>
              <h2
                className="chrono-section-title"
                style={{
                  color: "#ffffff",
                  textAlign: "left",
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Класика — це інвестиція в стиль
              </h2>
              <div
                className="chrono-divider"
                style={{ marginLeft: 0, marginBottom: "2rem" }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  color: "rgba(236, 253, 245, 0.8)",
                  fontWeight: 300,
                  lineHeight: "1.7",
                  fontSize: "0.9375rem",
                  marginBottom: "2rem",
                }}
              >
                <p>
                  Справжній класичний годинник — це більше, ніж інструмент для
                  вимірювання часу. Це відображення вашої особистості, поваги до
                  традицій та витонченого смаку.
                </p>
                <p>
                  Вибираючи класику, ви отримуєте універсальність та
                  довговічність. Аксесуар, що залишається актуальним через
                  десятиліття.
                </p>
              </div>

              {/* 4 Feature cards */}
              <div className="chrono-philosophy-features">
                {[
                  { icon: Clock, text: "Не виходить з моди десятиліттями" },
                  {
                    icon: Briefcase,
                    text: "Пасує до ділового та вихідного образу",
                  },
                  {
                    icon: ShieldCheck,
                    text: "Передається з покоління в покоління",
                  },
                  { icon: Award, text: "Символ репутації та статусу" },
                ].map((item, idx) => (
                  <div key={idx} className="chrono-feature-box">
                    <div className="chrono-feature-icon-wrap">
                      <item.icon size={20} />
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        lineHeight: 1.35,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div className="chrono-philosophy-col">
              <div className="chrono-feature-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1000"
                  alt="Classic Watch Lifestyle"
                  className="chrono-feature-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
