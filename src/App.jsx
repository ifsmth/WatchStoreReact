import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { products } from "./data/products.js";

const navigationLinks = [
  { href: "#about", label: "Про магазин" },
  { href: "#catalog", label: "Каталог" },
  { href: "#product-details", label: "Деталі товару" },
  { href: "#cart", label: "Кошик" },
];

export default function App() {
  // Демонстраційний годинник для макета сторінки "Деталі товару"
  const exampleItem = products.length > 0 ? products[0] : null;

  return (
    <AppLayout title="Магазин годинників" links={navigationLinks}>
      <HomePage />
      <ProductDetailsPage item={exampleItem} />
      <CartPage />
    </AppLayout>
  );
}
