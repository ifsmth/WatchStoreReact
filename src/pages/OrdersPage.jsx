import { Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function OrdersPage({ orders, items }) {
  return (
    <>
      <PageHeading title="Список замовлень" />
      <p>Нижче наведено локальні демонстраційні замовлення.</p>

      {orders.length === 0 ? (
        <EmptyState title="Замовлень ще немає.">
          <p>
            <Link to="new">Оформити нове замовлення</Link>
          </p>
        </EmptyState>
      ) : (
        <div className="table-scroll">
          <table className="requests-table">
            <caption>Замовлення для перевірки навігації</caption>
            <thead>
              <tr>
                <th scope="col">Годинник</th>
                <th scope="col">Мета / Коментар</th>
                <th scope="col">Дія</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const item = items.find(
                  (entry) => String(entry.id) === String(order.productId),
                );
                return (
                  <tr key={order.id}>
                    <td>{item?.title ?? "Товар відсутній у каталозі"}</td>
                    <td>{order.purpose}</td>
                    <td>
                      <Link to={`${encodeURIComponent(order.id)}/edit`}>
                        Редагувати {order.id}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
