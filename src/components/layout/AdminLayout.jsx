import { Outlet, NavLink, useNavigate, Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";
import AdminHeader from "./AdminHeader.jsx";
import AdminFooter from "./AdminFooter.jsx";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Захист маршруту: якщо не адмін — викидаємо
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    padding: "0.75rem 1rem",
    color: isActive ? "#e2ae79" : "#d8ded8",
    backgroundColor: isActive ? "#182522" : "transparent",
    textDecoration: "none",
    fontWeight: "600",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    transition: "background 0.2s",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f7f5f0",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Бокове меню (Sidebar) залишається тут, бо воно частина структурної сітки */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#253432",
          color: "white",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            color: "#e2ae79",
            fontSize: "1.3rem",
            marginBottom: "2rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          WatchStore Admin
        </h2>

        <nav style={{ flexGrow: 1 }}>
          <NavLink to="/admin" end style={navLinkStyle}>
            📊 Дашборд
          </NavLink>
          <NavLink to="/admin/products" style={navLinkStyle}>
            ⌚ Товари
          </NavLink>
          <NavLink to="/admin/brands" style={navLinkStyle}>
            🏷️ Бренди
          </NavLink>
          <NavLink to="/admin/orders" style={navLinkStyle}>
            📦 Замовлення
          </NavLink>
          <NavLink to="/admin/users" style={navLinkStyle}>
            👥 Клієнти
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.75rem",
            backgroundColor: "transparent",
            color: "#e2ae79",
            border: "1px solid #e2ae79",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        >
          Вийти з панелі
        </button>
      </aside>

      {/* Основна частина */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Використовуємо наш новий ізольований компонент Header */}
        <AdminHeader />

        {/* Контент сторінок */}
        <main style={{ padding: "2rem", overflowY: "auto", flexGrow: 1 }}>
          <Outlet />
        </main>

        {/* Використовуємо наш новий ізольований компонент Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
