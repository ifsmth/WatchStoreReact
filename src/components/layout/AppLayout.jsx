import { Outlet } from "react-router";
import SiteHeader from "./SiteHeader.jsx";

const navigationLinks = [
  { to: "/", label: "Головна", end: true },
  { to: "/products", label: "Каталог" },
  { to: "/orders", label: "Замовлення" },
];

export default function AppLayout() {
  return (
    <>
      <SiteHeader title="Магазин годинників" links={navigationLinks} />
      <main id="main-content" tabIndex={-1}>
        {/* Сюди підставлятимуться сторінки з нашого дерева Route */}
        <Outlet />
      </main>
      <footer>Навчальний проєкт.</footer>
    </>
  );
}
