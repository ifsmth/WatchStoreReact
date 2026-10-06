import StockBadge from "../products/StockBadge.jsx";

export default function OrderSummary({ productTitle, draft, item }) {
  return (
    <div className="order-summary-container">
      <h3>Підсумок замовлення</h3>

      <dl>
        <dt>Обраний годинник</dt>
        <dd>{productTitle}</dd>

        <dt>Наявність</dt>
        <dd style={{ marginTop: "0.5rem" }}>
          {item && <StockBadge stock={item.stock} />}
        </dd>

        <dt>Ім'я замовника</dt>
        <dd>{draft.customerName || "—"}</dd>

        <dt>Телефон</dt>
        <dd>{draft.phone || "—"}</dd>

        <dt>Кількість</dt>
        <dd>{draft.quantity === "" ? "—" : `${draft.quantity} шт.`}</dd>

        <dt>Коментар</dt>
        <dd>{draft.comment || "Немає"}</dd>
      </dl>
    </div>
  );
}
