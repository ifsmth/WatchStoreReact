export default function OrderSummary({ productTitle, draft }) {
  const customerName = draft.customerName.trim();
  const customerPhone = draft.customerPhone.trim();
  const comment = draft.comment.trim();

  return (
    <aside aria-labelledby="order-summary-title" className="empty-state">
      <h3 id="order-summary-title">Поточна чернетка замовлення</h3>
      <dl>
        <dt>
          <strong>Товар:</strong>
        </dt>
        <dd>{productTitle}</dd>

        <dt>
          <strong>Одержувач:</strong>
        </dt>
        <dd>{customerName || "Ще не вказано"}</dd>

        <dt>
          <strong>Телефон:</strong>
        </dt>
        <dd>{customerPhone || "Ще не вказано"}</dd>

        <dt>
          <strong>Коментар:</strong>
        </dt>
        <dd>{comment || "Немає коментарів"}</dd>
      </dl>
      <p className="field-hint">
        Цей підсумок не підтверджує резервування товару.
      </p>
    </aside>
  );
}
