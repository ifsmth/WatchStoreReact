import { useState } from "react";
import { useParams, Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import ProductImage from "../components/products/ProductImage.jsx";
import { getMainProductPhoto } from "../data/product_photos.js";
import { useCart } from "../contexts/CartContext.jsx";

export default function ProductDetailsPage({ items }) {
  const { productId } = useParams();
  const { addToCart, cartItems } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showNotice, setShowNotice] = useState(false);

  const product = items.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <section
        className="empty-state"
        style={{ textAlign: "center", marginTop: "3rem" }}
      >
        <h2>Товар не знайдено</h2>
        <p>Можливо, посилання застаріло або товар було видалено.</p>
        <Link
          className="app-button app-button-primary"
          to="/products"
          style={{ marginTop: "1rem" }}
        >
          Повернутися до каталогу
        </Link>
      </section>
    );
  }

  const mainPhoto = getMainProductPhoto(product.id);
  const isAlreadyInCart = cartItems.some(
    (item) => item.product.id === product.id,
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowNotice(true);
    // Ховаємо повідомлення через 5 секунд
    setTimeout(() => setShowNotice(false), 5000);
  };

  return (
    <article aria-labelledby="product-title">
      <div className="product-details-container">
        {/* Блок з фотографіями */}
        <div>
          <div className="product-gallery-main">
            {mainPhoto ? (
              <ProductImage src={mainPhoto.image_url} alt={product.title} />
            ) : (
              <div className="product-image-placeholder">
                <span>⌚</span>
                <small>Немає фото</small>
              </div>
            )}
          </div>
          {/* Тут у майбутньому можна додати map для мініатюр */}
        </div>

        {/* Блок з інформацією */}
        <div className="product-details-content">
          <PageHeading title={product.title} />
          <p className="price">
            <strong>{product.price.toLocaleString("uk-UA")} ₴</strong>
          </p>

          <div className="status-container">
            <StockBadge stock={product.stock} />
          </div>

          <h4 style={{ marginTop: "2rem" }}>Характеристики</h4>
          <ul
            className="product-specs-list"
            style={{ marginBottom: "2rem", lineHeight: "1.8" }}
          >
            <li>
              <strong>Бренд:</strong>{" "}
              {product.brand_id === 1
                ? "Casio"
                : product.brand_id === 3
                  ? "Orient"
                  : "Інший"}
            </li>
            <li>
              <strong>Гендер:</strong> {product.gender}
            </li>
            <li>
              <strong>Механізм:</strong> {product.mechanism}
            </li>
            <li>
              <strong>Скло:</strong> {product.glass}
            </li>
            <li>
              <strong>Матеріал ременю:</strong> {product.strap_material}
            </li>
            <li>
              <strong>Водозахист:</strong> {product.water_resistance}
            </li>
          </ul>

          <h4>Опис</h4>
          <p className="product-description-text">{product.description}</p>

          {/* Блок додавання до кошика */}
          <div
            style={{
              marginTop: "2.5rem",
              padding: "1.5rem",
              background: "#eeebe4",
              border: "1px solid #dedbd3",
            }}
          >
            {showNotice ? (
              <div style={{ color: "#27704a", fontWeight: "bold" }}>
                <p style={{ margin: "0 0 1rem 0" }}>
                  ✓ Товар успішно додано до кошика!
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Link to="/cart" className="app-button app-button-primary">
                    Перейти до кошика
                  </Link>
                  <AppButton
                    variant="secondary"
                    onClick={() => setShowNotice(false)}
                  >
                    Продовжити покупки
                  </AppButton>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
                <div
                  className="form-field"
                  style={{ margin: 0, width: "100px" }}
                >
                  <label htmlFor="qty">Кількість:</label>
                  <input
                    id="qty"
                    type="number"
                    min="1"
                    max={product.stock > 0 ? product.stock : 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={product.stock === 0}
                  />
                </div>
                <AppButton
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  style={{ flexGrow: 1 }}
                >
                  {isAlreadyInCart
                    ? "Додати ще (вже у кошику)"
                    : "Додати до кошика"}
                </AppButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
