import { Routes, Route } from "react-router";

// Оболонки та контекст
import AppLayout from "./components/layout/AppLayout.jsx";
import OrdersLayout from "./components/layout/OrdersLayout.jsx";
import { ProductSelectionProvider } from "./contexts/ProductSelectionContext.jsx";

// Сторінки
import HomePage from "./pages/HomePage.jsx";
import CatalogContainer from "./containers/CatalogContainer.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderCreatePage from "./pages/OrderCreatePage.jsx";
import OrderEditPage from "./pages/OrderEditPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";

import { OrdersProvider } from "./contexts/OrdersContext.jsx";

// Дані
import { products } from "./data/products.js";
import { orders } from "./data/orders.js";

export default function App() {
  return (
    <ProductSelectionProvider>
      <OrdersProvider>
        <Routes>
          {/* Головна оболонка застосунку, яка має <Outlet /> */}
          <Route path="/" element={<AppLayout />}>
            {/* Головна сторінка відкривається за замовчуванням (index) */}
            <Route index element={<HomePage />} />

            {/* Маршрути каталогу */}
            <Route path="products">
              <Route index element={<CatalogContainer items={products} />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage items={products} />}
              />
            </Route>

            {/* Вкладені маршрути замовлень із власною оболонкою */}
            <Route path="orders" element={<OrdersLayout />}>
              <Route
                index
                element={<OrdersPage orders={orders} items={products} />}
              />
              <Route
                path=":orderId"
                element={<OrderDetailsPage items={products} />}
              />
              <Route
                path="new"
                element={<OrderCreatePage items={products} />}
              />
              <Route
                path=":orderId/edit"
                element={<OrderEditPage orders={orders} items={products} />}
              />
            </Route>

            {/* Обробка невідомих адрес */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </OrdersProvider>
    </ProductSelectionProvider>
  );
}
