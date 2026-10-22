import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Save,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AccountEditPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone_number || user?.phone || "");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Ім'я не може бути порожнім.");
      return;
    }

    setSubmitting(true);
    const success = await updateUser(name.trim(), phone.trim());
    setSubmitting(false);
    if (success) {
      setNotification("Дані успішно оновлено!");
      setTimeout(() => navigate("/account"), 1000);
    } else {
      setError("Не вдалося оновити дані. Спробуйте ще раз.");
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
          Редагування даних
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
            <User size={28} />
          </div>

          <h1 className="chrono-auth-title">Редагування профілю</h1>
          <p className="chrono-auth-subtitle">
            Оновіть своє ім'я та контактний номер телефону
          </p>

          {error && <div className="chrono-auth-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email (Readonly) */}
            <div className="chrono-form-group">
              <label
                className="chrono-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <Mail size={13} color="#f59e0b" /> Електронна пошта
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="chrono-input-light"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    color: "rgba(6, 78, 59, 0.6)",
                    cursor: "not-allowed",
                  }}
                />
                <Lock
                  size={14}
                  color="#9ca3af"
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "rgba(6, 78, 59, 0.5)",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                Електронна пошта закріплена за вашим обліковим записом
              </span>
            </div>

            {/* Name */}
            <div className="chrono-form-group">
              <label
                className="chrono-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <User size={13} color="#f59e0b" /> ПІБ / Ім'я *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Олександр Ковальчук"
                className="chrono-input-light"
              />
            </div>

            {/* Phone */}
            <div className="chrono-form-group">
              <label
                className="chrono-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <Phone size={13} color="#f59e0b" /> Номер телефону
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 99 123 45 67"
                className="chrono-input-light"
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                type="submit"
                className="chrono-btn-primary"
                style={{ flex: 1, padding: "0.875rem" }}
                disabled={submitting}
              >
                <Save size={16} /> {submitting ? "Збереження..." : "Зберегти зміни"}
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
