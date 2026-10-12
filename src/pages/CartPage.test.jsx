import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import CartPage from "./OrderPage.jsx";
import { testItem, validInput, savedOrder } from "../test/fixtures.js";
import { deferred } from "../test/deferred.js";

// Допоміжна функція для рендеру нашої сторінки
function renderEditor(onSave) {
  return render(
    <CartPage
      title="Нове замовлення"
      item={testItem}
      onSave={onSave}
      onCancel={vi.fn()}
      submitLabel="Створити замовлення"
    />,
  );
}

// Допоміжна функція для заповнення форми валідними даними
async function fillValidForm(user) {
  // Зверніть увагу: якщо у вашій формі підписи (labels) відрізняються, змініть текст у регулярних виразах /.../i
  const nameInput = screen.getByLabelText(/Ім'я/i);
  await user.clear(nameInput);
  await user.type(nameInput, validInput.customerName);

  const phoneInput = screen.getByLabelText(/Телефон/i);
  await user.clear(phoneInput);
  await user.type(phoneInput, validInput.phone);

  const quantityInput = screen.getByRole("spinbutton", { name: /Кількість/i });
  await user.clear(quantityInput);
  await user.type(quantityInput, String(validInput.quantity));
}

test("передає нормалізовані поля й блокує повтор до відповіді", async () => {
  const user = userEvent.setup();
  const pending = deferred();

  // onSave повертає "завислу" обіцянку, щоб ми могли перевірити стан завантаження
  const onSave = vi.fn().mockReturnValue(pending.promise);

  renderEditor(onSave);
  await fillValidForm(user);

  await user.click(screen.getByRole("button", { name: "Створити замовлення" }));

  const submitBtn = screen.getByRole("button", { name: "Збереження..." });
  expect(submitBtn).toBeDisabled(); // Кнопка має бути заблокована

  // Спроба натиснути ще раз під час завантаження
  await user.click(submitBtn);
  expect(onSave).toHaveBeenCalledTimes(1); // Функція все одно викликана лише 1 раз

  // Завершуємо "завислу" обіцянку успіхом
  await act(async () => {
    pending.resolve({ ok: true, record: savedOrder });
    await pending.promise;
  });

  expect(
    screen.getByRole("button", { name: "Створити замовлення" }),
  ).toBeEnabled();
});

test("після відмови зберігає введення й дозволяє свідомий повтор", async () => {
  const user = userEvent.setup();

  // Імітуємо спочатку помилку, а потім успіх
  const onSave = vi
    .fn()
    .mockResolvedValueOnce({
      ok: false,
      message: "Сервіс тимчасово недоступний.",
    })
    .mockResolvedValueOnce({ ok: true, record: savedOrder });

  renderEditor(onSave);
  await fillValidForm(user);

  await user.click(screen.getByRole("button", { name: "Створити замовлення" }));

  // Перевіряємо, що з'явилося повідомлення про помилку
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Сервіс тимчасово недоступний.",
  );

  // Перевіряємо, що ім'я не зникло з поля вводу
  expect(screen.getByLabelText(/Ім'я/i)).toHaveValue(validInput.customerName);

  // Натискаємо кнопку ще раз (свідомий повтор)
  await user.click(screen.getByRole("button", { name: "Створити замовлення" }));

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Створити замовлення" }),
    ).toBeEnabled();
  });

  expect(onSave).toHaveBeenCalledTimes(2);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument(); // Помилка зникла
});
