import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <h1 className="admin-header-title">Панель управління</h1>

      <div className="admin-header-user">
        <span className="admin-header-greeting">
          Вітаємо, {user?.name || "Адміністратор"}
        </span>
        <div className="admin-avatar">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
}
