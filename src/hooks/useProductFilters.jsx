import { useSearchParams } from "react-router";

export function useProductFilters(items) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Читаємо значення з URL
  const query = searchParams.get("q") ?? "";
  const availableOnly = searchParams.get("available") === "1";

  const normalizedQuery = query.trim().toLocaleLowerCase("uk");

  const visibleItems = items.filter(
    (item) =>
      item.title.toLocaleLowerCase("uk").includes(normalizedQuery) &&
      (!availableOnly || item.stock > 0),
  );

  function setQuery(value) {
    const next = new URLSearchParams(searchParams);
    if (value === "") next.delete("q");
    else next.set("q", value);
    // replace: true запобігає засміченню історії браузера кожною літерою
    setSearchParams(next, { replace: true });
  }

  function setAvailableOnly(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("available", "1");
    else next.delete("available");
    setSearchParams(next);
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    next.delete("available");
    setSearchParams(next);
  }

  return {
    query,
    availableOnly,
    setQuery,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  };
}
