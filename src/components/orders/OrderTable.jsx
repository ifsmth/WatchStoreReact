import { Link } from "react-router";
import AppButton from "../ui/AppButton.jsx";

export default function OrderTable({ orders, items, onDelete }) {
  return (
    <div className="table-scroll">
      <table className="requests-table">
        <caption>Замовлення локальної колекції</caption>
        <thead>
          <tr>
            <th scope="col">Годинник і Замовник</th>
            <th scope="col">Кількість</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const item = items.find(
              (entry) => String(entry.id) === String(order.productId),
            );
            const path = `/orders/${encodeURIComponent(order.id)}`;

            return (
              <tr key={order.id}>
                <td>
                  <strong>{item?.title ?? "Товар відсутній"}</strong>
                  <p style={{ margin: "0.25rem 0 0 0" }}>
                    {order.customerName}
                  </p>
                </td>
                <td>{order.quantity} шт.</td>
                <td>
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    <Link to={path}>Деталі</Link>
                    <Link to={`${path}/edit`}>Редагувати</Link>
                    <button
                      onClick={() => onDelete(order)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#c00",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
