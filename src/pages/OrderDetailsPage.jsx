import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder, deleteOrder } = useOrders();

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const order = orders.find((entry) => String(entry.id) === String(orderId));

  useEffect(() => {
    if (order && !status) {
      setStatus(order.status || "Нове");
    }
  }, [order, status]);

  if (!order) return <NotFoundPage title="Замовлення не знайдено" />;

  const handleUpdateStatus = async () => {
    setError("");
    setSuccess(false);
    const result = await updateOrder(order.id, { ...order, status });
    if (result.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Ховаємо повідомлення через 3 сек
    } else {
      setError("Помилка оновлення статусу");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Ви дійсно хочете назавжди видалити це замовлення?")) {
      await deleteOrder(order.id);
      navigate("/admin/orders", { replace: true });
    }
  };

  // Сумісність зі старими тестовими даними (де був лише 1 товар) та новими з кошика
  const orderItems =
    order.items ||
    (order.productId
      ? [
          {
            product: {
              id: order.productId,
              title: "Старий товар",
              price: order.totalPrice || 0,
            },
            quantity: order.quantity || 1,
          },
        ]
      : []);
  const customer = order.customer || {
    name: order.customerName,
    phone: order.phone,
    email: order.email || "Не вказано",
  };

  return (
    <section style={{ maxWidth: "1000px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link
          to="/admin/orders"
          style={{
            textDecoration: "none",
            color: "#686861",
            fontSize: "1.5rem",
          }}
        >
          ←
        </Link>
        <PageHeading title={`Замовлення #${order.id.toString().slice(-4)}`} />
      </div>

      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      {success && (
        <div className="operation-notice" style={{ marginBottom: "2rem" }}>
          <p role="status">Статус успішно оновлено!</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Ліва колонка: Інфо та товари */}
        <div>
          <div
            className="order-form-container"
            style={{ marginBottom: "2rem", padding: "1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Інформація про клієнта</h3>
              <Link
                to={`/admin/orders/${order.id}/edit`}
                className="action-btn action-btn-edit"
              >
                Редагувати дані
              </Link>
            </div>
            <dl
              className="details-list"
              style={{
                marginBottom: 0,
                border: "none",
                padding: 0,
                backgroundColor: "transparent",
              }}
            >
              <dt>Клієнт</dt>
              <dd>{customer.name}</dd>
              <dt>Телефон</dt>
              <dd>{customer.phone}</dd>
              <dt>Email</dt>
              <dd>{customer.email}</dd>
              <dt>Коментар</dt>
              <dd>{order.comment || "Немає коментаря"}</dd>
            </dl>
          </div>

          <div className="order-form-container" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Куплені товари</h3>
            <div className="table-scroll">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Назва товару</th>
                    <th>Ціна</th>
                    <th>К-сть</th>
                    <th>Сума</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: "bold" }}>
                        {item.product?.title || "Невідомий товар"}
                      </td>
                      <td>
                        {(item.product?.price || 0).toLocaleString("uk-UA")} ₴
                      </td>
                      <td>{item.quantity} шт.</td>
                      <td style={{ fontWeight: "bold" }}>
                        {(
                          (item.product?.price || 0) * item.quantity
                        ).toLocaleString("uk-UA")}{" "}
                        ₴
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Права колонка: Статус і Підсумок */}
        <div
          className="order-summary-container"
          style={{ position: "sticky", top: "1.5rem" }}
        >
          <h3>Керування</h3>

          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                color: "#a3aba8",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Статус замовлення
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginBottom: "1rem",
                backgroundColor: "#fffefa",
                border: "none",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            >
              <option value="Нове">Нове</option>
              <option value="В обробці">В обробці</option>
              <option value="Відправлено">Відправлено</option>
              <option value="Виконано">Виконано</option>
              <option value="Скасовано">Скасовано</option>
            </select>
            <AppButton
              onClick={handleUpdateStatus}
              style={{
                width: "100%",
                backgroundColor: "#e2ae79",
                color: "#253432",
                borderColor: "#e2ae79",
              }}
            >
              Оновити статус
            </AppButton>
          </div>

          <div
            style={{
              borderTop: "1px solid #40514c",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
            }}
          >
            <p
              style={{
                color: "#a3aba8",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                margin: "0 0 0.5rem 0",
              }}
            >
              Загальна сума
            </p>
            <p
              style={{
                fontSize: "1.8rem",
                margin: 0,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
            </p>
          </div>

          <button
            onClick={handleDelete}
            style={{
              width: "100%",
              padding: "0.8rem",
              background: "transparent",
              border: "1px solid #d32f2f",
              color: "#ffcdd2",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Видалити замовлення
          </button>
        </div>
      </div>
    </section>
  );
}
