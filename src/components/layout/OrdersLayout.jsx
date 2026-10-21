import { Outlet, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import OrderNotice from "../orders/OrderNotice.jsx";
import OrdersGate from "../orders/OrdersGate.jsx";

export default function OrdersLayout() {
  return (
    <div className="chrono-container chrono-order-details-view">
      <div className="chrono-breadcrumbs">
        <Link to="/" className="chrono-breadcrumb-link">
          Головна
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <Link to="/account" className="chrono-breadcrumb-link">
          Особистий кабінет
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <span className="chrono-breadcrumb-current">Деталі замовлення</span>
      </div>

      <OrderNotice />

      <OrdersGate>
        <Outlet />
      </OrdersGate>
    </div>
  );
}
