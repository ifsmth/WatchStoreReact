import { NavLink, Outlet } from "react-router";
import OrderNotice from "../orders/OrderNotice.jsx";
import OrdersGate from "../orders/OrdersGate.jsx";

export default function OrdersLayout() {
  return (
    <>
      <nav aria-label="Навігація розділом замовлень" className="orders-nav">
        <NavLink to="." end>
          Список замовлень
        </NavLink>
        <NavLink to="new">Нове замовлення</NavLink>
      </nav>

      <div className="info-banner">
        Дані зберігаються локально у пам'яті браузера (localStorage).
      </div>

      <OrderNotice />

      <OrdersGate>
        <Outlet />
      </OrdersGate>
    </>
  );
}
