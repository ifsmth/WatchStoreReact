import { useSearchParams } from "react-router";
import { selectOrders } from "../domain/selectOrders.js";

export default function useOrderFilters(orders, items) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const rawSort = searchParams.get("sort");
  const sort = ["quantity-asc", "quantity-desc"].includes(rawSort)
    ? rawSort
    : "product";

  const visibleOrders = selectOrders(orders, items, { query, sort });

  function setParameter(name, value, defaultValue, replace = false) {
    const next = new URLSearchParams(searchParams);
    if (value === defaultValue) next.delete(name);
    else next.set(name, value);
    setSearchParams(next, { replace });
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    next.delete("sort");
    setSearchParams(next);
  }

  return {
    query,
    sort,
    visibleOrders,
    setQuery: (value) => setParameter("q", value, "", true),
    setSort: (value) => setParameter("sort", value, "product"),
    resetFilters,
  };
}
