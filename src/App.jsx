import { Routes, Route } from "react-router";

// Оболонки та контекст
import AppLayout from "./components/layout/AppLayout.jsx";
import OrdersLayout from "./components/layout/OrdersLayout.jsx";
import { ProductSelectionProvider } from "./contexts/ProductSelectionContext.jsx";

// Сторінки
import HomePage from "./pages/HomePage.jsx";
import CatalogContainer from "./containers/CatalogContainer.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import OrderEditPage from "./pages/OrderEditPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";

import { OrdersProvider } from "./contexts/OrdersContext.jsx";
import { MessagesProvider } from "./contexts/MessagesContext.jsx";

import AboutPage from "./pages/AboutPage.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

import CartPage from "./pages/CartPage.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CatalogProvider } from "./contexts/CatalogContext.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import AccountPage from "./pages/AccountPage.jsx";

import AccountEditPage from "./pages/AccountEditPage.jsx";
import AccountPasswordPage from "./pages/AccountPasswordPage.jsx";

import AdminLayout from "./components/layout/AdminLayout.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";

import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";

import AdminProductsPage from "./pages/AdminProductsPage.jsx";
import AdminProductFormPage from "./pages/AdminProductFormPage.jsx";

import AdminBrandsPage from "./pages/AdminBrandsPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";
import AdminMessagesPage from "./pages/AdminMessagesPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CatalogProvider>
        <ProductSelectionProvider>
          <OrdersProvider>
            <CartProvider>
              <MessagesProvider>
                <Routes>
                {/* Головна оболонка застосунку, яка має <Outlet /> */}
                <Route path="/" element={<AppLayout />}>
                  {/* Головна сторінка відкривається за замовчуванням (index) */}
                  <Route index element={<HomePage />} />

                  <Route path="about" element={<AboutPage />} />

                  {/* Окремі захищені маршрути для кожної сторінки кабінету */}
                  <Route
                    path="account"
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="account/edit"
                    element={
                      <ProtectedRoute>
                        <AccountEditPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="account/edit/password"
                    element={
                      <ProtectedRoute>
                        <AccountPasswordPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Маршрути каталогу */}
                  <Route path="products">
                    <Route index element={<CatalogContainer />} />
                    <Route path=":productId" element={<ProductDetailsPage />} />
                  </Route>

                  <Route path="cart" element={<CartPage />} />

                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />

                  {/* Вкладені маршрути замовлень із власною оболонкою */}
                  <Route path="orders" element={<OrdersLayout />}>
                    <Route path=":orderId" element={<OrderDetailsPage />} />
                    <Route path=":orderId/edit" element={<OrderEditPage />} />
                  </Route>

                  {/* Обробка невідомих адрес */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* 2. ГІЛКА АДМІНКИ */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />

                  <Route path="products">
                    <Route index element={<AdminProductsPage />} />
                    <Route path="create" element={<AdminProductFormPage />} />
                    <Route path="edit/:id" element={<AdminProductFormPage />} />
                  </Route>

                  <Route path="orders">
                    <Route index element={<AdminOrdersPage />} />
                    <Route path=":orderId" element={<OrderDetailsPage />} />
                    <Route path=":orderId/edit" element={<OrderEditPage />} />
                  </Route>

                  {/* Бренди та Клієнти */}
                  <Route path="brands" element={<AdminBrandsPage />} />
                  <Route path="users" element={<AdminUsersPage />} />

                  {/* Повідомлення від користувачів */}
                  <Route path="messages" element={<AdminMessagesPage />} />

                  {/* Обробка невідомих адрес */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
              </MessagesProvider>
            </CartProvider>
          </OrdersProvider>
        </ProductSelectionProvider>
      </CatalogProvider>
    </AuthProvider>
  );
}
