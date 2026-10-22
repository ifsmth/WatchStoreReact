import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogIn, UserPlus, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Введіть ваше ім'я або ПІБ.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Введіть коректну електронну пошту.");
      return;
    }
    if (!formData.phone_number.trim()) {
      setError("Введіть номер телефону.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Пароль має містити мінімум 8 символів.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Паролі не збігаються!");
      return;
    }

    setSubmitting(true);
    const result = await register(
      formData.name.trim(),
      formData.email.trim(),
      formData.password,
      formData.phone_number.trim(),
    );
    setSubmitting(false);

    if (result.success) {
      showNotification(
        `Вітаємо, ${formData.name}! Реєстрацію успішно завершено.`,
      );
      setTimeout(() => navigate("/"), 1200);
    } else {
      setError(result.message || "Помилка під час реєстрації.");
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

      <div className="chrono-auth-card wide">
        {/* Form Switcher Tabs */}
        <div className="chrono-auth-tabs">
          <Link to="/login" className="chrono-auth-tab">
            <LogIn size={16} /> Вхід
          </Link>
          <button type="button" className="chrono-auth-tab active">
            <UserPlus size={16} /> Реєстрація
          </button>
        </div>

        <h1 className="chrono-auth-title">Створити акаунт</h1>
        <p className="chrono-auth-subtitle">
          Заповніть дані для реєстрації нового покупця та отримайте доступ до
          спеціальних пропозицій
        </p>

        {error && <div className="chrono-auth-error">{error}</div>}

        <form onSubmit={handleRegister} noValidate>
          {/* Name field */}
          <div className="chrono-form-group">
            <label className="chrono-label">ПІБ / Ім'я *</label>
            <input
              type="text"
              required
              placeholder="Олександр Ковальчук"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="chrono-input-light"
            />
          </div>

          {/* Email field */}
          <div className="chrono-form-group">
            <label className="chrono-label">Email адреса *</label>
            <input
              type="email"
              required
              placeholder="kovalchuk@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="chrono-input-light"
            />
          </div>

          {/* Phone field */}
          <div className="chrono-form-group">
            <label className="chrono-label">Номер телефону *</label>
            <input
              type="tel"
              required
              placeholder="+380 99 123 45 67"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              className="chrono-input-light"
            />
          </div>

          {/* Password field */}
          <div className="chrono-form-group">
            <label className="chrono-label">Пароль *</label>
            <input
              type="password"
              required
              placeholder="Мінімум 8 символів"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="chrono-input-light"
            />
          </div>

          {/* Confirm Password field */}
          <div className="chrono-form-group">
            <label className="chrono-label">Підтвердження пароля *</label>
            <input
              type="password"
              required
              placeholder="Повторіть пароль"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="chrono-input-light"
            />
          </div>

          <button
            type="submit"
            className="chrono-btn-auth-amber"
            style={{ marginTop: "1rem" }}
            disabled={submitting}
          >
            {submitting ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </form>

        <p
          style={{
            fontSize: "0.6875rem",
            textAlign: "center",
            color: "rgba(6, 78, 59, 0.5)",
            marginTop: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних
          відповідно до законодавства України.
        </p>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.75rem",
            color: "rgba(6, 78, 59, 0.6)",
          }}
        >
          Вже маєте акаунт?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--chrono-amber-600)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
