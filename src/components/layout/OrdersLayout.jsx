import { NavLink, Outlet } from "react-router";
import OrderNotice from "../orders/OrderNotice.jsx";
import OrdersGate from "../orders/OrdersGate.jsx";

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

      {/* Оновлене пояснення: */}
      <p>Дані зберігаються локально у пам'яті браузера (localStorage).</p>
      <OrderNotice />

      {/* Захищаємо вкладені сторінки від рендеру, поки йде завантаження */}
      <OrdersGate>
        <Outlet />
      </OrdersGate>
    </>
  );
}
