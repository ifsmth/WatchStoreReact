import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useOrders } from "../contexts/OrdersContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, updateOrderStatus, deleteOrder } = useOrders();

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
    const result = await updateOrderStatus(order.id, status);
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

  if (isAdmin) {
    return (
      <section className="admin-order-details">
        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-title-wrap">
            <Link
              to="/admin/orders"
              className="admin-back-btn"
              title="Назад до замовлень"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h2 className="admin-page-title">
                Замовлення #{order.id.toString().slice(-6)}
              </h2>
              <p className="admin-page-subtitle">
                Детальна інформація про вміст та статус доставки
              </p>
            </div>
          </div>
        </div>

        {error && <div className="admin-alert-error">{error}</div>}
        {success && (
          <div className="admin-alert-success">
            <CheckCircle2 size={16} />
            <span>Статус замовлення успішно оновлено!</span>
          </div>
        )}

        <div className="admin-order-grid">
          {/* Ліва колонка: Клієнт та товари */}
          <div>
            {/* Дані отримувача */}
            <div className="admin-card">
              <div className="admin-card-head">
                <h3 className="admin-card-title">
                  <User size={18} /> Інформація про отримувача
                </h3>
                <Link
                  to={`/admin/orders/${order.id}/edit`}
                  className="admin-card-head-link"
                >
                  Редагувати дані
                </Link>
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
                <div className="admin-order-comment">
                  <FileText size={16} color="#f59e0b" />
                  <span className="admin-order-comment-text">
                    <strong>Коментар:</strong> {order.comment}
                  </span>
                </div>
              )}
            </div>

            {/* Товари */}
            <div className="admin-card">
              <div className="admin-card-head">
                <h3 className="admin-card-title">
                  <Package size={18} /> Замовлені товари
                </h3>
                <span
                  className={`admin-badge ${
                    order.status === "Нове" || order.status === "new"
                      ? "admin-badge-warning"
                      : "admin-badge-success"
                  }`}
                >
                  {order.status || "В обробці"}
                </span>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
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
                        <td className="admin-cell-name">
                          {item.product?.title ||
                            item.product?.name ||
                            "Годинник"}
                        </td>
                        <td>
                          {(item.product?.price || 0).toLocaleString("uk-UA")} ₴
                        </td>
                        <td>{item.quantity} шт.</td>
                        <td className="admin-cell-price">
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

          {/* Права колонка: Керування замовленням */}
          <div className="admin-order-control-panel">
            <h3 className="admin-order-control-title">Керування</h3>

            <div className="admin-order-control-group">
              <label className="admin-order-control-label">
                Статус замовлення
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="admin-order-control-select"
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
                className="admin-btn admin-btn-accent admin-btn-block"
              >
                Оновити статус
              </button>
            </div>

            <div className="admin-order-summary-box">
              <p className="admin-order-summary-lbl">Загальна сума</p>
              <p className="admin-order-summary-price">
                {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="admin-btn admin-btn-danger admin-btn-block"
            >
              Видалити замовлення
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Customer View
  return (
    <section className="chrono-order-details-view">
      {/* Back link */}
      <div className="chrono-back-link-bar">
        <Link to="/account" className="chrono-back-link">
          <ArrowLeft size={18} />
          <span>До мого кабінету</span>
        </Link>
      </div>

      <div className="chrono-order-page-head">
        <h1 className="chrono-order-page-title">
          Замовлення #{order.id.toString().slice(-6)}
        </h1>
        <p className="chrono-order-page-subtitle">
          Детальна інформація про вміст та статус доставки
        </p>
      </div>

      {error && <div className="chrono-auth-error">{error}</div>}

      <div>
        {/* Customer info card */}
        <div className="chrono-account-card">
          <div className="chrono-card-head">
            <h3 className="chrono-card-head-title">
              <User size={18} color="#f59e0b" /> Інформація про отримувача
            </h3>
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
            <div className="chrono-order-comment-box">
              <FileText size={16} color="#f59e0b" />
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
                    <td className="chrono-font-bold">
                      {item.product?.title || item.product?.name || "Годинник"}
                    </td>
                    <td>
                      {(item.product?.price || 0).toLocaleString("uk-UA")} ₴
                    </td>
                    <td>{item.quantity} шт.</td>
                    <td className="chrono-price-gold">
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
          <div className="chrono-order-total-bar">
            <span className="chrono-order-total-lbl">Разом до сплати:</span>
            <span className="chrono-order-total-val">
              {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
