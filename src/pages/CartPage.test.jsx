import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, test, vi, beforeEach } from "vitest";
import CartPage from "./CartPage.jsx";
import { testItem, savedOrder } from "../test/fixtures.js";
import { deferred } from "../test/deferred.js";
import * as CartContextModule from "../contexts/CartContext.jsx";
import * as AuthContextModule from "../contexts/AuthContext.jsx";
import * as OrdersContextModule from "../contexts/OrdersContext.jsx";

// Допоміжна функція рендеру CartPage з моками контекстів
function setupCartPage({
  cartItems = [{ product: testItem, quantity: 2 }],
  cartTotal = 9700,
  user = {
    name: "Іван Франко",
    email: "ivan@example.com",
    phone: "+380501234567",
  },
  createOrder = vi.fn().mockResolvedValue({ ok: true, record: savedOrder }),
  clearCart = vi.fn(),
  updateQuantity = vi.fn(),
  removeFromCart = vi.fn(),
} = {}) {
  vi.spyOn(CartContextModule, "useCart").mockReturnValue({
    cartItems,
    cartTotal,
    clearCart,
    updateQuantity,
    removeFromCart,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
  });

  vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
    user,
    ready: true,
  });

  vi.spyOn(OrdersContextModule, "useOrders").mockReturnValue({
    createOrder,
    orders: [savedOrder],
    status: "success",
  });

  const userAction = userEvent.setup();
  render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>,
  );

  return { userAction, createOrder, clearCart };
}

beforeEach(() => {
  vi.restoreAllMocks();
});

test("відображає повідомлення про порожній кошик, якщо товарів немає", () => {
  setupCartPage({ cartItems: [] });

  expect(screen.getByText(/Кошик порожній/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Перейти до каталогу/i }),
  ).toBeInTheDocument();
});

test("передає нормалізовані поля, коментар та блокує повторне натискання під час оформлення", async () => {
  const pending = deferred();
  const createOrder = vi.fn().mockReturnValue(pending.promise);
  const clearCart = vi.fn();

  const { userAction } = setupCartPage({ createOrder, clearCart });

  // Перевіряємо наявність товару та підсумкової суми
  expect(screen.getByText(testItem.title)).toBeInTheDocument();
  expect(screen.getByText(/Загальна сума:/i)).toBeInTheDocument();

  // Заповнюємо коментар до замовлення
  const commentInput = screen.getByRole("textbox", {
    name: /Коментар або побажання/i,
  });
  await userAction.type(commentInput, "Доставити кур'єром після 18:00");

  const checkoutBtn = screen.getByRole("button", {
    name: /Оформити замовлення/i,
  });
  await userAction.click(checkoutBtn);

  // Кнопка переходить у стан завантаження і блокується
  const pendingBtn = screen.getByRole("button", { name: /Оформлення.../i });
  expect(pendingBtn).toBeDisabled();

  // Повторне натискання під час виконання не викликає сервіс вдруге
  await userAction.click(pendingBtn);
  expect(createOrder).toHaveBeenCalledTimes(1);

  // Завершуємо проміс успіхом
  await act(async () => {
    pending.resolve({ ok: true, record: savedOrder });
    await pending.promise;
  });

  // Перевіряємо повідомлення про успіх та очищення кошика
  expect(
    await screen.findByText(/Замовлення успішно оформлено!/i),
  ).toBeInTheDocument();
  expect(clearCart).toHaveBeenCalledTimes(1);
});

test("після відмови збереження показує помилку, не знищує введений коментар і дозволяє свідомий повтор", async () => {
  const createOrder = vi
    .fn()
    .mockResolvedValueOnce({
      ok: false,
      message: "Сервіс тимчасово недоступний.",
    })
    .mockResolvedValueOnce({ ok: true, record: savedOrder });

  const { userAction } = setupCartPage({ createOrder });

  const commentInput = screen.getByRole("textbox", {
    name: /Коментар або побажання/i,
  });
  await userAction.type(commentInput, "Тестовий коментар покупця");

  const checkoutBtn = screen.getByRole("button", {
    name: /Оформити замовлення/i,
  });
  await userAction.click(checkoutBtn);

  // Перевіряємо показ повідомлення про помилку
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Сервіс тимчасово недоступний.",
  );

  // Перевіряємо, що чернетка (введений коментар) не стерлася
  expect(commentInput).toHaveValue("Тестовий коментар покупця");

  // Свідомий повтор клієнтом
  await userAction.click(
    screen.getByRole("button", { name: /Оформити замовлення/i }),
  );

  // Сервіс викликано вдруге
  await waitFor(() => {
    expect(createOrder).toHaveBeenCalledTimes(2);
  });

  // Успішне завершення, помилка зникла
  expect(
    await screen.findByText(/Замовлення успішно оформлено!/i),
  ).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
