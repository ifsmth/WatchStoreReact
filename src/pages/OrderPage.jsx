import { useState, useEffect } from "react";
import Section from "../components/ui/Section.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import OrderForm from "../components/orders/OrderForm.jsx";
import OrderSummary from "../components/orders/OrderSummary.jsx";

function createEmptyDraft() {
  return { customerName: "", customerPhone: "", comment: "" };
}

export default function OrderPage({ item, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft);

  // Синхронізація заголовка вкладки з обраним товаром
  useEffect(() => {
    // Якщо товар не вибрано, нічого не робимо
    if (!item) return;

    // Зберігаємо оригінальний заголовок
    const originalTitle = document.title;

    // Встановлюємо новий заголовок
    document.title = `Оформлення: ${item.title}`;

    // Функція очищення (cleanup), яка повертає старий заголовок
    // при розмонтуванні компонента або перед наступним викликом ефекту
    return () => {
      document.title = originalTitle;
    };
  }, [item]); // Ефект перезапускається лише при зміні об'єкта item

  function handleDraftChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  function handleReset() {
    setDraft(createEmptyDraft());
  }

  if (!item) {
    return (
      <Section id="request" title="Оформлення замовлення">
        <EmptyState title="Годинник ще не вибрано.">
          <p>
            <a href="#catalog">Виберіть модель у каталозі</a>
          </p>
        </EmptyState>
      </Section>
    );
  }

  return (
    <Section id="request" title="Оформлення замовлення">
      <p>
        Обрано «{item.title}»: <StockBadge stock={item.stock} />
      </p>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <OrderForm
          idPrefix="order-draft"
          productTitle={item.title}
          draft={draft}
          onDraftChange={handleDraftChange}
          onReset={handleReset}
        />

        <OrderSummary productTitle={item.title} draft={draft} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <AppButton variant="secondary" onClick={onClearSelection}>
          Скасувати вибір і очистити чернетку
        </AppButton>
      </div>
    </Section>
  );
}
