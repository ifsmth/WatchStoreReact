import { useState } from "react";
import Section from "../components/ui/Section.jsx";
import ProductFilters from "../components/products/ProductFilters.jsx";
import ProductList from "../components/products/ProductList.jsx";

export default function HomePage({ items, selectedId, onSelect }) {
  // Стан інтерфейсу каталогу
  const [query, setQuery] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  // Обчислення похідного списку товарів (без окремого useState)
  const normalizedQuery = query.trim().toLocaleLowerCase("uk");

  const visibleItems = items.filter((item) => {
    // Шукаємо збіг у назві (title)
    const matchesQuery = item.title
      .toLocaleLowerCase("uk")
      .includes(normalizedQuery);
    // Перевіряємо наявність: якщо прапорець вимкнено - пропускаємо всі, інакше тільки ті, де stock > 0
    const matchesAvailability = !availableOnly || item.stock > 0;

    return matchesQuery && matchesAvailability;
  });

  // Обробник очищення фільтрів
  function resetFilters() {
    setQuery("");
    setAvailableOnly(false);
  }

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
