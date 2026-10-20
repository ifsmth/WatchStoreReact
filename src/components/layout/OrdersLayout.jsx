import { Outlet, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import OrderNotice from "../orders/OrderNotice.jsx";
import OrdersGate from "../orders/OrdersGate.jsx";

export default function OrdersLayout() {
  return (
    <div
      className="chrono-container"
      style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
    >
      <div className="chrono-breadcrumbs" style={{ marginBottom: "1.5rem" }}>
        <Link to="/" className="chrono-breadcrumb-link">
          Головна
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <Link to="/account" className="chrono-breadcrumb-link">
          Особистий кабінет
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <span style={{ fontWeight: 700, color: "var(--chrono-emerald-950)" }}>
          Деталі замовлення
        </span>
      </div>

      <OrderNotice />

      <OrdersGate>
        <Outlet />
      </OrdersGate>
    </div>
  );
}
