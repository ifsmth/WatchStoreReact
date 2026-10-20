import { useState } from "react";
import { Link } from "react-router";
import AppButton from "../components/ui/AppButton.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";

export default function AdminOrdersPage() {
  const { orders, deleteOrder, reload } = useOrders();
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Ви дійсно хочете назавжди видалити це замовлення?")) {
      await deleteOrder(id);
    }
  };

  // Проста фільтрація замовлень (за ім'ям клієнта або ID)
  const filteredOrders = orders.filter((order) => {
    const customerName = order.customer?.name || order.customerName || "";
    return (
      customerName.toLowerCase().includes(search.toLowerCase()) ||
      String(order.id).includes(search)
    );
  });

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0, color: "#1d2224" }}>Управління замовленнями</h2>

        <AppButton onClick={() => reload && reload()} variant="secondary">
          Оновити дані
        </AppButton>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Пошук за клієнтом або ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem",
            border: "1px solid #a9aaa3",
          }}
        />
      </div>

      <div className="table-scroll">
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Клієнт</th>
              <th>Статус</th>
              <th>Сума</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const customerName =
                  order.customer?.name || order.customerName || "Невідомий";

                return (
                  <tr key={order.id}>
                    <td style={{ color: "#686861", fontWeight: "bold" }}>
                      #{String(order.id).slice(-4)}
                    </td>
                    <td style={{ fontWeight: "600" }}>{customerName}</td>
                    <td>
                      <span
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          backgroundColor:
                            order.status === "Нове" || order.status === "new"
                              ? "#fff9f9"
                              : "#f1f8f4",
                          color:
                            order.status === "Нове" || order.status === "new"
                              ? "#d32f2f"
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
                      <div className="table-actions">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="action-btn action-btn-view"
                        >
                          Деталі
                        </Link>
                        <Link
                          to={`/admin/orders/${order.id}/edit`}
                          className="action-btn action-btn-edit"
                        >
                          Редагувати
                        </Link>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="action-btn action-btn-delete"
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    color: "#686861",
                    padding: "2rem",
                  }}
                >
                  Замовлень не знайдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
