import { useState } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck, LogIn } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@watch.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Викликаємо login і явно вказуємо, що чекаємо на роль "admin"
    const result = login(email, password, "admin");

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-icon-box">
          <ShieldCheck size={32} />
        </div>

        <h1 className="admin-login-title">Вхід в Адмінку</h1>
        <p className="admin-login-sub">
          Авторизація персоналу магазину ChronoClassic
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="admin-alert-error">{error}</div>}

          <div className="admin-form-group">
            <label htmlFor="adminEmail" className="admin-form-label">
              Пошта адміністратора
            </label>
            <input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              placeholder="admin@watch.com"
              required
            />
          </div>

          <div className="admin-form-group admin-form-group-mb">
            <label htmlFor="adminPassword" className="admin-form-label">
              Пароль
            </label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-accent admin-btn-block"
          >
            <LogIn size={18} />
            <span>Увійти в панель</span>
          </button>
        </form>
      </div>
    </div>
  );
}
