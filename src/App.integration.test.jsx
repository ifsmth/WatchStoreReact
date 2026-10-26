import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import App from "./App.jsx";
import { orderService } from "./services/orderService.js";
import { ServiceError } from "./services/ServiceError.js";
import { savedOrder, testItem } from "./test/fixtures.js";
import { deferred } from "./test/deferred.js";

// 1. Підміняємо сервіс замовлень шпигунами
vi.mock("./services/orderService.js", () => ({
  orderService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    updateContacts: vi.fn(),
    delete: vi.fn(),
  },
}));

// 2. Налаштування відповідей сервісу перед кожним тестом
beforeEach(() => {
  for (const method of Object.values(orderService)) method.mockReset();

  orderService.getAll.mockResolvedValue([{ ...savedOrder }]);
  orderService.getById.mockResolvedValue({ ...savedOrder });
  orderService.create.mockImplementation(async (input) => ({
    ...input,
    id: "ord-created",
    totalPrice: 9700,
    status: "Нове",
  }));
  orderService.update.mockImplementation(async (id, input) => ({
    ...input,
    id,
  }));
  orderService.updateContacts.mockImplementation(async (id, input) => ({
    ...input,
    id,
  }));
  orderService.delete.mockResolvedValue(undefined);

  // Імітуємо авторизовану сесію користувача для чекауту
  localStorage.setItem(
    "watch_store_session",
    JSON.stringify({
      name: "Іван Франко",
      email: "ivan@example.com",
      phone: "+380501234567",
      role: "user",
    }),
  );
  localStorage.removeItem("watch_store_cart");
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

// Допоміжний компонент для відстеження маршруту
function LocationProbe() {
  const location = useLocation();
  return (
    <output data-testid="location">
      {location.pathname}
      {location.search}
    </output>
  );
}

// Допоміжна функція рендеру застосунку
function renderApp(path = "/orders") {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
  return user;
}

// ==========================================
// 5.10. Loading, error, retry та empty
// ==========================================

test("показує завантаження до отримання колекції", async () => {
  const pending = deferred();
  orderService.getAll.mockReturnValueOnce(pending.promise);

  renderApp("/orders");

  // Перевіряємо наявність тексту стану завантаження
  expect(screen.getByText("Завантаження замовлень…")).toBeInTheDocument();
  expect(screen.queryByText(savedOrder.customerName)).not.toBeInTheDocument();

  // Відповідаємо успішними даними
  await act(async () => {
    pending.resolve([savedOrder]);
    await pending.promise;
  });

  // Завантаження змінилося відображенням даних
  expect(await screen.findByText(savedOrder.customerName)).toBeInTheDocument();
  expect(screen.queryByText("Завантаження замовлень…")).not.toBeInTheDocument();
});

test("після відмови читання показує помилку й повторно завантажує дані", async () => {
  orderService.getAll
    .mockRejectedValueOnce(new ServiceError("Навчальна відмова читання."))
    .mockResolvedValueOnce([savedOrder]);

  const user = renderApp("/orders");

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Навчальна відмова читання.",
  );
  expect(screen.queryByText(savedOrder.customerName)).not.toBeInTheDocument();

  // Натискаємо повторний запит
  await user.click(screen.getByRole("button", { name: "Спробувати ще раз" }));

  // Дані успішно отримано
  expect(await screen.findByText(savedOrder.customerName)).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("успішний порожній список має окреме пояснення", async () => {
  orderService.getAll.mockResolvedValueOnce([]);
  renderApp("/orders");

  expect(await screen.findByText(/Замовлень ще немає/i)).toBeInTheDocument();
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});

// ==========================================
// 5.11. Маршрути й параметри
// ==========================================

test.each([
  ["/orders", "Керування замовленнями"],
  ["/orders/ord-test-001", "Замовлення"],
  ["/orders/ord-test-001/edit", "Редагування"],
  ["/orders/ord-missing", "Замовлення не знайдено"],
  ["/cart", "Ваш кошик"],
  ["/products", "Каталог"],
  ["/unknown-page", "Сторінку не знайдено"],
])("адреса %s відкриває відповідний екран", async (path, title) => {
  renderApp(path);
  expect(
    await screen.findByRole("heading", { name: new RegExp(title, "i") }),
  ).toBeInTheDocument();
});

test("URL фільтра показує окреме повідомлення при відсутності збігів", async () => {
  renderApp("/orders?q=неіснуючий_пошуковий_запит_12345");
  expect(
    await screen.findByText(/За цими умовами нічого не знайдено/i),
  ).toBeInTheDocument();
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});

// ==========================================
// 5.12. Створення замовлення клієнтом
// ==========================================

test("створює замовлення через кошик та відкриває екран підтвердження", async () => {
  // Кладемо товар у кошик перед відкриттям
  localStorage.setItem(
    "watch_store_cart",
    JSON.stringify([{ product: testItem, quantity: 1 }]),
  );

  const user = renderApp("/cart");

  // Переконуємось, що товар у кошику
  expect(await screen.findByText(testItem.title)).toBeInTheDocument();

  // Додаємо коментар
  const commentInput = screen.getByRole("textbox", {
    name: /Коментар або побажання/i,
  });
  await user.type(commentInput, "Термінова доставка!");

  // Натискаємо кнопку замовлення
  await user.click(
    screen.getByRole("button", { name: /Оформити замовлення/i }),
  );

  // Перевіряємо виклик сервісу
  expect(orderService.create).toHaveBeenCalledTimes(1);
  expect(orderService.create).toHaveBeenCalledWith(
    expect.objectContaining({
      comment: "Термінова доставка!",
      items: [
        expect.objectContaining({
          product_id: testItem.id,
          quantity: 1,
        }),
      ],
    }),
  );

  // Перевіряємо показ екрана успіху
  expect(
    await screen.findByText(/Замовлення успішно оформлено!/i),
  ).toBeInTheDocument();
});

// ==========================================
// 5.13. Підтвердження та відмова видалення
// ==========================================

test("скасування діалогу confirm не викликає видалення замовлення", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(false);

  const user = renderApp("/orders");
  await screen.findByText(savedOrder.customerName);

  const deleteBtn = screen.getByRole("button", { name: /Видалити/i });
  await user.click(deleteBtn);

  expect(orderService.delete).not.toHaveBeenCalled();
  expect(screen.getByText(savedOrder.customerName)).toBeInTheDocument();
});

test("підтвердження діалогу confirm викликає сервіс видалення", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(true);

  const user = renderApp("/orders");
  await screen.findByText(savedOrder.customerName);

  const deleteBtn = screen.getByRole("button", { name: /Видалити/i });
  await user.click(deleteBtn);

  expect(orderService.delete).toHaveBeenCalledWith(savedOrder.id);
});
