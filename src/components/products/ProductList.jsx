import ProductCard from "./ProductCard.jsx";
import EmptyState from "../ui/EmptyState.jsx";

export default function ProductList({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState title="Товари ще не додано.">
        <p>Після наповнення каталогу тут з'являться картки годинників.</p>
      </EmptyState>
    );
  }

  return (
    <ul className="products-grid">
      {items.map((item) => (
        <li key={item.id}>
          <ProductCard item={item} />
        </li>
      ))}
    </ul>
  );
}
