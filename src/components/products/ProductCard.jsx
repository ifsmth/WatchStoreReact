import { useState } from "react";
import { Link } from "react-router";
import StockBadge from "./StockBadge.jsx";
import AppButton from "../ui/AppButton.jsx";
import ProductImage from "./ProductImage.jsx";
import { getMainProductPhoto } from "../../data/product_photos.js";
import { useCart } from "../../contexts/CartContext.jsx";

// Ми прибрали selected та onSelect з props, бо картка тепер сама керує кошиком
export default function ProductCard({ item }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const descriptionId = `product-${item.id}-description`;

  const { cartItems, addToCart } = useCart(); // Отримуємо функції кошика

  // Перевіряємо, чи є вже цей товар у кошику
  const isInCart = cartItems.some(
    (cartItem) => cartItem.product.id === item.id,
  );

  let mainPhoto = null;
  try {
    mainPhoto = getMainProductPhoto(item.id);
  } catch (e) {
    /* Ігноруємо */
  }

  return (
    <article className="product-card">
      <div className="product-card-image">
        {mainPhoto ? (
          <ProductImage src={mainPhoto?.image_url} alt={item.title} />
        ) : (
          <div className="product-image-placeholder">
            <span>⌚</span>
            <small>Фото очікується</small>
          </div>
        )}

        {item.stock === 0 && (
          <span className="sold-out-label">Немає в наявності</span>
        )}
      </div>

      <div className="product-card-content">
        <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{ color: "#1d2224", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.target.style.color = "#bd5c38")}
            onMouseOut={(e) => (e.target.style.color = "#1d2224")}
          >
            {item.title}
          </h3>
        </Link>

        <p className="price">
          <strong>{item.price.toLocaleString("uk-UA")} ₴</strong>
        </p>

        <ul className="details" style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Бренд:</strong>{" "}
            {item.brand_id === 1
              ? "Casio"
              : item.brand_id === 2
                ? "Tissot"
                : item.brand_id === 3
                  ? "Orient"
                  : "Інший"}
          </li>
          <li>
            <strong>Стать:</strong> {item.gender}
          </li>
          <li>
            <strong>Механізм:</strong> {item.mechanism}
          </li>
        </ul>

        <p>
          <StockBadge stock={item.stock} />
        </p>

        <div
          className="card-actions"
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Link
            className="app-button app-button-secondary"
            to={`/products/${item.id}`}
          >
            Переглянути деталі
          </Link>

          {/* НОВА РОБОЧА КНОПКА КОШИКА */}
          {item.stock > 0 && (
            <AppButton
              aria-pressed={isInCart}
              onClick={() => addToCart(item, 1)}
              style={{
                backgroundColor: isInCart ? "#27704a" : "", // Робимо зеленою, якщо вже в кошику
                borderColor: isInCart ? "#27704a" : "",
                color: isInCart ? "white" : "",
              }}
            >
              {isInCart ? "✓ В кошику (Додати ще)" : "Додати до кошика"}
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}
