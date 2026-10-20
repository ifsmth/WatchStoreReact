import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Phone,
  Edit3,
  KeyRound,
  LogOut,
  Clock,
  Package,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  // Filter orders related to this user
  const myOrders = (orders || []).filter(
    (order) =>
      order.customer?.email === user.email ||
      order.customer?.name === user.name,
  );

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "CC";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="chrono-container"
      style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
    >
      {/* Breadcrumbs */}
      <div className="chrono-breadcrumbs" style={{ marginBottom: "1.5rem" }}>
        <Link to="/" className="chrono-breadcrumb-link">
          Головна
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <span style={{ fontWeight: 700, color: "var(--chrono-emerald-950)" }}>
          Особистий кабінет
        </span>
      </div>

      {/* 1. Account Welcome Hero Banner */}
      <section className="chrono-account-banner" aria-label="Профіль клієнта">
        <div className="chrono-account-banner-inner">
          <div className="chrono-user-header">
            <div className="chrono-avatar-ring">{getInitials(user.name)}</div>
            <div>
              <span className="chrono-user-badge">
                <Sparkles size={12} /> ChronoClassic Club
              </span>
              <h1 className="chrono-user-greeting">Вітаємо, {user.name}!</h1>
              <p
                style={{
                  color: "rgba(209, 250, 229, 0.7)",
                  margin: 0,
                  fontSize: "0.875rem",
                  fontWeight: 300,
                }}
              >
                Особистий кабінет клієнта та історія покупок
              </p>
            </div>
          </div>

          <div className="chrono-account-actions-top">
            <Link
              to="/account/edit"
              className="chrono-btn-secondary"
              style={{ padding: "0.75rem 1.25rem", fontSize: "0.75rem" }}
            >
              <Edit3 size={15} /> Редагувати дані
            </Link>
            <Link
              to="/account/edit/password"
              className="chrono-btn-secondary"
              style={{ padding: "0.75rem 1.25rem", fontSize: "0.75rem" }}
            >
              <KeyRound size={15} /> Змінити пароль
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="chrono-btn-danger-outline"
              title="Вийти з акаунта"
            >
              <LogOut size={15} /> Вийти
            </button>
          </div>
        </div>
      </section>

      {/* 2. Personal Information Card */}
      <div className="chrono-account-card">
        <div className="chrono-card-head">
          <h2 className="chrono-card-head-title">
            <User size={20} color="#f59e0b" /> Персональні дані
          </h2>
          <Link
            to="/account/edit"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--chrono-amber-600)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            Змінити
          </Link>
        </div>

        <div className="chrono-user-details-grid">
          <div className="chrono-user-detail-item">
            <span className="chrono-detail-lbl">
              <User size={13} color="#f59e0b" /> ПІБ / Ім'я
            </span>
            <span className="chrono-detail-val">{user.name}</span>
          </div>

          <div className="chrono-user-detail-item">
            <span className="chrono-detail-lbl">
              <Mail size={13} color="#f59e0b" /> Електронна пошта
            </span>
            <span className="chrono-detail-val">{user.email}</span>
          </div>

          <div className="chrono-user-detail-item">
            <span className="chrono-detail-lbl">
              <Phone size={13} color="#f59e0b" /> Номер телефону
            </span>
            <span className="chrono-detail-val">
              {user.phone_number || user.phone || "Не вказано"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Order History Card */}
      <div className="chrono-account-card">
        <div className="chrono-card-head">
          <h2 className="chrono-card-head-title">
            <Clock size={20} color="#f59e0b" /> Історія замовлень
          </h2>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(6, 78, 59, 0.6)",
            }}
          >
            Всього: {myOrders.length}
          </span>
        </div>

        {myOrders.length > 0 ? (
          <div className="chrono-table-container">
            <table className="chrono-orders-table">
              <thead>
                <tr>
                  <th>№ Замовлення</th>
                  <th>Статус</th>
                  <th>Сума</th>
                  <th>Товари</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => {
                  const isNew =
                    order.status === "Нове" || order.status === "new";
                  const orderItemsCount =
                    order.items?.length || (order.productId ? 1 : 1);

                  return (
                    <tr key={order.id}>
                      <td
                        style={{
                          fontWeight: 800,
                          color: "var(--chrono-emerald-950)",
                        }}
                      >
                        #{order.id.toString().slice(-6)}
                      </td>
                      <td>
                        <span
                          className={`chrono-order-pill ${
                            isNew ? "new" : "completed"
                          }`}
                        >
                          {order.status || "В обробці"}
                        </span>
                      </td>
                      <td
                        style={{
                          fontWeight: 800,
                          color: "var(--chrono-amber-600)",
                          fontSize: "1rem",
                        }}
                      >
                        {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
                      </td>
                      <td
                        style={{
                          color: "rgba(6, 78, 59, 0.8)",
                          fontSize: "0.8125rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                          }}
                        >
                          <Package size={14} color="#f59e0b" />{" "}
                          {orderItemsCount} шт.
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/orders/${order.id}`}
                          className="chrono-btn-details"
                          style={{
                            width: "auto",
                            display: "inline-flex",
                            padding: "0.4rem 0.8rem",
                            fontSize: "0.7rem",
                          }}
                        >
                          <Eye size={13} color="#d97706" /> Деталі
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              padding: "3rem 1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingBag
              size={56}
              color="rgba(6, 78, 59, 0.2)"
              style={{ marginBottom: "1rem" }}
            />
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--chrono-emerald-950)",
                marginBottom: "0.5rem",
              }}
            >
              У вас поки немає замовлень
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(6, 78, 59, 0.6)",
                marginBottom: "1.5rem",
                maxWidth: "24rem",
              }}
            >
              Оберіть класичний наручний годинник у нашому каталозі та зробіть
              своє перше замовлення!
            </p>
            <Link to="/products" className="chrono-btn-primary">
              Перейти до каталогу
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
