import AppButton from "../ui/AppButton.jsx";
import FormField from "../ui/FormField.jsx";

export default function OrderForm({
  idPrefix,
  productTitle,
  draft,
  errors = {},
  operationError,
  onDraftChange,
  onBlur,
  onSubmit,
  onReset,
  submitLabel = "Зберегти",
}) {
  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const quantityId = `${idPrefix}-quantity`;
  const commentId = `${idPrefix}-comment`;

  const hasErrors = Object.keys(errors).length > 0;

  function describedBy(id, error) {
    return `${id}-hint ${error ? `${id}-error` : ""}`.trim();
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Форма замовлення">
      <p>Вибраний товар: {productTitle}</p>
      <p>
        Збережіть зміни кнопкою нижче. Незбережене введення зникає при виході зі
        сторінки або її перезавантаженні.
      </p>

      {hasErrors && (
        <p role="alert" className="field-error">
          Виправте позначені поля.
        </p>
      )}
      {errors.productId && (
        <p role="alert" className="field-error">
          {errors.productId}
        </p>
      )}
      {operationError && (
        <p role="alert" className="field-error">
          {operationError}
        </p>
      )}

      <FormField
        id={nameId}
        label="Ім'я замовника (обов'язково)"
        hint="Від 2 до 100 символів."
        error={errors.customerName}
      >
        <input
          id={nameId}
          name="customerName"
          type="text"
          required
          value={draft.customerName}
          onChange={(event) =>
            onDraftChange("customerName", event.target.value)
          }
          onBlur={() => onBlur("customerName")}
          aria-invalid={Boolean(errors.customerName)}
          aria-describedby={describedBy(nameId, errors.customerName)}
        />
      </FormField>

      <FormField
        id={phoneId}
        label="Контактний телефон (обов'язково)"
        hint="Формат: +380XXXXXXXXX"
        error={errors.phone}
      >
        <input
          id={phoneId}
          name="phone"
          type="tel"
          required
          value={draft.phone}
          onChange={(event) => onDraftChange("phone", event.target.value)}
          onBlur={() => onBlur("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy(phoneId, errors.phone)}
        />
      </FormField>

      <FormField
        id={quantityId}
        label="Кількість (обов'язково)"
        hint="Ціле число від 1 до 10."
        error={errors.quantity}
      >
        <input
          id={quantityId}
          name="quantity"
          type="number"
          min={1}
          max={10}
          step={1}
          required
          value={draft.quantity}
          onChange={(event) => onDraftChange("quantity", event.target.value)}
          onBlur={() => onBlur("quantity")}
          aria-invalid={Boolean(errors.quantity)}
          aria-describedby={describedBy(quantityId, errors.quantity)}
        />
      </FormField>

      <FormField
        id={commentId}
        label="Коментар (необов'язково)"
        hint="До 500 символів."
        error={errors.comment}
      >
        <textarea
          id={commentId}
          name="comment"
          rows={3}
          value={draft.comment}
          onChange={(event) => onDraftChange("comment", event.target.value)}
          onBlur={() => onBlur("comment")}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={describedBy(commentId, errors.comment)}
        />
      </FormField>

      <div
        className="form-actions"
        style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
      >
        <AppButton type="submit">{submitLabel}</AppButton>
        <AppButton type="button" variant="secondary" onClick={onReset}>
          Відновити початкові поля
        </AppButton>
      </div>
    </form>
  );
}
