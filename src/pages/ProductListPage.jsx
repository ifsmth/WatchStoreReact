import { Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import Section from "../components/ui/Section.jsx";
import ProductFilters from "../components/products/ProductFilters.jsx";
import ProductList from "../components/products/ProductList.jsx";
import { useProductFilters } from "../hooks/useProductFilters.jsx";

export default function ProductListPage({ items, selectedId, onSelect }) {
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useProductFilters(items);

  // Формуємо параметр для передачі вибраного товару на сторінку замовлення
  const orderSearch = selectedId
    ? `?${new URLSearchParams({ productId: selectedId })}`
    : "";

  return (
    <>
      <PageHeading title="Каталог годинників" />
      <Section id="catalog" title="Пошук і вибір">
        <p>Всього моделей: {items.length}</p>
        <ProductFilters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />
        <p>Показано товарів: {visibleItems.length}</p>
        <ProductList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </Section>
    </>
  );
}
