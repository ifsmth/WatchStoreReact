import { Link } from "react-router";
import { Watch, Package, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { useOrders } from "../contexts/OrdersContext.jsx";
import { useCatalog } from "../contexts/CatalogContext.jsx";

export default function AdminDashboardPage() {
  const { orders } = useOrders();
  const { products } = useCatalog();

  // Рахуємо статистику
  const totalProducts = products.length;
  const newOrders = orders.filter(
    (o) => o.status === "new" || o.status === "Нове",
  ).length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );

  // Останні 4 замовлення для міні-таблиці
  const recentOrders = [...orders].reverse().slice(0, 4);

  return (
    <section>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Огляд магазину</h2>
          <p className="admin-page-subtitle">
            Загальна аналітика та останні дії в системі
          </p>
        </div>
      </div>

      {/* Картки статистики */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-head">
            <span className="admin-stat-label">Всього товарів</span>
            <div className="admin-stat-icon">
              <Watch size={20} />
            </div>
          </div>
          <p className="admin-stat-val">{totalProducts}</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-head">
            <span className="admin-stat-label">Нових замовлень</span>
            <div className="admin-stat-icon gold">
              <Package size={20} />
            </div>
          </div>
          <p className="admin-stat-val gold">{newOrders}</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-head">
            <span className="admin-stat-label">Загальний дохід</span>
            <div className="admin-stat-icon emerald">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="admin-stat-val emerald">
            {totalRevenue.toLocaleString("uk-UA")} ₴
          </p>
        </div>
      </div>

      {/* Міні-таблиця останніх замовлень */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h3 className="admin-card-title">
            <Clock size={18} />
            Останні замовлення
          </h3>
          <Link to="/admin/orders" className="admin-card-link">
            Всі замовлення <ArrowRight size={16} />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="admin-th-id">ID</th>
                  <th>Клієнт</th>
                  <th>Статус</th>
                  <th>Сума</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const isNew =
                    order.status === "Нове" || order.status === "new";
                  return (
                    <tr key={order.id}>
                      <td className="admin-cell-id">
                        #{String(order.id).slice(-4)}
                      </td>
                      <td className="admin-cell-name">
                        {order.customer?.name || "Невідомий"}
                      </td>
                      <td>
                        <span
                          className={`admin-badge ${isNew ? "admin-badge-warning" : "admin-badge-success"}`}
                        >
                          {order.status || "В обробці"}
                        </span>
                      </td>
                      <td className="admin-cell-price">
                        {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-empty-text">Замовлень поки немає.</p>
        )}
      </div>
    </section>
  );
}
