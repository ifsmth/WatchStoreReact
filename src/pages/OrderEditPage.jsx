import { useParams, useNavigate } from "react-router";
import CartPage from "./OrderPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderEditPage({ orders, items }) {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // 1. Шукаємо замовлення за ID з адресного рядка
  const order = orders.find((entry) => entry.id === orderId);

  // Якщо такого замовлення взагалі немає в orders.js
  if (!order) {
    return (
      <NotFoundPage
        title="Замовлення не знайдено"
        message="Запит з таким ідентифікатором не існує в системі."
      />
    );
  }

  // 2. Безпечно шукаємо товар (переводимо обидва ID в рядки для уникнення проблем з типами)
  const item = items.find(
    (entry) => String(entry.id) === String(order.productId),
  );

  return (
    <CartPage
      key={`edit-${order.id}`} // Обов'язковий ключ для скидання форми при переході між записами
      title={`Редагування замовлення ${order.id}`}
      item={item}
      initialDraft={{
        customerName: order.customerName || "",
        customerPhone: order.phone || "",
        comment: order.purpose || "",
      }}
      onCancel={() => navigate("/orders")}
      cancelLabel="Повернутися до списку замовлень"
    />
  );
}
