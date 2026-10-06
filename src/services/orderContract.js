import { products } from "../data/products.js";
import { validateOrder } from "../domain/orderValidation.js";
import { ServiceError } from "./ServiceError.js";

// Перевірка даних перед збереженням (вхідний контракт)
export function toOrderInput(input) {
  const result = validateOrder(input, products);
  if (!result.ok) {
    throw new ServiceError("Перевірте поля замовлення.", {
      code: "VALIDATION",
      errors: result.errors,
    });
  }
  return result.value;
}

// Перевірка прочитаного з бази запису (вихідний контракт)
export function toOrder(value) {
  const valid =
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    (typeof value.productId === "string" ||
      typeof value.productId === "number") &&
    typeof value.customerName === "string" &&
    typeof value.phone === "string" &&
    Number.isInteger(value.quantity);

  if (!valid) {
    throw new ServiceError("Джерело повернуло некоректний запис замовлення.", {
      code: "BAD_DATA",
    });
  }

  return {
    id: String(value.id),
    productId: String(value.productId),
    customerName: value.customerName,
    phone: value.phone,
    quantity: value.quantity,
    comment: value.comment || "",
  };
}

// Перевірка масиву
export function toOrderList(value) {
  if (!Array.isArray(value)) {
    throw new ServiceError("Джерело повернуло некоректний список.", {
      code: "BAD_DATA",
    });
  }
  const records = value.map(toOrder);

  if (new Set(records.map((record) => record.id)).size !== records.length) {
    throw new ServiceError("Джерело повернуло повторні ідентифікатори.", {
      code: "BAD_DATA",
    });
  }
  return records;
}
