import { NavLink, Outlet } from "react-router";

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
      <Outlet />
    </>
  );
}
