import AppLayout from "./components/layout/AppLayout.jsx";
import CatalogContainer from "./containers/CatalogContainer.jsx";
import OrderContainer from "./containers/OrderContainer.jsx";
import { ProductSelectionProvider } from "./contexts/ProductSelectionContext.jsx";

const navigationLinks = [
  { href: "#about", label: "Про магазин" },
  { href: "#catalog", label: "Каталог" },
  { href: "#request", label: "Оформлення замовлення" },
];

export default function App() {
  return (
    <AppLayout title="Магазин годинників" links={navigationLinks}>
      <ProductSelectionProvider>
        {/* Контейнери тепер самі дістають те, що їм треба */}
        <CatalogContainer />
        <OrderContainer />
      </ProductSelectionProvider>
    </AppLayout>
  );
}
