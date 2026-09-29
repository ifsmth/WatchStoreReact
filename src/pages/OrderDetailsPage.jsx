import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import useDeleteOrder from "../hooks/useDeleteOrder.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderDetailsPage({ items }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const deleteWithConfirmation = useDeleteOrder(items);
  const [error, setError] = useState("");

  const order = orders.find((entry) => entry.id === orderId);
  if (!order) return <NotFoundPage title="Замовлення не знайдено" />;

  const item = items.find(
    (entry) => String(entry.id) === String(order.productId),
  );

  function handleDelete() {
    setError("");
    const result = deleteWithConfirmation(order);
    if (result.ok) navigate("/orders", { replace: true });
    else if (!result.cancelled) setError(result.message);
  }

  return (
    <>
      <PageHeading title={`Замовлення ${order.id}`} />
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}

      <dl style={{ marginBottom: "2rem" }}>
        <dt>
          <strong>Обладнання</strong>
        </dt>
        <dd>{item?.title ?? "Товар відсутній у каталозі"}</dd>

        <dt>
          <strong>Замовник</strong>
        </dt>
        <dd>
          {order.customerName} ({order.phone})
        </dd>

        <dt>
          <strong>Кількість</strong>
        </dt>
        <dd>{order.quantity} шт.</dd>

        <dt>
          <strong>Коментар</strong>
        </dt>
        <dd>{order.comment || "Немає"}</dd>
      </dl>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Link to={`/orders/${encodeURIComponent(order.id)}/edit`}>
          <AppButton>Редагувати замовлення</AppButton>
        </Link>
        <AppButton variant="secondary" onClick={handleDelete}>
          Видалити замовлення
        </AppButton>
      </div>

      <p>
        <Link to="/orders">Повернутися до списку</Link>
      </p>
    </>
  );
}
