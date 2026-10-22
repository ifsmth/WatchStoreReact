import ProductListPage from "../pages/ProductListPage.jsx";
import { useCatalog } from "../contexts/CatalogContext.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";

export default function CatalogContainer() {
  const { products } = useCatalog();
  const { selectedId, handleSelect } = useProductSelection();

  return (
    <ProductListPage
      items={products}
      selectedId={selectedId}
      onSelect={handleSelect}
    />
  );
}
