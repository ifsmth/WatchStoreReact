import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function AccountPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!oldPassword || !newPassword) {
      setError("Заповніть всі поля.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Новий пароль має містити мінімум 6 символів.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Нові паролі не збігаються.");
      return;
    }

    const success = updatePassword(oldPassword, newPassword);
    if (success) {
      alert("Пароль успішно змінено!"); // Можна використати Toast або Notice
      navigate("/account");
    }
  };

  return (
    <section
      aria-labelledby="change-password-title"
      style={{ maxWidth: "450px", margin: "0 auto", padding: "2rem 0" }}
    >
      <PageHeading title="Зміна пароля" />

      <div className="order-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}

          <div className="form-field">
            <label htmlFor="oldPassword">Старий пароль</label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-field" style={{ marginTop: "2rem" }}>
            <label htmlFor="newPassword">Новий пароль</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Підтвердження нового пароля</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Оновити пароль
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
