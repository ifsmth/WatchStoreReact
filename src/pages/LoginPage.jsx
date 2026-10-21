import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, LogIn, UserPlus, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailOrPhone.trim()) {
      setError("Введіть Email.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль має містити мінімум 6 символів.");
      return;
    }

    const result = login(emailOrPhone.trim(), password, "user");
    if (result.success) {
      showNotification("Ви успішно увійшли!");
      setTimeout(() => navigate("/"), 800);
    } else {
      setError(result.message || "Невірний email або пароль.");
    }
  };

  return (
    <div className="chrono-container chrono-auth-page">
      {/* Toast Notification */}
      {notification && (
        <div className="chrono-toast">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      <div className="chrono-auth-card">
        {/* Form Switcher Tabs */}
        <div className="chrono-auth-tabs">
          <button type="button" className="chrono-auth-tab active">
            <LogIn size={16} /> Вхід
          </button>
          <Link to="/register" className="chrono-auth-tab">
            <UserPlus size={16} /> Реєстрація
          </Link>
        </div>

        {/* User Icon */}
        <div className="chrono-auth-icon-circle">
          <User size={28} />
        </div>

        <h1 className="chrono-auth-title">Вхід до кабінету</h1>
        <p className="chrono-auth-subtitle">
          Введіть свої дані для доступу до персонального кабінету
        </p>

        {error && <div className="chrono-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="chrono-form-group">
            <label className="chrono-label">Email*</label>
            <input
              type="text"
              required
              placeholder="example@mail.com"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="chrono-input-light"
            />
          </div>

          <div className="chrono-form-group">
            <label className="chrono-label">Пароль *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="chrono-input-light"
            />
          </div>

          <button
            type="submit"
            className="chrono-btn-auth-dark"
            style={{ marginTop: "1rem" }}
          >
            Увійти
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "rgba(6, 78, 59, 0.6)",
          }}
        >
          Ще немає акаунта?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--chrono-amber-600)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
