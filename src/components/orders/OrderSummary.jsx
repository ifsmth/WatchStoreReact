export default function OrderSummary({ productTitle, draft }) {
  return (
    <div className="order-summary">
      <h3>Підсумок замовлення</h3>
      <dl>
        <dt>Товар</dt>
        <dd>{productTitle}</dd>

        <dt>Ім'я</dt>
        <dd>{draft.customerName || "Ще не вказано"}</dd>

        <dt>Телефон</dt>
        <dd>{draft.phone || "Ще не вказано"}</dd>

        <dt>Кількість</dt>
        <dd>{draft.quantity === "" ? "Ще не вказано" : draft.quantity}</dd>

        <dt>Коментар</dt>
        <dd>{draft.comment || "Немає"}</dd>
      </dl>
    </div>
  );
}
