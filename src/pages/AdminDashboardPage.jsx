import { Link } from "react-router";
import { products } from "../data/products.js";
import { useOrders } from "../contexts/OrdersContext.jsx";

export default function AdminDashboardPage() {
  const { orders } = useOrders(); // Беремо актуальні замовлення з контексту

  // Рахуємо статистику
  const totalProducts = products.length;
  const newOrders = orders.filter(
    (o) => o.status === "new" || o.status === "Нове",
  ).length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );

  // Останні 3 замовлення для міні-таблиці
  const recentOrders = [...orders].reverse().slice(0, 3);

  const cardStyle = {
    background: "#fffefa",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #dedbd3",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    flex: "1 1 200px",
  };

  return (
    <section>
      <h2 style={{ marginTop: 0, color: "#1d2224", marginBottom: "2rem" }}>
        Огляд магазину
      </h2>

      {/* Картки статистики */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        <div style={cardStyle}>
          <h3
            style={{
              color: "#686861",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              margin: "0 0 0.5rem 0",
            }}
          >
            Всього товарів
          </h3>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
              color: "#253432",
            }}
          >
            {totalProducts}
          </p>
        </div>
        <div style={cardStyle}>
          <h3
            style={{
              color: "#686861",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              margin: "0 0 0.5rem 0",
            }}
          >
            Нових замовлень
          </h3>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
              color: "#bd5c38",
            }}
          >
            {newOrders}
          </p>
        </div>
        <div style={cardStyle}>
          <h3
            style={{
              color: "#686861",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              margin: "0 0 0.5rem 0",
            }}
          >
            Загальний дохід (приблизно)
          </h3>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
              color: "#27704a",
            }}
          >
            {totalRevenue.toLocaleString("uk-UA")} ₴
          </p>
        </div>
      </div>

      {/* Міні-таблиця останніх замовлень */}
      <div
        style={{
          background: "#fffefa",
          border: "1px solid #dedbd3",
          borderRadius: "8px",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0 }}>Останні замовлення</h3>
          <Link
            to="/admin/orders"
            style={{
              color: "#bd5c38",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Всі замовлення →
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Клієнт</th>
                <th>Сума</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.toString().slice(-4)}</td>
                  <td>{order.customer?.name || "Невідомий"}</td>
                  <td style={{ fontWeight: "bold" }}>
                    {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#686861" }}>Замовлень поки немає.</p>
        )}
      </div>
    </section>
  );
}
