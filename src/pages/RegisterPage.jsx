import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Валідація
    if (!name.trim()) {
      setError("Введіть ваше ім'я.");
      return;
    }
    if (!email.includes("@")) {
      setError("Введіть коректну електронну пошту.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль має містити мінімум 6 символів.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не збігаються.");
      return;
    }

    // Спроба реєстрації
    const success = register(name, email, password);
    if (success) {
      navigate("/"); // Після успішної реєстрації перекидаємо на головну (або можна на /account)
    } else {
      setError("Сталася помилка під час реєстрації. Спробуйте ще раз.");
    }
  };

  return (
    <section
      aria-labelledby="register-title"
      style={{ maxWidth: "450px", margin: "0 auto", padding: "2rem 0" }}
    >
      <PageHeading title="Створення акаунта" />

      <div className="order-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}

          <div className="form-field">
            <label htmlFor="name">Ваше ім'я</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Іван Франко"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Електронна пошта</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Мінімум 6 символів"
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Підтвердження пароля</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторіть пароль"
            />
          </div>

          <div className="form-actions" style={{ marginTop: "2.5rem" }}>
            <AppButton
              type="submit"
              className="app-button app-button-primary"
              style={{ width: "100%" }}
            >
              Зареєструватися
            </AppButton>
          </div>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Вже маєте акаунт?{" "}
          <Link to="/login" style={{ color: "#bd5c38", fontWeight: "bold" }}>
            Увійти
          </Link>
        </p>
      </div>
    </section>
  );
}
