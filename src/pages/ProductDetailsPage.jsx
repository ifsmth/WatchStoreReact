import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ChevronRight,
  ArrowLeft,
  Star,
  CheckCircle2,
  ShoppingCart,
  Layers,
  Droplets,
  Eye,
} from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";

export default function ProductDetailsPage({ items = [] }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [notification, setNotification] = useState(null);

  const product = items.find((item) => item.id === Number(productId));

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!product) {
    return (
      <div
        className="chrono-container"
        style={{ padding: "4rem 1rem", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontFamily: "var(--chrono-font-serif)",
            color: "var(--chrono-emerald-950)",
            marginBottom: "1rem",
          }}
        >
          Товар не знайдено
        </h2>
        <p style={{ color: "rgba(6, 78, 59, 0.7)", marginBottom: "2rem" }}>
          Можливо, посилання застаріло або товар було видалено.
        </p>
        <Link to="/products" className="chrono-btn-primary">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          product.image ||
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
        ];

  const handleAddToCart = () => {
    addToCart(product, 1);
    showNotification(`«${product.title || product.name}» додано до кошика!`);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  return (
    <div
      className="chrono-container"
      style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="chrono-toast">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="chrono-breadcrumbs" style={{ marginBottom: "1.5rem" }}>
        <Link to="/" className="chrono-breadcrumb-link">
          Головна
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <Link to="/products" className="chrono-breadcrumb-link">
          Каталог
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <span
          style={{
            fontWeight: 700,
            color: "var(--chrono-emerald-950)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title || product.name}
        </span>
      </div>

      <Link
        to="/products"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--chrono-emerald-950)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "1.5rem",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={16} /> Повернутися до каталогу
      </Link>

      {/* Main Product Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--chrono-radius-2xl)",
          border: "1px solid var(--chrono-emerald-100)",
          padding: "2rem",
          boxShadow: "var(--chrono-shadow-sm)",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Gallery */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                backgroundColor: "var(--chrono-bg-photo)",
                borderRadius: "var(--chrono-radius-xl)",
                padding: "2rem",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: "1px solid rgba(209, 250, 229, 0.5)",
              }}
            >
              <div className="chrono-product-rating">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>{product.rating ?? "4.9"}</span>
              </div>
              <img
                src={images[selectedImgIndex] || images[0]}
                alt={product.title || product.name}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                  filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.15))",
                  transition: "all 0.3s ease",
                }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  overflowX: "auto",
                  paddingBottom: "0.5rem",
                }}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImgIndex(idx)}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "var(--chrono-radius-md)",
                      backgroundColor: "var(--chrono-bg-photo)",
                      padding: "0.5rem",
                      border:
                        selectedImgIndex === idx
                          ? "2px solid var(--chrono-amber-500)"
                          : "2px solid transparent",
                      cursor: "pointer",
                      opacity: selectedImgIndex === idx ? 1 : 0.7,
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Info */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className="chrono-pill-badge"
              style={{
                marginBottom: "0.75rem",
                width: "fit-content",
                fontSize: "0.6875rem",
              }}
            >
              Бренд: {product.brand || "Швейцарія"}
            </span>

            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--chrono-emerald-950)",
                fontFamily: "var(--chrono-font-serif)",
                lineHeight: 1.25,
                margin: "0 0 1rem 0",
              }}
            >
              {product.title || product.name}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 800,
                  color: "var(--chrono-amber-600)",
                }}
              >
                {Number(product.price).toLocaleString("uk-UA")} ₴
              </span>

              <div
                className="chrono-stock-status"
                style={{
                  margin: 0,
                  backgroundColor: "rgba(236, 253, 245, 0.8)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                }}
              >
                <span className="chrono-stock-dot" />В наявності (
                {product.stock} шт.)
              </div>
            </div>

            <p
              style={{
                color: "rgba(6, 78, 59, 0.8)",
                fontSize: "0.875rem",
                lineHeight: "1.7",
                fontWeight: 300,
                marginBottom: "2rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--chrono-emerald-100)",
              }}
            >
              {product.description}
            </p>

            {/* Specifications */}
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--chrono-emerald-950)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Layers size={16} color="#f59e0b" /> Технічні характеристики
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              <div className="chrono-spec-box" style={specBoxStyle}>
                <span style={specLabelStyle}>Стать:</span>
                <span style={specValStyle}>{product.gender || "Унісекс"}</span>
              </div>
              <div className="chrono-spec-box" style={specBoxStyle}>
                <span style={specLabelStyle}>Тип механізму:</span>
                <span style={specValStyle}>
                  {product.mechanism || "Механічний"}
                </span>
              </div>
              <div className="chrono-spec-box" style={specBoxStyle}>
                <span style={specLabelStyle}>Скло:</span>
                <span style={specValStyle}>{product.glass || "Сапфірове"}</span>
              </div>
              <div className="chrono-spec-box" style={specBoxStyle}>
                <span style={specLabelStyle}>Матеріал ремінця:</span>
                <span style={specValStyle}>
                  {product.strap_material || "Шкіра"}
                </span>
              </div>
              <div
                className="chrono-spec-box"
                style={{ ...specBoxStyle, gridColumn: "1 / -1" }}
              >
                <span
                  style={{
                    ...specLabelStyle,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Droplets size={14} color="#d97706" /> Водонепроникність:
                </span>
                <span style={specValStyle}>
                  {product.water_resistance || "100m"}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "auto",
              }}
            >
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="chrono-btn-primary"
                style={{ flex: 1, padding: "1rem" }}
              >
                <ShoppingCart size={18} /> Додати у кошик
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="chrono-btn-secondary"
                style={{
                  flex: 1,
                  padding: "1rem",
                  backgroundColor: "var(--chrono-emerald-950)",
                  color: "var(--chrono-amber-400)",
                }}
              >
                Купити в 1 клік
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const specBoxStyle = {
  backgroundColor: "rgba(236, 253, 245, 0.6)",
  padding: "0.875rem",
  borderRadius: "var(--chrono-radius-md)",
  border: "1px solid rgba(209, 250, 229, 0.8)",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.75rem",
};

const specLabelStyle = {
  color: "rgba(6, 78, 59, 0.6)",
  fontWeight: 500,
};

const specValStyle = {
  fontWeight: 700,
  color: "var(--chrono-emerald-950)",
};
