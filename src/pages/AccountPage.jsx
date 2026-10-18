import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <section
      aria-labelledby="account-title"
      style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 0" }}
    >
      <PageHeading title="Особистий кабінет" />

      <div className="order-form-container">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          Вітаємо, {user.name}!
        </h2>

        <dl className="details-list" style={{ marginBottom: "2rem" }}>
          <dt>Ім'я</dt>
          <dd>{user.name}</dd>
          <dt>Пошта</dt>
          <dd>{user.email}</dd>
          <dt>Телефон</dt>
          <dd>{user.phone || "Не вказано"}</dd>
        </dl>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {/* Ці дві сторінки ми зробимо на наступному кроці */}
          <Link to="/account/edit" className="app-button app-button-secondary">
            Змінити дані
          </Link>
          <Link
            to="/account/edit/password"
            className="app-button app-button-secondary"
          >
            Змінити пароль
          </Link>

          <AppButton
            onClick={logout}
            style={{
              marginLeft: "auto",
              color: "#d32f2f",
              borderColor: "#ffcdd2",
              backgroundColor: "#fff9f9",
            }}
          >
            Вийти з акаунта
          </AppButton>
        </div>
      </div>
    </section>
  );
}
