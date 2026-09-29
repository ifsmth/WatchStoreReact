export function validateOrder(input, items) {
  const errors = {};

  // Нормалізація рядків
  const customerName =
    typeof input.customerName === "string" ? input.customerName.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const comment = typeof input.comment === "string" ? input.comment.trim() : "";

  // Перетворення кількості з рядка на число
  const quantityText = String(input.quantity ?? "").trim();
  const quantity = Number(quantityText);

  // 1. Перевірка наявності товару
  if (!items.some((item) => String(item.id) === String(input.productId))) {
    errors.productId = "Виберіть наявний годинник з каталогу.";
  }

  // 2. Перевірка імені
  if (customerName.length === 0) {
    errors.customerName = "Укажіть ім'я замовника.";
  } else if (customerName.length < 2 || customerName.length > 100) {
    errors.customerName = "Ім'я має містити від 2 до 100 символів.";
  }

  // 3. Перевірка телефону
  if (phone.length === 0) {
    errors.phone = "Укажіть контактний телефон.";
  } else if (!/^\+380\d{9}$/.test(phone)) {
    errors.phone = "Телефон має бути у форматі +380XXXXXXXXX.";
  }

  // 4. Перевірка кількості (числове поле)
  if (quantityText === "") {
    errors.quantity = "Укажіть кількість товарів.";
  } else if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    errors.quantity = "Кількість має бути цілим числом від 1 до 10.";
  }

  // 5. Перевірка коментаря (необов'язковий, але якщо є - перевіряємо довжину)
  if (comment.length > 500) {
    errors.comment = "Коментар не може перевищувати 500 символів.";
  }

  // Якщо є помилки, повертаємо їх
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // Якщо все добре, повертаємо нормалізовані значення
  return {
    ok: true,
    errors: {},
    value: {
      productId: input.productId,
      customerName,
      phone,
      quantity,
      comment,
    },
  };
}
