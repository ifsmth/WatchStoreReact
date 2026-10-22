import { Outlet, NavLink, useNavigate, Navigate } from "react-router";
import {
  LayoutDashboard,
  Watch,
  Tag,
  Package,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useMessages } from "../../contexts/MessagesContext.jsx";
import AdminHeader from "./AdminHeader.jsx";
import AdminFooter from "./AdminFooter.jsx";

export default function AdminLayout() {
  const { user, ready, logout } = useAuth();
  const { newCount } = useMessages();
  const navigate = useNavigate();

  if (!ready) {
    return null;
  }

  // Захист маршруту: якщо не адмін — викидаємо
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Бокове меню (Sidebar) */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-icon">
            <Watch size={24} />
          </div>
          <div>
            <h2 className="admin-sidebar-logo">ChronoClassic</h2>
            <span className="admin-sidebar-tag">Панель керування</span>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <LayoutDashboard size={18} />
            <span>Дашборд</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Watch size={18} />
            <span>Товари</span>
          </NavLink>

          <NavLink
            to="/admin/brands"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Tag size={18} />
            <span>Бренди</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Package size={18} />
            <span>Замовлення</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Users size={18} />
            <span>Клієнти</span>
          </NavLink>

          <NavLink
            to="/admin/messages"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <MessageSquare size={18} />
            <span>Повідомлення</span>
            {newCount > 0 && (
              <span className="admin-nav-badge">{newCount}</span>
            )}
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            type="button"
            onClick={handleLogout}
            className="admin-btn-logout"
          >
            <LogOut size={16} />
            <span>Вийти з панелі</span>
          </button>
        </div>
      </aside>

      {/* Основна частина */}
      <div className="admin-main-wrap">
        <AdminHeader />

        <main className="admin-content">
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
