import { useEffect } from "react";
import { useOrders } from "../../contexts/OrdersContext.jsx";
import AppButton from "../ui/AppButton.jsx";

export default function OrderNotice() {
  const { notice, dismissNotice } = useOrders();

  // Автоматично приховуємо повідомлення через 5 секунд
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => {
        dismissNotice();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notice, dismissNotice]);

  // Якщо повідомлення немає — не рендеримо HTML-блок взагалі
  if (!notice) return null;

  return (
    <div className="operation-notice">
      <p role="status">{notice}</p>
      <AppButton variant="secondary" onClick={dismissNotice}>
        Закрити
      </AppButton>
    </div>
  );
}
