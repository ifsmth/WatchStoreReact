import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Star, ShoppingCart, Eye, CheckCircle2 } from "lucide-react";
import { useCart } from "../../contexts/CartContext.jsx";

export default function ProductCard({ item, onAddToCartFeedback }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const product = item;
  const imageSrc =
    product.images?.[0] ||
    product.image ||
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600";

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    if (onAddToCartFeedback) {
      onAddToCartFeedback(
        `«${product.title || product.name}» додано до кошика!`,
      );
    }
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <article className="chrono-product-card">
      {/* Product Image Area */}
      <div className="chrono-product-photo-box" onClick={handleCardClick}>
        <div className="chrono-product-rating">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating ?? "4.9"}</span>
        </div>
        <img
          src={imageSrc}
          alt={product.title || product.name}
          className="chrono-product-img"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="chrono-product-info">
        <div className="chrono-product-brand">
          {product.brand || "Швейцарія"}
        </div>

        <h3
          className="chrono-product-title"
          onClick={handleCardClick}
          title={product.title || product.name}
        >
          {product.title || product.name}
        </h3>

        <p className="chrono-product-desc">
          {product.description ||
            "Класичний дизайн, надійний механізм та відмінна точність ходу."}
        </p>

        {/* Price */}
        <div className="chrono-product-price">
          {Number(product.price).toLocaleString("uk-UA")} ₴
        </div>

        {/* Specs Box */}
        <div className="chrono-product-specs">
          <div className="chrono-spec-row">
            <span className="chrono-spec-label">Стать:</span>
            <span>{product.gender || "Унісекс"}</span>
          </div>
          <div className="chrono-spec-row">
            <span className="chrono-spec-label">Механізм:</span>
            <span>{product.mechanism || "Механічний"}</span>
          </div>
          {product.glass && (
            <div className="chrono-spec-row">
              <span className="chrono-spec-label">Скло:</span>
              <span>{product.glass}</span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="chrono-stock-status">
          <span
            className="chrono-stock-dot"
            style={{
              backgroundColor: product.stock > 0 ? "#10b981" : "#ef4444",
            }}
          />
          {product.stock > 0
            ? `В наявності (${product.stock} шт.)`
            : "Тимчасово немає в наявності"}
        </div>

        {/* Actions */}
        <div className="chrono-card-actions">
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="chrono-btn-add-cart"
            style={{
              backgroundColor: justAdded
                ? "var(--chrono-emerald-700)"
                : product.stock === 0
                  ? "#9ca3af"
                  : "",
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
            }}
          >
            {justAdded ? (
              <>
                <CheckCircle2 size={16} /> Додано!
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Додати до кошика
              </>
            )}
          </button>

          <Link to={`/products/${product.id}`} className="chrono-btn-details">
            <Eye size={15} color="#d97706" /> Детальніше
          </Link>
        </div>
      </div>
    </article>
  );
}
