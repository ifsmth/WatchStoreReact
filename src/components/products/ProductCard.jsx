import { useState } from "react";
import StockBadge from "./StockBadge.jsx";
import AppButton from "../ui/AppButton.jsx";
import ProductImage from "./ProductImage.jsx";
import { getMainProductPhoto } from "../../data/product_photos.js";

export default function ProductCard({ item, selected, onSelect }) {
  // Локальний стан для розгортання опису
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Унікальний ID для зв'язку кнопки розгортання з блоком тексту
  const descriptionId = `product-${item.id}-description`;
  const mainPhoto = getMainProductPhoto(item.id);

  return (
    <article className="product-card">
      <div className="product-card-image">
        <ProductImage src={mainPhoto?.image_url} alt={item.title} />
        {item.stock === 0 && (
          <span className="sold-out-label">Немає в наявності</span>
        )}
      </div>
      <div className="product-card-content">
        <h3>{item.title}</h3>
        <p className="price">
          <strong>{item.price.toLocaleString("uk-UA")} ₴</strong>
        </p>

        <ul className="details" style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Стать:</strong> {item.gender}
          </li>
          <li>
            <strong>Механізм:</strong> {item.mechanism}
          </li>
          <li>
            <strong>Скло:</strong> {item.glass}
          </li>
          <li>
            <strong>Водозахист:</strong> {item.water_resistance}
          </li>
        </ul>

        <p>
          <StockBadge stock={item.stock} />
        </p>

        {/* Кнопка керування локальним станом */}
        <AppButton
          variant="secondary"
          aria-expanded={detailsOpen}
          aria-controls={descriptionId}
          onClick={() => setDetailsOpen((previous) => !previous)}
        >
          {detailsOpen ? "Згорнути опис" : "Показати опис"}
        </AppButton>

        {/* Прихований/відкритий текст опису */}
        <p id={descriptionId} hidden={!detailsOpen} className="description">
          {item.description}
        </p>

        {/* Кнопка вибору товару для замовлення */}
        <p className="card-actions">
          <AppButton aria-pressed={selected} onClick={() => onSelect(item.id)}>
            Вибрати «{item.title}»
          </AppButton>
        </p>

        {selected && <p className="selection-note">Обрано для замовлення.</p>}
      </div>
    </article>
  );
}
