import { Link, useNavigate, useSearchParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
// Використаємо нашу форму кошика, адаптовану під редагування
import CartPage from "./OrderPage.jsx";

export default function OrderCreatePage({ items }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedId, handleClearSelection } = useProductSelection();

  const productId = searchParams.get("productId");

  if (!productId) {
    const lastSelectionSearch = selectedId
      ? `?${new URLSearchParams({ productId: selectedId })}`
      : null;

    return (
      <>
        <PageHeading title="Нове замовлення" />
        <EmptyState title="Спочатку виберіть товар у каталозі.">
          <p>
            <Link to="/products">Відкрити каталог</Link>
          </p>
          {lastSelectionSearch && (
            <p>
              <Link to={`/orders/new${lastSelectionSearch}`}>
                Використати останній вибір
              </Link>
            </p>
          )}
        </EmptyState>
      </>
    );
  }

  const item = items.find((entry) => String(entry.id) === String(productId));

  if (!item) {
    return (
      <NotFoundPage
        title="Неможливо оформити замовлення"
        message="Товар із параметра productId відсутній у каталозі."
      />
    );
  }

  function handleCancel() {
    handleClearSelection();
    navigate("/products", { replace: true });
  }

  return (
    <CartPage
      key={`new-${item.id}`}
      title="Нове замовлення"
      item={item}
      onCancel={handleCancel}
      cancelLabel="Скасувати й очистити вибір"
    />
  );
}
