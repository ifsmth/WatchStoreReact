import { useState } from "react";

export function useProductFilters(items) {
  const [query, setQuery] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const normalizedQuery = query.trim().toLocaleLowerCase("uk");

  const visibleItems = items.filter((item) => {
    const matchesQuery = item.title
      .toLocaleLowerCase("uk")
      .includes(normalizedQuery);
    const matchesAvailability = !availableOnly || item.stock > 0;

    return matchesQuery && matchesAvailability;
  });

  function resetFilters() {
    setQuery("");
    setAvailableOnly(false);
  }

  // Повертаємо об'єкт з усіма потрібними даними та функціями
  return {
    query,
    availableOnly,
    setQuery,
    setAvailableOnly,
    resetFilters,
    visibleItems,
  };
}
