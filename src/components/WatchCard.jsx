export default function ProductCard({ item }) {
  // Визначаємо статус на основі поля stock (залишок)
  const isAvailable = item.stock > 0;
  const status = isAvailable
    ? `В наявності (${item.stock} шт.)`
    : "Тимчасово немає в наявності";

  return (
    <article className="product-card">
      <h3>{item.title}</h3>
      <p className="price">
        <strong>{item.price.toLocaleString("uk-UA")} ₴</strong>
      </p>

      <ul className="details" style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <strong>Стать:</strong> {item.gender}
        </li>
        <li>
          <strong>Механізм:</strong> {item.mechanism}
        </li>
        <li>
          <strong>Скло:</strong> {item.glass}
        </li>
        <li>
          <strong>Водозахист:</strong> {item.water_resistance}
        </li>
      </ul>

      <p className="description">{item.description}</p>

      <p className={isAvailable ? "status available" : "status not-available"}>
        {status}
      </p>
    </article>
  );
}
