import { useNavigate } from "react-router";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import CartPage from "./OrderPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderCreatePage({ items }) {
  const navigate = useNavigate();
  const { selectedId, handleClearSelection } = useProductSelection();
  const { createOrder } = useOrders();

  // Якщо товар не обрано, показуємо заглушку
  if (!selectedId) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Спершу оберіть товар</h2>
        <button onClick={() => navigate("/products")}>
          Перейти до каталогу
        </button>
      </div>
    );
  }

  const item = items.find((entry) => String(entry.id) === String(selectedId));

  if (!item) {
    return <NotFoundPage title="Обладнання не знайдено" />;
  }

  function handleSave(input) {
    const result = createOrder(input);
    if (result.ok) {
      navigate(`/orders/${encodeURIComponent(result.record.id)}`, {
        replace: true,
      });
    }
    return result;
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
      onSave={handleSave}
      submitLabel="Створити замовлення"
      onCancel={handleCancel}
      cancelLabel="Скасувати чернетку й очистити вибір"
    />
  );
}
