import { Outlet, NavLink, useNavigate, Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";

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
      {/* Бокове меню (Sidebar) */}
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
          }}
        >
          Вийти з панелі
        </button>
      </aside>

      {/* Основна частина */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Верхня шапка (Header) */}
        <header
          style={{
            backgroundColor: "#fffefa",
            padding: "1.2rem 2rem",
            borderBottom: "1px solid #dedbd3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "1.2rem", margin: 0, color: "#1d2224" }}>
            Панель управління
          </h1>
          <span style={{ fontWeight: "600", color: "#4a504a" }}>
            Вітаємо, {user.name}
          </span>
        </header>

        {/* Контент сторінок */}
        <main style={{ padding: "2rem", overflowY: "auto", flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
