export function selectOrders(
  orders,
  items = [],
  { query = "", sort = "product" } = {},
) {
  const names = new Map(
    items.map((item) => [String(item.id), item.title || item.name || ""]),
  );
  const normalizedQuery = (query || "").trim().toLocaleLowerCase("uk");

  // 1. Фільтрація без мутації початкового масиву
  const selected = orders.filter((order) => {
    const productName = names.get(String(order.productId)) ?? "";
    const customerName = order.customerName || order.customer?.name || "";
    const text = `${productName} ${customerName}`.toLocaleLowerCase("uk");
    return text.includes(normalizedQuery);
  });

  // 2. Сортування нового масиву
  return selected.sort((a, b) => {
    let order = 0;
    if (sort === "quantity-asc") order = (a.quantity || 0) - (b.quantity || 0);
    else if (sort === "quantity-desc")
      order = (b.quantity || 0) - (a.quantity || 0);
    else {
      order = (names.get(String(a.productId)) ?? "").localeCompare(
        names.get(String(b.productId)) ?? "",
        "uk",
      );
    }
    return order || String(a.id).localeCompare(String(b.id));
  });
}
