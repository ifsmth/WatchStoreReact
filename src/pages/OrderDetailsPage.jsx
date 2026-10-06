import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import useDeleteOrder from "../hooks/useDeleteOrder.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderDetailsPage({ items }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, isMutating } = useOrders();
  const deleteWithConfirmation = useDeleteOrder(items);
  const [error, setError] = useState("");

  const pageAlive = useRef(false);
  useEffect(() => {
    pageAlive.current = true;
    return () => {
      pageAlive.current = false;
    };
  }, []);

  const order = orders.find((entry) => entry.id === orderId);
  if (!order) return <NotFoundPage title="Замовлення не знайдено" />;

  const item = items.find(
    (entry) => String(entry.id) === String(order.productId),
  );

  async function handleDelete() {
    if (isMutating) return;
    setError("");

    const result = await deleteWithConfirmation(order);
    if (!pageAlive.current) return;

    if (result.ok) {
      navigate("/orders", { replace: true });
    } else if (!result.cancelled) {
      setError(result.message);
    }
  }

  return (
    <>
      <PageHeading title={`Замовлення ${order.id}`} />
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}

      <dl className="details-list">
        <dt>Обладнання</dt>
        <dd>{item?.title ?? "Товар відсутній у каталозі"}</dd>

        <dt>Замовник</dt>
        <dd>
          {order.customerName} ({order.phone})
        </dd>

        <dt>Кількість</dt>
        <dd>{order.quantity} шт.</dd>

        <dt>Коментар</dt>
        <dd>{order.comment || "Немає"}</dd>
      </dl>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Link to={`/orders/${encodeURIComponent(order.id)}/edit`}>
          <AppButton>Редагувати замовлення</AppButton>
        </Link>
        <AppButton
          variant="secondary"
          onClick={handleDelete}
          disabled={isMutating}
        >
          {isMutating ? "Опрацювання зміни…" : "Видалити замовлення"}
        </AppButton>
      </div>

      <p>
        <Link to="/orders" className="app-button app-button-primary">
          Повернутися до списку
        </Link>
      </p>
    </>
  );
}
