import { useState } from "react";
import { Link } from "react-router";
import { Search, RefreshCw, Eye, Trash2 } from "lucide-react";
import { useOrders } from "../../contexts/OrdersContext.jsx";

export default function AdminOrdersPage() {
  const { orders, deleteOrder, reload } = useOrders();
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Ви дійсно хочете назавжди видалити це замовлення?")) {
      await deleteOrder(id);
    }
  };

  // Фільтрація замовлень (за ім'ям клієнта або ID)
  const filteredOrders = orders.filter((order) => {
    const customerName = order.customer?.name || order.customerName || "";
    return (
      customerName.toLowerCase().includes(search.toLowerCase()) ||
      String(order.id).includes(search)
    );
  });

  return (
    <section>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Управління замовленнями</h2>
          <p className="admin-page-subtitle">
            Перегляд та зміна статусів замовлень, оформлених клієнтами
          </p>
        </div>

        <button
          type="button"
          onClick={() => reload && reload()}
          className="admin-btn admin-btn-secondary"
        >
          <RefreshCw size={15} />
          <span>Оновити дані</span>
        </button>
      </div>

      <div className="admin-filter-bar">
        <div className="admin-search-wrap">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Пошук за клієнтом або ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input admin-search-input"
          />
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th-id">ID</th>
              <th>Клієнт</th>
              <th>Статус</th>
              <th>Сума</th>
              <th className="admin-th-actions-lg">Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const customerName =
                  order.customer?.name || order.customerName || "Невідомий";
                const isNew = order.status === "Нове" || order.status === "new";

                return (
                  <tr key={order.id}>
                    <td className="admin-cell-id">
                      #{String(order.id).slice(-4)}
                    </td>
                    <td className="admin-cell-name">{customerName}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          isNew ? "admin-badge-warning" : "admin-badge-success"
                        }`}
                      >
                        {order.status || "В обробці"}
                      </span>
                    </td>
                    <td className="admin-cell-price">
                      {(order.totalPrice || 0).toLocaleString("uk-UA")} ₴
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          title="Деталі"
                        >
                          <Eye size={13} />
                          <span>Деталі</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          title="Видалити"
                        >
                          <Trash2 size={13} />
                          <span>Видалити</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="admin-empty-cell">
                  Замовлень за вказаними критеріями не знайдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
