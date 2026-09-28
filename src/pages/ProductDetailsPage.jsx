import { Link, useNavigate, useParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ProductDetailsPage({ items }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleSelect } = useProductSelection();

  // Шукаємо товар за ID з URL
  const item = items.find((entry) => String(entry.id) === String(productId));

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
      <div
        className="product-details-container"
        style={{ display: "grid", gap: "1rem" }}
      >
        <p className="price" style={{ fontSize: "1.5rem", margin: 0 }}>
          <strong>{item.price.toLocaleString("uk-UA")} ₴</strong>
        </p>

        <div className="specs">
          <h4 style={{ marginBottom: "0.5rem" }}>Характеристики:</h4>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "0.5rem",
            }}
          >
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
          <h4 style={{ marginBottom: "0.5rem" }}>Опис:</h4>
          <p style={{ margin: 0 }}>{item.description}</p>
        </div>

        <div className="status-container" style={{ marginBlock: "1rem" }}>
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
    </>
  );
}
