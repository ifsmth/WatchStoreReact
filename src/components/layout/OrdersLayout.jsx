import { NavLink, Outlet } from "react-router";
import OrderNotice from "../orders/OrderNotice";

export default function OrdersLayout() {
  return (
    <>
      <nav
        aria-label="Навігація розділом замовлень"
        style={{ marginBottom: "1rem" }}
      >
        <ul className="nav-list">
          <li>
            <NavLink to="." end>
              Список замовлень
            </NavLink>
          </li>
          <li>
            <NavLink to="new">Нове замовлення</NavLink>
          </li>
        </ul>
      </nav>

      <p>Локальні дані зберігаються до перезавантаження сторінки.</p>
      <OrderNotice />

      <Outlet />
    </>
  );
}
