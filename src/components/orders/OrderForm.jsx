import AppButton from "../ui/AppButton.jsx";
import FormField from "../ui/FormField.jsx";

export default function OrderForm({
  idPrefix,
  productTitle,
  draft,
  onDraftChange,
  onReset,
}) {
  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const commentId = `${idPrefix}-comment`;
  const noticeId = `${idPrefix}-notice`;

  return (
    <form
      aria-label="Чернетка оформлення замовлення"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
    >
      <p id={noticeId} className="field-hint">
        Чернетка існує лише до зміни предмета, скасування вибору або
        перезавантаження сторінки. Замовлення поки не надсилається.
      </p>

      <FormField label="Обраний годинник">
        <input type="text" value={productTitle} readOnly disabled />
      </FormField>

      <FormField id={nameId} label="Ім'я та Прізвище">
        <input
          type="text"
          id={nameId}
          name="customerName"
          placeholder="Введіть ваше ім'я"
          value={draft.customerName}
          onChange={(e) => onDraftChange("customerName", e.target.value)}
        />
      </FormField>

      <FormField id={phoneId} label="Номер телефону">
        <input
          type="tel"
          id={phoneId}
          name="customerPhone"
          placeholder="+380..."
          value={draft.customerPhone}
          onChange={(e) => onDraftChange("customerPhone", e.target.value)}
        />
      </FormField>

      <FormField
        id={commentId}
        label="Коментар до замовлення"
        hint="Вкажіть зручний час для дзвінка або відділення пошти."
      >
        <textarea
          id={commentId}
          name="comment"
          rows={3}
          value={draft.comment}
          onChange={(e) => onDraftChange("comment", e.target.value)}
          aria-describedby={`${commentId}-hint`}
        />
      </FormField>

      <div className="form-actions">
        <AppButton variant="secondary" onClick={onReset}>
          Очистити форму
        </AppButton>
        <AppButton disabled>Підтвердити замовлення (недоступно)</AppButton>
      </div>
    </form>
  );
}
