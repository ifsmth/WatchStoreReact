import { useOrders } from "../../contexts/OrdersContext.jsx";
import AppButton from "../ui/AppButton.jsx";

export default function OrdersGate({ children }) {
  const { status, error, reload } = useOrders();

  if (status === "loading") {
    return (
      <section
        aria-busy="true"
        aria-label="Замовлення"
        style={{ padding: "2rem 0", textAlign: "center" }}
      >
        <p role="status" style={{ fontSize: "1.1rem", color: "#686861" }}>
          Завантаження замовлень…
        </p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section aria-label="Помилка завантаження" style={{ padding: "2rem 0" }}>
        <p
          role="alert"
          className="field-error"
          style={{ marginBottom: "1rem" }}
        >
          {error}
        </p>
        <AppButton onClick={() => void reload()}>Спробувати ще раз</AppButton>
      </section>
    );
  }

  return children;
}
