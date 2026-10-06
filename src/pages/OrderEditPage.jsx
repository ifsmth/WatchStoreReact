import { useParams, useNavigate } from "react-router";
import { useRef, useEffect } from "react";
import { useOrders } from "../contexts/OrdersContext.jsx";
import CartPage from "./OrderPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderEditPage({ items }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useOrders();

  const order = orders.find((entry) => entry.id === orderId);

  const pageAlive = useRef(false);
  useEffect(() => {
    pageAlive.current = true;
    return () => {
      pageAlive.current = false;
    };
  }, []);

  const activeId = useRef(orderId);
  useEffect(() => {
    activeId.current = orderId;
    return () => {
      activeId.current = null;
    };
  }, [orderId]);

  if (!order) {
    return <NotFoundPage title="Замовлення не знайдено" />;
  }

  const item = items.find(
    (entry) => String(entry.id) === String(order.productId),
  );

  if (!item) {
    return <NotFoundPage title="Товар замовлення відсутній" />;
  }

  async function handleSave(input) {
    const result = await updateOrder(order.id, input);
    // Перевіряємо, чи сторінка активна і чи ID не змінився
    if (result.ok && pageAlive.current && activeId.current === order.id) {
      navigate(`/orders/${encodeURIComponent(result.record.id)}`, {
        replace: true,
      });
    }
    return result;
  }

  return (
    <CartPage
      key={`edit-${order.id}`}
      title={`Редагування замовлення ${order.id}`}
      item={item}
      initialDraft={{
        customerName: order.customerName,
        phone: order.phone,
        quantity: order.quantity,
        comment: order.comment,
      }}
      onSave={handleSave}
      submitLabel="Зберегти зміни"
      onCancel={() => navigate(`/orders/${encodeURIComponent(order.id)}`)}
      cancelLabel="Скасувати редагування"
    />
  );
}
