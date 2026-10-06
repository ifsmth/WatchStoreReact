import { useState } from "react";
import { Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import OrderFilters from "../components/orders/OrderFilters.jsx";
import OrderTable from "../components/orders/OrderTable.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";
import useOrderFilters from "../hooks/useOrderFilters.js";
import useDeleteOrder from "../hooks/useDeleteOrder.js";

export default function OrdersPage({ items }) {
  // Дістаємо reload та isMutating з контексту
  const { orders, reload, isMutating } = useOrders();
  const filters = useOrderFilters(orders, items);
  const deleteWithConfirmation = useDeleteOrder(items);
  const [error, setError] = useState("");

  async function handleDelete(order) {
    if (isMutating) return;
    setError("");
    const result = await deleteWithConfirmation(order);
    if (!result.ok && !result.cancelled) setError(result.message);
  }

  return (
    <>
      <PageHeading title="Керування замовленнями" />

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Link to="/orders/new">Створити нове замовлення</Link>
        {/* Кнопка оновлення */}
        <AppButton
          disabled={isMutating}
          onClick={() => void reload()}
          variant="secondary"
        >
          Оновити дані
        </AppButton>
      </div>

      <OrderFilters
        query={filters.query}
        sort={filters.sort}
        onQueryChange={filters.setQuery}
        onSortChange={filters.setSort}
        onReset={filters.resetFilters}
      />

      <p style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#555" }}>
        Показано: {filters.visibleOrders.length} із {orders.length}
      </p>

      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}

      {orders.length === 0 ? (
        <EmptyState title="Замовлень ще немає.">
          <p>
            <Link to="/products">Перейти до каталогу</Link>
          </p>
        </EmptyState>
      ) : filters.visibleOrders.length === 0 ? (
        <EmptyState title="За цими умовами нічого не знайдено.">
          <AppButton variant="secondary" onClick={filters.resetFilters}>
            Скинути умови
          </AppButton>
        </EmptyState>
      ) : (
        <OrderTable
          orders={filters.visibleOrders}
          items={items}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
