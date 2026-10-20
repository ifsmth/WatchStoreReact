import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header
      style={{
        backgroundColor: "#fffefa",
        padding: "1.2rem 2rem",
        borderBottom: "1px solid #dedbd3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "1.2rem", margin: 0, color: "#1d2224" }}>
        Панель управління
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontWeight: "600", color: "#4a504a" }}>
          Вітаємо, {user?.name || "Адміністратор"}
        </span>
        <div
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: "#e2ae79",
            color: "#253432",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
}
