import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx"; // Додаємо контекст замовлень
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders(); // Отримуємо всі замовлення

  // Фільтруємо замовлення: шукаємо ті, де ім'я або пошта збігається з поточним юзером
  // (В реальному проєкті тут би порівнювався user.id)
  const myOrders = orders.filter(
    (order) =>
      order.customer?.email === user.email ||
      order.customer?.name === user.name,
  );

  return (
    <section
      aria-labelledby="account-title"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 0" }}
    >
      <PageHeading title="Особистий кабінет" />

      {/* Блок з особистими даними */}
      <div className="order-form-container" style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          Вітаємо, {user.name}!
        </h2>

        <dl className="details-list" style={{ marginBottom: "2rem" }}>
          <dt>Ім'я</dt>
          <dd>{user.name}</dd>
          <dt>Пошта</dt>
          <dd>{user.email}</dd>
          <dt>Телефон</dt>
          <dd>{user.phone || "Не вказано"}</dd>
        </dl>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/account/edit" className="app-button app-button-secondary">
            Змінити дані
          </Link>
          <Link
            to="/account/edit/password"
            className="app-button app-button-secondary"
          >
            Змінити пароль
          </Link>

          <AppButton
            onClick={logout}
            style={{
              marginLeft: "auto",
              color: "#d32f2f",
              borderColor: "#ffcdd2",
              backgroundColor: "#fff9f9",
            }}
          >
            Вийти з акаунта
          </AppButton>
        </div>
      </div>

      {/* НОВИЙ БЛОК: Історія замовлень */}
      <div className="order-form-container">
        <h3
          style={{
            fontSize: "1.3rem",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #dedbd3",
            paddingBottom: "1rem",
          }}
        >
          Історія замовлень
        </h3>

        {myOrders.length > 0 ? (
          <div className="table-scroll">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>№ Замовлення</th>
                  <th>Статус</th>
                  <th>Сума</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: "bold" }}>
                      #{order.id.toString().slice(-4)}
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          backgroundColor:
                            order.status === "Нове" || order.status === "new"
                              ? "#e7e8e0"
                              : "#f1f8f4",
                          color:
                            order.status === "Нове" || order.status === "new"
                              ? "#4a504a"
                              : "#27704a",
                        }}
                      >
                        {order.status || "В обробці"}
                      </span>
                    </td>
                    <td style={{ fontWeight: "bold", color: "#a74f30" }}>
                      {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
                    </td>
                    <td>
                      {/* Оскільки детальна сторінка тепер в адмінці, клієнту можна просто вивести текст або зробити окрему сторінку деталей для клієнта. Поки залишимо текст. */}
                      <span style={{ fontSize: "0.85rem", color: "#686861" }}>
                        Перегляд недоступний
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p
            style={{ color: "#686861", textAlign: "center", padding: "2rem 0" }}
          >
            Ви ще не зробили жодного замовлення.
          </p>
        )}
      </div>
    </section>
  );
}
