import { useState } from "react";
import { Link } from "react-router"; // Додано імпорт Link
import StockBadge from "./StockBadge.jsx";
import AppButton from "../ui/AppButton.jsx";
import ProductImage from "./ProductImage.jsx";
import { getMainProductPhoto } from "../../data/product_photos.js"; // Перевір шлях, можливо треба підправити

export default function ProductCard({ item, selected, onSelect }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const descriptionId = `product-${item.id}-description`;

  // Безпечне отримання фото (якщо файлу product_photos немає, фото просто не покажеться)
  let mainPhoto = null;
  try {
    mainPhoto = getMainProductPhoto(item.id);
  } catch (e) {
    /* Ігноруємо, якщо функції ще немає */
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
        {/* Робимо заголовок клікабельним */}
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

        {/* Кнопки дій */}
        <div
          className="card-actions"
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {/* Кнопка переходу на детальну сторінку */}
          <Link
            className="app-button app-button-secondary"
            to={`/products/${item.id}`}
          >
            Переглянути деталі
          </Link>

          {/* Кнопка кошика (поки що використовує старий onSelect, пізніше переробимо на реальний кошик) */}
          {onSelect && item.stock > 0 && (
            <AppButton
              aria-pressed={selected}
              onClick={() => onSelect(item.id)}
            >
              {selected ? "✓ В кошику" : "Додати до кошика"}
            </AppButton>
          )}
        </div>
      </div>
    </article>
  );
}
