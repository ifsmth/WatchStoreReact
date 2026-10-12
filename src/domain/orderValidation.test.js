import { describe, expect, test } from "vitest";
import { validateOrder } from "./orderValidation.js";
import { testItem, validInput } from "../test/fixtures.js";

describe("validateOrder", () => {
  test("нормалізує коректні поля, не змінюючи вхідний об’єкт", () => {
    // Заморожуємо об'єкт, щоб переконатися, що функція його не мутує
    const input = Object.freeze({ ...validInput, quantity: "2" });
    const result = validateOrder(input, [testItem]);

    expect(result.ok).toBe(true);
    expect(result.value.quantity).toBe(2); // Перевіряємо нормалізацію: рядок '2' став числом 2
    expect(result.value.customerName).toBe(validInput.customerName);
  });

  test.each(["", "0", "1.5", "11"])(
    "відхиляє некоректну кількість: %j",
    (quantity) => {
      const result = validateOrder({ ...validInput, quantity }, [testItem]);
      expect(result.ok).toBe(false);
      expect(result.errors.quantity).toBeTruthy();
    },
  );

  test("відхиляє замовлення з невідомим ID товару", () => {
    const result = validateOrder({ ...validInput, productId: "unknown-id" }, [
      testItem,
    ]);
    expect(result.ok).toBe(false);
    expect(result.errors.productId).toBeTruthy();
  });

  test("відхиляє порожнє ім'я замовника", () => {
    const result = validateOrder({ ...validInput, customerName: "   " }, [
      testItem,
    ]);
    expect(result.ok).toBe(false);
    expect(result.errors.customerName).toBeTruthy();
  });
});
