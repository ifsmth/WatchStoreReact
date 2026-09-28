import { useState } from "react";
import PageHeading from "../components/ui/PageHeading.jsx";
import Section from "../components/ui/Section.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import OrderForm from "../components/orders/OrderForm.jsx";
import OrderSummary from "../components/orders/OrderSummary.jsx";

// Порожня чернетка за замовчуванням
const emptyDraft = { customerName: "", customerPhone: "", comment: "" };

export default function CartPage({
  title,
  item,
  initialDraft = emptyDraft,
  onCancel,
  cancelLabel = "Вийти без збереження",
}) {
  // Ініціалізуємо стан із переданої чернетки
  const [draft, setDraft] = useState(() => ({
    ...emptyDraft,
    ...initialDraft,
  }));

  // Захист від падіння, якщо товар не знайдено
  if (!item) {
    return (
      <>
        <PageHeading title={title} />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Помилка завантаження</h2>
          <p>
            Дані про вибраний товар відсутні або товар було видалено з бази.
          </p>
          <AppButton variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </AppButton>
        </div>
      </>
    );
  }

  function handleDraftChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  function handleReset() {
    setDraft({ ...emptyDraft, ...initialDraft });
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="request-editor" title="Поля та підсумок">
        <p>
          Годинник «{item.title}»: <StockBadge stock={item.stock} />
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
      </Section>

      <div style={{ marginTop: "2rem" }}>
        <AppButton variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </AppButton>
      </div>
    </>
  );
}
