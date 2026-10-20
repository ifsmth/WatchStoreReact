import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import {
  ArrowLeft,
  Package,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, updateOrder, deleteOrder } = useOrders();

  const isAdmin = location.pathname.startsWith("/admin");

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
      setTimeout(() => setSuccess(false), 3000);
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
    <section style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Back link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link
          to={isAdmin ? "/admin/orders" : "/account"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "var(--chrono-emerald-950)",
            fontWeight: 700,
            fontSize: "0.875rem",
          }}
        >
          <ArrowLeft size={18} />{" "}
          {isAdmin ? "До панелі замовлень" : "До мого кабінету"}
        </Link>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--chrono-font-serif)",
            fontSize: "2rem",
            color: "var(--chrono-emerald-950)",
            margin: "0 0 0.5rem 0",
          }}
        >
          Замовлення #{order.id.toString().slice(-6)}
        </h1>
        <p
          style={{
            color: "rgba(6, 78, 59, 0.6)",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          Детальна інформація про вміст та статус доставки
        </p>
      </div>

      {error && <div className="chrono-auth-error">{error}</div>}
      {success && (
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10b981",
            color: "#065f46",
            padding: "0.75rem 1rem",
            borderRadius: "var(--chrono-radius-md)",
            marginBottom: "1.5rem",
            fontWeight: 600,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <CheckCircle2 size={16} /> Статус успішно оновлено!
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isAdmin ? "1fr 320px" : "1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Client Details & Items */}
        <div>
          {/* Customer info card */}
          <div
            className="chrono-account-card"
            style={{ marginBottom: "1.5rem" }}
          >
            <div className="chrono-card-head">
              <h3 className="chrono-card-head-title">
                <User size={18} color="#f59e0b" /> Інформація про отримувача
              </h3>
              {isAdmin && (
                <Link
                  to={`/admin/orders/${order.id}/edit`}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--chrono-amber-600)",
                    textDecoration: "none",
                  }}
                >
                  Редагувати дані
                </Link>
              )}
            </div>

            <div className="chrono-user-details-grid">
              <div className="chrono-user-detail-item">
                <span className="chrono-detail-lbl">
                  <User size={13} color="#f59e0b" /> Клієнт
                </span>
                <span className="chrono-detail-val">{customer.name}</span>
              </div>
              <div className="chrono-user-detail-item">
                <span className="chrono-detail-lbl">
                  <Phone size={13} color="#f59e0b" /> Телефон
                </span>
                <span className="chrono-detail-val">{customer.phone}</span>
              </div>
              <div className="chrono-user-detail-item">
                <span className="chrono-detail-lbl">
                  <Mail size={13} color="#f59e0b" /> Email
                </span>
                <span className="chrono-detail-val">{customer.email}</span>
              </div>
            </div>

            {order.comment && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.875rem",
                  backgroundColor: "rgba(236, 253, 245, 0.4)",
                  borderRadius: "var(--chrono-radius-md)",
                  border: "1px solid rgba(209, 250, 229, 0.6)",
                  fontSize: "0.75rem",
                  color: "rgba(6, 78, 59, 0.8)",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <FileText size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Коментар:</strong> {order.comment}
                </span>
              </div>
            )}
          </div>

          {/* Purchased Items Card */}
          <div className="chrono-account-card">
            <div className="chrono-card-head">
              <h3 className="chrono-card-head-title">
                <Package size={18} color="#f59e0b" /> Замовлені товари
              </h3>
              <span
                className={`chrono-order-pill ${
                  order.status === "Нове" || order.status === "new"
                    ? "new"
                    : "completed"
                }`}
              >
                {order.status || "В обробці"}
              </span>
            </div>

            <div className="chrono-table-container">
              <table className="chrono-orders-table">
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
                      <td style={{ fontWeight: 700 }}>
                        {item.product?.title ||
                          item.product?.name ||
                          "Годинник"}
                      </td>
                      <td>
                        {(item.product?.price || 0).toLocaleString("uk-UA")} ₴
                      </td>
                      <td>{item.quantity} шт.</td>
                      <td
                        style={{
                          fontWeight: 800,
                          color: "var(--chrono-amber-600)",
                        }}
                      >
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

            {/* Total box for customer view */}
            {!isAdmin && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "2px solid var(--chrono-emerald-100)",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--chrono-emerald-950)",
                  }}
                >
                  Разом до сплати:
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--chrono-amber-600)",
                  }}
                >
                  {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Admin controls only) */}
        {isAdmin && (
          <div
            style={{
              backgroundColor: "var(--chrono-emerald-950)",
              color: "#ffffff",
              padding: "1.5rem",
              borderRadius: "var(--chrono-radius-xl)",
              position: "sticky",
              top: "6rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--chrono-font-serif)",
                fontSize: "1.25rem",
                color: "var(--chrono-amber-400)",
                margin: "0 0 1.5rem 0",
              }}
            >
              Керування
            </h3>

            <div style={{ marginBottom: "1.5rem" }}>
              <label className="chrono-label">Статус замовлення</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="chrono-select"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <option value="Нове">Нове</option>
                <option value="В обробці">В обробці</option>
                <option value="Відправлено">Відправлено</option>
                <option value="Виконано">Виконано</option>
                <option value="Скасовано">Скасовано</option>
              </select>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="chrono-btn-primary"
                style={{ width: "100%", padding: "0.75rem" }}
              >
                Оновити статус
              </button>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(4, 120, 87, 0.5)",
                paddingTop: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  color: "rgba(209, 250, 229, 0.7)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  margin: "0 0 0.5rem 0",
                  fontWeight: 600,
                }}
              >
                Загальна сума
              </p>
              <p
                style={{
                  fontSize: "1.75rem",
                  margin: 0,
                  fontWeight: 800,
                  color: "var(--chrono-amber-400)",
                }}
              >
                {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="chrono-btn-danger-outline"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Видалити замовлення
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
