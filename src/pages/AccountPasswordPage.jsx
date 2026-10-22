import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  KeyRound,
  Lock,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Save,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AccountPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!oldPassword || !newPassword) {
      setError("Будь ласка, заповніть всі обов'язкові поля.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Новий пароль має містити мінімум 8 символів.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Нові паролі не збігаються.");
      return;
    }

    const result = await updatePassword(oldPassword, newPassword);
    if (result && (result.success || result === true)) {
      setNotification("Пароль успішно змінено!");
      setTimeout(() => navigate("/account"), 1000);
    } else {
      setError(result?.message || "Невірний поточний пароль.");
    }
  };

  return (
    <div
      className="chrono-container"
      style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="chrono-toast">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="chrono-breadcrumbs" style={{ marginBottom: "1.5rem" }}>
        <Link to="/" className="chrono-breadcrumb-link">
          Головна
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <Link to="/account" className="chrono-breadcrumb-link">
          Особистий кабінет
        </Link>
        <ChevronRight size={14} color="#f59e0b" />
        <span style={{ fontWeight: 700, color: "var(--chrono-emerald-950)" }}>
          Зміна пароля
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="chrono-auth-card wide">
          <Link
            to="/account"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--chrono-emerald-950)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1.5rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> До кабінету
          </Link>

          <div className="chrono-auth-icon-circle">
            <KeyRound size={28} />
          </div>

          <h1 className="chrono-auth-title">Зміна пароля</h1>
          <p className="chrono-auth-subtitle">
            Введіть старий пароль та створіть новий для вашого акаунта
          </p>

          {error && <div className="chrono-auth-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Old Password */}
            <div className="chrono-form-group">
              <label
                className="chrono-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <Lock size={13} color="#f59e0b" /> Поточний пароль *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="chrono-input-light"
              />
            </div>

            {/* New Password */}
            <div className="chrono-form-group" style={{ marginTop: "1.5rem" }}>
              <label
                className="chrono-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <KeyRound size={13} color="#f59e0b" /> Новий пароль *
              </label>
              <input
                type="password"
                required
                placeholder="Мінімум 8 символів"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="chrono-input-light"
              />
            </div>

            {/* Confirm New Password */}
            <div className="chrono-form-group">
              <label
                className="chrono-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <ShieldCheck size={13} color="#f59e0b" /> Підтвердження нового
                пароля *
              </label>
              <input
                type="password"
                required
                placeholder="Повторіть новий пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="chrono-input-light"
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                type="submit"
                className="chrono-btn-primary"
                style={{ flex: 1, padding: "0.875rem" }}
              >
                <Save size={16} /> Оновити пароль
              </button>
              <Link
                to="/account"
                className="chrono-btn-secondary"
                style={{
                  padding: "0.875rem 1.5rem",
                  color: "var(--chrono-emerald-950)",
                  borderColor: "var(--chrono-emerald-200)",
                }}
              >
                Скасувати
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
