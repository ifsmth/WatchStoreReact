import { useState, useRef, useEffect } from "react";
import PageHeading from "../components/ui/PageHeading.jsx";
import Section from "../components/ui/Section.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import OrderForm from "../components/orders/OrderForm.jsx";
import OrderSummary from "../components/orders/OrderSummary.jsx";
import { validateOrder } from "../domain/orderValidation.js";

const emptyDraft = { customerName: "", phone: "", quantity: "1", comment: "" };

export default function CartPage({
  title,
  item,
  initialDraft = emptyDraft,
  onSave,
  onCancel,
  submitLabel,
  cancelLabel = "Вийти без збереження",
}) {
  const initialValues = {
    customerName: initialDraft.customerName || "",
    phone: initialDraft.phone || "",
    quantity: String(initialDraft.quantity || "1"),
    comment: initialDraft.comment || "",
  };

  const [draft, setDraft] = useState(() => ({ ...initialValues }));
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [operationError, setOperationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);
  const alive = useRef(false); // Захист від оновлення стану після переходу

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // Валідуємо поточні значення на кожний рендер
  const validation = validateOrder({ ...draft, productId: item.id }, [item]);

  // Фільтруємо помилки: показуємо тільки для "зачеплених" полів або якщо була спроба збереження
  const errors = Object.fromEntries(
    Object.entries(validation.errors).filter(
      ([field]) => attempted || touched[field],
    ),
  );

  const isDirty =
    draft.customerName !== initialValues.customerName ||
    draft.phone !== initialValues.phone ||
    draft.quantity !== initialValues.quantity ||
    draft.comment !== initialValues.comment;

  function handleChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setOperationError("");
  }

  function handleBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current) return;
    setAttempted(true);
    setOperationError("");

    if (!validation.ok) {
      const firstField = ["customerName", "phone", "quantity", "comment"].find(
        (field) => validation.errors[field],
      );
      if (firstField) {
        event.currentTarget.elements.namedItem(firstField)?.focus();
      }
      return;
    }

    submitting.current = true;
    setIsSubmitting(true);

    try {
      const result = await onSave(validation.value);
      if (!result.ok && alive.current) {
        setOperationError(
          result.errors
            ? Object.values(result.errors).join(" ")
            : result.message || "Не вдалося зберегти замовлення.",
        );
      }
    } catch {
      if (alive.current) setOperationError("Не вдалося завершити збереження.");
    } finally {
      submitting.current = false;
      if (alive.current) setIsSubmitting(false);
    }
  }

  function handleReset() {
    if (submitting.current) return;
    if (!isDirty) return;
    if (
      window.confirm("Відкинути введені зміни та відновити початкові поля?")
    ) {
      setDraft({ ...initialValues });
      setTouched({});
      setAttempted(false);
      setOperationError("");
    }
  }

  function handleCancel() {
    if (submitting.current) return;
    if (isDirty && !window.confirm("Вийти та відкинути незбережені зміни?")) {
      return;
    }
    onCancel();
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="request-editor" title="Поля та підсумок">
        <p>
          Обладнання «{item.title}»: <StockBadge stock={item.stock} />
        </p>

        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <fieldset
            disabled={isSubmitting}
            style={{ border: "none", padding: 0, margin: 0 }}
          >
            <OrderForm
              idPrefix="order-draft"
              productTitle={item.title}
              draft={draft}
              errors={errors}
              operationError={operationError}
              onDraftChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              onReset={handleReset}
              submitLabel={isSubmitting ? "Збереження..." : submitLabel}
            />
          </fieldset>
          <OrderSummary productTitle={item.title} draft={draft} />
        </div>
      </Section>

      <div style={{ marginTop: "2rem" }}>
        <AppButton
          variant="secondary"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </AppButton>
      </div>
    </>
  );
}
