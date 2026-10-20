import { useState } from "react";
import { useNavigate } from "react-router";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#253432",
      }}
    >
      <div
        style={{
          backgroundColor: "#fffefa",
          padding: "3rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1d2224",
            marginBottom: "0.5rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Вхід в Адмінку
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#686861",
            marginBottom: "2rem",
            fontSize: "0.9rem",
          }}
        >
          Тільки для персоналу магазину
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p
              style={{
                color: "#d32f2f",
                backgroundColor: "#fff9f9",
                padding: "0.8rem",
                borderLeft: "4px solid #d32f2f",
                marginBottom: "1.5rem",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}

          <div style={{ marginBottom: "1.2rem" }}>
            <label
              htmlFor="adminEmail"
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontWeight: "bold",
                fontSize: "0.85rem",
              }}
            >
              Пошта адміністратора
            </label>
            <input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #a9aaa3",
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label
              htmlFor="adminPassword"
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontWeight: "bold",
                fontSize: "0.85rem",
              }}
            >
              Пароль
            </label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #a9aaa3",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#bd5c38",
              color: "white",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Увійти в панель
          </button>
        </form>
      </div>
    </div>
  );
}
