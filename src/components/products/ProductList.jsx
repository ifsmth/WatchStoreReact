import ProductCard from "./ProductCard.jsx";
import EmptyState from "../ui/EmptyState.jsx";

export default function ProductList({
  items,
  selectedId,
  onSelect,
  emptyTitle = "Товари ще не додано.",
}) {
  if (items.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <ul className="products-grid">
      {items.map((item) => (
        <li key={item.id}>
          <ProductCard
            item={item}
            selected={item.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}
