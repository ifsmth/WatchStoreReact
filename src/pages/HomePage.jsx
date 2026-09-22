import Section from "../components/ui/Section.jsx";
import ProductFilters from "../components/products/ProductFilters.jsx";
import ProductList from "../components/products/ProductList.jsx";
import { useProductFilters } from "../hooks/useProductFilters.jsx";

export default function HomePage({ items, selectedId, onSelect }) {
  // Викликаємо власний хук і дістаємо з нього всі необхідні змінні
  const {
    query,
    availableOnly,
    setQuery,
    setAvailableOnly,
    resetFilters,
    visibleItems,
  } = useProductFilters(items);

  return (
    <>
      <Section id="about" title="Про магазин">
        <p>
          Каталог оригінальних наручних годинників від відомих світових брендів.
        </p>
        <p>Виберіть модель та перейдіть до оформлення замовлення.</p>
      </Section>

      <Section id="catalog" title="Каталог товарів">
        <p>Всього моделей у базі: {items.length}</p>

        <ProductFilters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />

        <p>Показано моделей: {visibleItems.length}</p>

        <ProductList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={
            items.length === 0
              ? "Товари ще не додано."
              : "За цими фільтрами нічого не знайдено."
          }
        />

        <p>
          <a href="#request">Перейти до оформлення замовлення</a>
        </p>
      </Section>
    </>
  );
}
