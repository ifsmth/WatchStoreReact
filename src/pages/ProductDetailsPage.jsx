import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import ProductImage from "../components/products/ProductImage.jsx";
import { getProductPhotos } from "../data/product_photos.js";

export default function ProductDetailsPage({ items }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleSelect } = useProductSelection();

  // Шукаємо товар за ID з URL
  const item = items.find((entry) => String(entry.id) === String(productId));
  const photos = getProductPhotos(Number(productId));
  const mainPhoto = photos.find((photo) => photo.is_main) ?? photos[0];
  const [activePhoto, setActivePhoto] = useState(mainPhoto);

  if (!item) {
    return (
      <NotFoundPage
        title="Товар не знайдено"
        message="У локальному каталозі немає годинника з таким ідентифікатором."
      />
    );
  }

  function handlePrepareOrder() {
    handleSelect(item.id);
    const search = new URLSearchParams({ productId: item.id });
    navigate(`/orders/new?${search}`);
  }

  return (
    <>
      <PageHeading title={item.title} />
      <div className="product-details-container">
        <div className="product-gallery">
          <ProductImage
            key={activePhoto?.id}
            src={activePhoto?.image_url}
            alt={item.title}
            className="product-gallery-main"
          />
          {photos.length > 1 && (
            <div className="product-thumbnails" aria-label="Інші фото товару">
              {photos.map((photo, index) => (
                <button
                  className={
                    photo.id === activePhoto?.id
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  type="button"
                  key={photo.id}
                  aria-label={`Показати фото ${index + 1}`}
                  aria-pressed={photo.id === activePhoto?.id}
                  onClick={() => setActivePhoto(photo)}
                >
                  <ProductImage src={photo.image_url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-details-content">
          <p className="price">
            <strong>{item.price.toLocaleString("uk-UA")} ₴</strong>
          </p>

          <div className="specs">
            <h4>Характеристики</h4>
            <ul className="product-specs-list">
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
                <strong>Матеріал ремінця:</strong> {item.strap_material}
              </li>
              <li>
                <strong>Водозахист:</strong> {item.water_resistance}
              </li>
            </ul>
          </div>

          <div className="description">
            <h4>Опис</h4>
            <p className="product-description-text">{item.description}</p>
          </div>

          <div className="status-container">
            <StockBadge stock={item.stock} />
          </div>

          <div className="form-actions">
            <AppButton onClick={handlePrepareOrder} disabled={item.stock === 0}>
              Вибрати й підготувати замовлення
            </AppButton>
          </div>

          <p>
            <Link to="/products">До каталогу без фільтрів</Link>
          </p>
        </div>
      </div>
    </>
  );
}
