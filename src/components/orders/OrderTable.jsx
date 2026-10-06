import { Link } from "react-router";

export default function OrderTable({ orders, items, onDelete, isMutating }) {
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
                  {/* Використовуємо нові класи для контейнера та кнопок */}
                  <div className="table-actions">
                    <Link to={path} className="action-btn action-btn-view">
                      Деталі
                    </Link>

                    <Link
                      to={`${path}/edit`}
                      className="action-btn action-btn-edit"
                    >
                      Редагувати
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(order)}
                      className="action-btn action-btn-delete"
                      disabled={isMutating}
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
