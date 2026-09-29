import { useSearchParams } from "react-router";

export default function useOrderFilters(orders, items) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const rawSort = searchParams.get("sort");
  const sort = ["quantity-asc", "quantity-desc"].includes(rawSort)
    ? rawSort
    : "product";

  const names = new Map(items.map((item) => [String(item.id), item.title]));
  const normalizedQuery = query.trim().toLocaleLowerCase("uk");

  // 1. Фільтрація (Пошук за назвою годинника або іменем замовника)
  const visibleOrders = orders.filter((order) => {
    const text =
      `${names.get(String(order.productId)) ?? ""} ${order.customerName}`.toLocaleLowerCase(
        "uk",
      );
    return text.includes(normalizedQuery);
  });

  // 2. Сортування
  visibleOrders.sort((a, b) => {
    let order = 0;
    if (sort === "quantity-asc") order = a.quantity - b.quantity;
    else if (sort === "quantity-desc") order = b.quantity - a.quantity;
    else {
      order = (names.get(String(a.productId)) ?? "").localeCompare(
        names.get(String(b.productId)) ?? "",
        "uk",
      );
    }
    return order || a.id.localeCompare(b.id);
  });

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
