import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function AccountEditPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Ініціалізуємо форму поточними даними юзера
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Ім'я не може бути порожнім.");
      return;
    }

    const success = updateUser(name, phone);
    if (success) {
      navigate("/account"); // Повертаємось в кабінет
    } else {
      setError("Не вдалося оновити дані.");
    }
  };

  return (
    <section
      aria-labelledby="edit-profile-title"
      style={{ maxWidth: "450px", margin: "0 auto", padding: "2rem 0" }}
    >
      <PageHeading title="Редагування профілю" />

      <div className="order-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}

          <div className="form-field">
            <label htmlFor="email">Електронна пошта</label>
            {/* Пошту зазвичай не дають змінювати так просто, тому disabled */}
            <input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              style={{ background: "#f5f5f5", color: "#888" }}
            />
            <span className="field-hint">Пошту змінити неможливо</span>
          </div>

          <div className="form-field">
            <label htmlFor="name">Ім'я</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380..."
            />
          </div>

          <div
            className="form-actions"
            style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}
          >
            <AppButton
              type="submit"
              className="app-button app-button-primary"
              style={{ flex: 1 }}
            >
              Зберегти
            </AppButton>
            <Link to="/account" className="app-button app-button-secondary">
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
