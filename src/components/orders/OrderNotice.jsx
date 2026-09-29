import { useOrders } from "../../contexts/OrdersContext.jsx";
import AppButton from "../ui/AppButton.jsx";

export default function OrderNotice() {
  const { notice, dismissNotice } = useOrders();

  return (
    <div className="operation-notice">
      <p role="status">{notice}</p>
      {notice && (
        <AppButton variant="secondary" onClick={dismissNotice}>
          Закрити повідомлення
        </AppButton>
      )}
    </div>
  );
}
