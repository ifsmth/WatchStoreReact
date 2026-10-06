import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import CartPage from "./OrderPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function OrderCreatePage({ items }) {
  const navigate = useNavigate();
  const { selectedId, handleClearSelection } = useProductSelection();
  const { createOrder } = useOrders();

  // Захист від переходів, якщо компонент уже демонтовано
  const pageAlive = useRef(false);
  useEffect(() => {
    pageAlive.current = true;
    return () => {
      pageAlive.current = false;
    };
  }, []);

  // Якщо товар не обрано, показуємо заглушку
  if (!selectedId) {
    return (
      <div
        className="empty-state"
        style={{
          textAlign: "center",
          marginBlock: "2rem",
          paddingBlock: "4rem",
        }}
      >
        <span
          style={{
            fontSize: "3.5rem",
            display: "block",
            marginBottom: "1rem",
            opacity: 0.8,
          }}
        >
          ⌚
        </span>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
          Спершу оберіть товар
        </h2>
        <p
          style={{
            color: "#686861",
            marginBottom: "2rem",
            maxWidth: "400px",
            mx: "auto",
            display: "inline-block",
          }}
        >
          Для оформлення нового замовлення необхідно вибрати годинник з нашого
          каталогу.
        </p>
        <br />
        <AppButton onClick={() => navigate("/products")}>
          Перейти до каталогу
        </AppButton>
      </div>
    );
  }

  const item = items.find((entry) => String(entry.id) === String(selectedId));

  if (!item) {
    return <NotFoundPage title="Обладнання не знайдено" />;
  }

  async function handleSave(input) {
    const result = await createOrder(input); // Чекаємо на відповідь
    if (result.ok && pageAlive.current) {
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
