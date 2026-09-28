import ProductListPage from "../pages/ProductListPage.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";

export default function CatalogContainer({ items }) {
  const { selectedId, handleSelect } = useProductSelection();

  return (
    <ProductListPage
      items={items}
      selectedId={selectedId}
      onSelect={handleSelect}
    />
  );
}
