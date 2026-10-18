import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Введіть коректну електронну пошту.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль має містити мінімум 6 символів.");
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate("/"); // Після входу перекидаємо на головну
    } else {
      setError("Помилка входу. Спробуйте ще раз.");
    }
  };

  return (
    <section
      aria-labelledby="login-title"
      style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem 0" }}
    >
      <PageHeading title="Вхід в акаунт" />

      <div className="order-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}

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
              placeholder="••••••••"
            />
          </div>

          <div className="form-actions" style={{ marginTop: "2rem" }}>
            <AppButton
              type="submit"
              className="app-button app-button-primary"
              style={{ width: "100%" }}
            >
              Увійти
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
          Ще немає акаунта?{" "}
          <Link to="/register" style={{ color: "#bd5c38", fontWeight: "bold" }}>
            Зареєструватися
          </Link>
        </p>
      </div>
    </section>
  );
}
