import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import App from "./App.jsx";
import { orderService } from "./services/orderService.js";
import { ServiceError } from "./services/ServiceError.js";
import { savedOrder, validInput } from "./test/fixtures.js";
import { deferred } from "./test/deferred.js";

// 1. Підміняємо реальний сервіс "моком" (шпигуном)
vi.mock("./services/orderService.js", () => ({
  orderService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// 2. Налаштовуємо стандартні відповіді сервісу перед кожним тестом
beforeEach(() => {
  for (const method of Object.values(orderService)) method.mockReset();

  orderService.getAll.mockResolvedValue([{ ...savedOrder }]);
  orderService.getById.mockResolvedValue({ ...savedOrder });
  orderService.create.mockImplementation(async (input) => ({
    ...input,
    id: "ord-created",
  }));
  orderService.update.mockImplementation(async (id, input) => ({
    ...input,
    id,
  }));
  orderService.delete.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// 3. Допоміжний компонент для перевірки поточної адреси (URL)
function LocationProbe() {
  const location = useLocation();
  return (
    <output data-testid="location">
      {location.pathname}
      {location.search}
    </output>
  );
}

// Допоміжна функція рендеру всього застосунку з віртуальним роутером
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
// ТЕСТИ СТАНІВ: Завантаження, Помилка, Повтор
// ==========================================

test("показує завантаження до отримання колекції", async () => {
  const pending = deferred();
  orderService.getAll.mockReturnValueOnce(pending.promise);

  renderApp();

  // Спочатку бачимо індикатор завантаження
  expect(screen.getByText("Завантаження замовлень…")).toBeInTheDocument();
  expect(screen.queryByText(savedOrder.customerName)).not.toBeInTheDocument();

  // Вирішуємо обіцянку (імітуємо, що сервер відповів)
  await act(async () => {
    pending.resolve([savedOrder]);
    await pending.promise;
  });

  // Завантаження зникло, дані з'явилися
  expect(await screen.findByText(savedOrder.customerName)).toBeInTheDocument();
  expect(screen.queryByText("Завантаження замовлень…")).not.toBeInTheDocument();
});

test("після відмови читання показує помилку й повторно завантажує дані", async () => {
  // Перший запит падає з помилкою, другий — успішний
  orderService.getAll
    .mockRejectedValueOnce(new ServiceError("Навчальна відмова читання."))
    .mockResolvedValueOnce([savedOrder]);

  const user = renderApp();

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Навчальна відмова читання.",
  );
  expect(screen.queryByText(savedOrder.customerName)).not.toBeInTheDocument();

  // Користувач натискає "Спробувати ще раз"
  await user.click(screen.getByRole("button", { name: "Спробувати ще раз" }));

  // Дані успішно завантажилися
  expect(await screen.findByText(savedOrder.customerName)).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("успішний порожній список має окреме пояснення", async () => {
  orderService.getAll.mockResolvedValueOnce([]);
  renderApp();

  // Якщо масив порожній, ми маємо побачити заглушку, а не таблицю
  expect(await screen.findByText(/Замовлень ще немає/i)).toBeInTheDocument();
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});

// ==========================================
// ТЕСТИ МАРШРУТІВ ТА ПЕРЕХОДІВ
// ==========================================

test.each([
  ["/orders/ord-test-001", "Замовлення ord-test-001"],
  ["/orders/ord-test-001/edit", "Редагування"],
  ["/orders/ord-missing", "Замовлення не знайдено"],
  ["/orders/new", "Спершу оберіть товар"],
  ["/unknown-page", "Сторінку не знайдено"],
])("адреса %s відкриває відповідний екран", async (path, title) => {
  renderApp(path);
  // Перевіряємо, чи з'являється заголовок (h1, h2 тощо), який містить потрібний текст
  expect(
    await screen.findByRole("heading", { name: new RegExp(title, "i") }),
  ).toBeInTheDocument();
});

test("створює замовлення та відкриває його підтверджені деталі", async () => {
  orderService.getAll.mockResolvedValueOnce([]);

  // 1. Починаємо шлях із каталогу товарів (як реальний користувач)
  const user = renderApp("/products");

  // 2. Користувач обирає годинник — це записує його id до URL.
  const selectButtons = await screen.findAllByRole("button", {
    name: /Вибрати/i,
  });
  await user.click(selectButtons[0]);

  // 3. Після вибору стає доступним перехід до оформлення.
  const orderLinks = await screen.findAllByRole("link", {
    name: /Оформити замовлення/i,
  });
  await user.click(orderLinks[0]);

  // 4. Тепер ми 100% перейшли на форму. Заповнюємо її:
  const nameInput = await screen.findByLabelText(/Ім'я/i);
  await user.type(nameInput, validInput.customerName);

  const phoneInput = screen.getByLabelText(/Телефон/i);
  await user.type(phoneInput, validInput.phone);

  const quantityInput = screen.getByRole("spinbutton", { name: /Кількість/i });
  await user.clear(quantityInput);
  await user.type(quantityInput, String(validInput.quantity));

  // 4. Натискаємо "Створити замовлення"
  await user.click(screen.getByRole("button", { name: "Створити замовлення" }));

  // 5. Перевіряємо, чи відбувся перехід на правильну адресу
  expect(await screen.findByTestId("location")).toHaveTextContent(
    "/orders/ord-created",
  );

  // 6. Перевіряємо, чи сервіс отримав команду збереження
  expect(orderService.create).toHaveBeenCalledTimes(1);
});
