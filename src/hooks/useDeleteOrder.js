import { useOrders } from "../contexts/OrdersContext.jsx";

export default function useDeleteOrder(items) {
  const { deleteOrder } = useOrders();

  return function deleteWithConfirmation(order) {
    const item = items.find(
      (entry) => String(entry.id) === String(order.productId),
    );
    const name = item?.title ?? order.productId;

    const confirmed = window.confirm(
      `Видалити замовлення ${order.id} на «${name}»?\nЗапис буде вилучено з поточної колекції. Скасування видалення не передбачено.`,
    );

    if (!confirmed) return { ok: false, cancelled: true };
    return deleteOrder(order.id);
  };
}
