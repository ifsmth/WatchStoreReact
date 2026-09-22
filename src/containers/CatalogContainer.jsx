import HomePage from "../pages/HomePage.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";
import { products } from "../data/products.js";

export default function CatalogContainer() {
  // Витягуємо потрібні дані з контексту
  const { selectedId, handleSelect } = useProductSelection();

  // HomePage залишається незмінним, він просто отримує свої пропси
  return (
    <HomePage
      items={products}
      selectedId={selectedId}
      onSelect={handleSelect}
    />
  );
}
