export default function StockBadge({ stock }) {
  const isAvailable = stock > 0;
  const label = isAvailable
    ? `В наявності (${stock} шт.)`
    : "Тимчасово немає в наявності";
  const className = isAvailable ? "status available" : "status not-available";

  return <span className={className}>{label}</span>;
}
