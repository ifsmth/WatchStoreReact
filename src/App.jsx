import { useState } from "react";
import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { products } from "./data/products.js";

const navigationLinks = [
  { href: "#about", label: "Про магазин" },
  { href: "#catalog", label: "Каталог" },
  { href: "#request", label: "Оформлення замовлення" },
];

export default function App() {
  // Спільний стан вибору (ідентифікатор товару)
  const [selectedId, setSelectedId] = useState(null);

  // Похідне значення: пошук об'єкта годинника за вибраним ідентифікатором
  const selectedItem = products.find((item) => item.id === selectedId);

  // Обробник вибору товару
  function handleSelect(id) {
    // Перевірка some захищає контракт від передачі невідомого ідентифікатора
    if (products.some((item) => item.id === id)) {
      setSelectedId(id);
    }
  }

  // Обробник скасування вибору
  function handleClearSelection() {
    setSelectedId(null);
  }

  return (
    <AppLayout title="Магазин годинників" links={navigationLinks}>
      <HomePage
        items={products}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      <CartPage
        key={selectedId ?? "empty"}
        item={selectedItem}
        onClearSelection={handleClearSelection}
      />
    </AppLayout>
  );
}
